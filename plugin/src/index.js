import generate from "@babel/generator";
import { functionExpression } from "@babel/types";
import {parse} from "@babel/parser";

const getNodeName = (node) => {
  return node.id?.name ?? null;
}

const curriedFunctionPrefix = "__curried";
const getCurriedFunctionName = (actualFunctionName) => {
  if (!actualFunctionName) return actualFunctionName;

  return curriedFunctionPrefix + actualFunctionName;
}

export default ({ types: t }) => {
  return {
    visitor: {
      Function(path) {
        const {node} = path;

        const actualName = getNodeName(node);
        if (actualName && actualName.startsWith(curriedFunctionPrefix)) {
          return;
        }

        const {params, body} = node;
        if (params.length <= 1) {
          return;
        }

        const curriedName = getCurriedFunctionName(actualName);

        const curriedFE = t.functionExpression(
          null,
          params.slice(1),
          body,
          node.generator,
          node.async
        );
        const curriedReturn = t.returnStatement(curriedFE);
        const curriedBody = t.blockStatement([curriedReturn], []);

        if (t.isFunctionDeclaration(path.node)) {
          path.insertBefore(
            t.functionDeclaration(
              curriedName ? t.identifier(curriedName) : null,
              [node.params[0]],
              curriedBody,
              node.generator,
              node.async
            )
          );
        } else {
          path.insertBefore(
            t.functionExpression(
              curriedName ? t.identifier(curriedName) : null,
              [node.params[0]],
              curriedBody,
              node.generator,
              node.async
            )
          );
        }

        // Update body of existing function to call the curried one.
        // 1. Go over params and see how many are non-undefined, say k.
        // 2. Call curried function k times.

        const resultIdName = "__$curriedResponse";
        const callCurryCode = `
          let ${resultIdName} = ${curriedName};
          const k = arguments.length;
          while (k--) {
            ${resultIdName} = ${resultIdName}(arguments[0]);
          }
        `;
        const callCurryBody = parse(callCurryCode).program.body;
        const returnStatement = t.returnStatement(t.identifier(resultIdName));
        const updatedBody = t.blockStatement(
          [...callCurryBody, returnStatement],
          [...body.directives]
        );

        if (t.isFunctionDeclaration(path.node)) {
          path.replaceWith(
            t.functionDeclaration(
              actualName ? t.identifier(actualName) : null,
              params,
              updatedBody,
              node.generator,
              node.async
            )
          );
        } else {
          path.replaceWith(
            t.functionExpression(
              actualName ? t.identifier(actualName) : null,
              params,
              updatedBody,
              node.generator,
              node.async
            )
          );
        }
        path.skip();
      }
    }
  };
};
