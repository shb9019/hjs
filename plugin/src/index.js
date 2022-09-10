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

const generateCurriedBody = (t, {id, params, body, generator, async, isClassMethod}) => {
  if (params.length <= 1) {
    return wrapInBlockStatement(t, body);
  }

  // 1. Return Statement
  const currentParameters = 1;
  const recursiveCurriedBody = generateCurriedBody(t, {
    id,
    params: params.slice(currentParameters),
    body,
    generator,
    async
  });
  const curriedFE = t.functionExpression(
    null,
    params.slice(currentParameters),
    recursiveCurriedBody,
    (params.length <= 2) ? generator : false,
    (params.length <= 2) ? async : false
  );
  const curriedReturn = t.returnStatement(curriedFE);
  const curriedBody = t.blockStatement([curriedReturn], []);

  // 2. Function Expression
  const responseFE = t.functionExpression(
    null,
    params.slice(0, currentParameters),
    curriedBody,
    false,
    false
  );

  // 3. Variable declaration
  const resultIdName = `__$curried${id ? id.name : "Func"}`;
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
  // Arrow functions do not have arguments binding.
  callCurryCode = `const args = [];`;
  params.forEach((param) => {
    let parameterName = '';
    if (t.isAssignmentPattern(param)) {
      parameterName = param.left.name;
    } else {
      parameterName = param.name;
    }
    callCurryCode += `if (${parameterName} !== undefined) args.push(${parameterName});`;
  });
  callCurryCode += `
    for(const arg of args) {
      ${resultIdName} = ${resultIdName}.call(this, arg);
    }

    if (args.length === 0) ${resultIdName} = ${resultIdName}.call(this, undefined);
  `;

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

        const {id, params, body} = node;
        if (params.length <= 1) {
          return;
        }

        const curriedBody = generateCurriedBody(t, {
          id,
          params,
          body,
          generator: node.generator,
          async: node.async,
          isClassMethod: t.isClassMethod(node)
        });

        if (t.isFunctionDeclaration(node)) {
          path.replaceWith(
            t.functionDeclaration(
              node.id,
              params,
              curriedBody,
              false,
              false
            )
          );
        } else if (t.isFunctionExpression(node)) {
          path.replaceWith(
            t.functionExpression(
              node.id,
              params,
              curriedBody,
              false,
              false
            )
          );
        } else if (t.isArrowFunctionExpression(node)) {
          path.replaceWith(
            t.arrowFunctionExpression(
              params,
              curriedBody,
              false
            )
          );
        } else if (t.isObjectMethod(node)) {
          path.replaceWith(
            t.objectMethod(
              node.kind,
              node.key,
              params,
              curriedBody,
              node.computed,
              false,
              false
            )
          );
        } else if (t.isClassMethod(node) && (node.kind !== "constructor")) {
          path.replaceWith(
            t.classMethod(
              node.kind,
              node.key,
              params,
              curriedBody,
              node.computed,
              node.static,
              false,
              false
            )
          );
        }

        path.skip();
      }
    }
  };
};
