import {parse} from "@babel/parser";
import generate from "@babel/generator";

const generateCurriedBody = (t, {params, body, generator, async}) => {
  if (params.length === 0) return body;

  const recursiveBody = generateCurriedBody(t, {
    params: params.slice(1),
    body,
    generator,
    async
  });

  const curriedFE = t.functionExpression(
    null,
    [params[0]],
    recursiveBody,
    generator,
    async
  );
  const curriedReturn = t.returnStatement(curriedFE);
  const curriedBody = t.blockStatement([curriedReturn], []);

  return curriedBody;
};

export default ({ types: t }) => {
  return {
    visitor: {
      Function(path) {
        const {node} = path;

        const {params, body} = node;
        if (params.length <= 1) {
          return;
        }

        const curriedBody = generateCurriedBody(t, {
          params: params.slice(1),
          body,
          generator: node.generator,
          async: node.async
        });
        const curriedFE = t.functionExpression(
          null,
          [node.params[0]],
          curriedBody,
          node.generator,
          node.async
        );
        const resultIdName = "__$curriedResponse";

        const curriedVD = t.variableDeclarator(
          t.identifier(resultIdName),
          curriedFE
        );
        const curriedDecl = t.variableDeclaration(
          "let",
          [curriedVD]
        );

        const callCurryCode = `
          for(const arg of arguments) {
            ${resultIdName} = ${resultIdName}(arg);
          }
        `;
        const callCurryBody = parse(callCurryCode).program.body;
        const returnStatement = t.returnStatement(t.identifier(resultIdName));
        const updatedBody = t.blockStatement(
          [curriedDecl, ...callCurryBody, returnStatement],
          [...body.directives]
        );

        if (t.isFunctionDeclaration(path.node)) {
          path.replaceWith(
            t.functionDeclaration(
              node.id,
              params,
              updatedBody,
              node.generator,
              node.async
            )
          );
        } else {
          path.replaceWith(
            t.functionExpression(
              node.id,
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
