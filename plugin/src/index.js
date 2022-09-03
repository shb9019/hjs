import {parse} from "@babel/parser";
import generate from "@babel/generator";

const wrapInBlockStatement = (t, body) => {
  if (t.isBlockStatement(body)) {
    return body;
  } else if (t.isExpression(body)) {
    const returnStatement = t.returnStatement(body);
    return t.blockStatement([returnStatement], []);
  }
}

const generateCurriedBody = (t, {params, body, generator, async, isArrow}) => {
  if (params.length <= 1) {
    return wrapInBlockStatement(t, body);
  }

  // 1. Return Statement
  const currentParameters = 1;
  const recursiveCurriedBody = generateCurriedBody(t, {
    params: params.slice(currentParameters),
    body,
    generator,
    async,
    isArrow: false
  });
  const curriedFE = t.functionExpression(
    null,
    params.slice(currentParameters),
    recursiveCurriedBody,
    generator,
    async
  );
  const curriedReturn = t.returnStatement(curriedFE);
  const curriedBody = t.blockStatement([curriedReturn], []);

  // 2. Function Expression
  const responseFE = t.functionExpression(
    null,
    params.slice(0, currentParameters),
    curriedBody,
    generator,
    async
  );

  // 3. Variable declaration
  const resultIdName = "__$curriedResponse";
  const responseVD = t.variableDeclarator(
    t.identifier(resultIdName),
    responseFE
  );
  const responseDecl = t.variableDeclaration(
    "let",
    [responseVD]
  );

  // 4. For args loop
  let callCurryCode = '';
  if (isArrow) {
    // Arrow functions do not have arguments binding.
    callCurryCode = `const args = [];`;
    params.forEach((param) => {
      callCurryCode += `if (${param.name} !== undefined) args.push(${param.name});`;
    });
    callCurryCode += `
    for(const arg of args) {
        ${resultIdName} = ${resultIdName}(arg);
      }

      if (args.length === 0) ${resultIdName} = ${resultIdName}(undefined);
    `;
  } else {
    callCurryCode = `
      for(const arg of arguments) {
        ${resultIdName} = ${resultIdName}(arg);
      }

      if (arguments.length === 0) ${resultIdName} = ${resultIdName}(undefined);
    `;
  }

  const callCurryBody = parse(callCurryCode).program.body;
  
  // 5. Final return statement.
  const returnStatement = t.returnStatement(t.identifier(resultIdName));

  const updatedBody = t.blockStatement(
    [responseDecl, ...callCurryBody, returnStatement],
    recursiveCurriedBody.directives
  );

  return updatedBody;
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
          params,
          body,
          generator: node.generator,
          async: node.async,
          isArrow: t.isArrowFunctionExpression(node),
        });

        if (t.isFunctionDeclaration(node)) {
          path.replaceWith(
            t.functionDeclaration(
              node.id,
              params,
              curriedBody,
              node.generator,
              node.async
            )
          );
        } else if (t.isFunctionExpression(node)) {
          path.replaceWith(
            t.functionExpression(
              node.id,
              params,
              curriedBody,
              node.generator,
              node.async
            )
          );
        } else if (t.isArrowFunctionExpression(node)) {
          path.replaceWith(
            t.arrowFunctionExpression(
              params,
              curriedBody,
              node.async
            )
          );
        }

        path.skip();
      }
    }
  };
};
