import {parse} from "@babel/parser";

const getCurriedFunctionName = (id) => `__$curried${id ? id.name : "Func"}`;

/**
 * Takes a body and returns block statement.
 * Wraps in block if input is an expression.
 * @param {*} t 
 * @param {*} body 
 * @returns 
 */
const convertToBlockStatement = (t, body) => {
  if (t.isBlockStatement(body)) {
    return body;
  } else if (t.isExpression(body)) {
    const returnStatement = t.returnStatement(body);
    return t.blockStatement([returnStatement], []);
  } else {
    throw new TypeError(`Cannot convert unsupported type ${body.type} to block statement`);
  }
};

/**
 * Adds ".bind(this)" to a function expression.
 * @param {*} t 
 * @param {*} fe 
 * @returns 
 */
const attachBindToFE = (t, fe) => {
  if (!t.isFunctionExpression(fe)) {
    throw new TypeError(`Cannot attach bind to unsupported type ${body.type}`);
  }

  const memberExpression = t.memberExpression(fe, t.identifier("bind"), false, false);
  return t.callExpression(memberExpression, [t.thisExpression()]);
};

/**
 * Generates let variable declaration statement with LHS as curried variable name, and
 * RHS as the function expression.
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
const declareAsVariable = (t, {id, functionExpr}) => {
  const resultIdName = getCurriedFunctionName(id);
  const responseVD = t.variableDeclarator(
    t.identifier(resultIdName),
    functionExpr
  );
  const responseDecl = t.variableDeclaration(
    "let",
    [responseVD]
  );

  return [responseDecl, resultIdName];
};

/**
 * Given params, generate call to curried FE.
 * @param {*} t 
 * @param {*} params
 * @param {*} resultVar
 * @returns 
 */
const generateCurriedFECall = (t, {params, resultVar}) => {
  let callCurryCode = 'const args = [];';

  // Arrow functions do not have arguments binding, so manually constructing args array.
  params.forEach((param) => {
    let parameterName = '';
    if (t.isAssignmentPattern(param)) {
      // In case of default parameters.
      parameterName = param.left.name;
    } else {
      parameterName = param.name;
    }
    callCurryCode += `if (${parameterName} !== undefined) args.push(${parameterName});`;
  });

  /**
   * Iterate over each argument and call the curried method.
   * Ignore values assigned through default parameters. If first parameter
   * is assigned through default parameter, and no arguments are passed, use the first default
   * parameter, and ignore others.
   * FIXME: Cannot detect default parameters in case of arrow functions.
   */
  callCurryCode += `
    for (let i = 0; i < args.length; i++) {
      if (arguments && (arguments.length <= i) && (i != 0)) break;
      const arg = args[i];
      if (arg === undefined) ${resultVar} = ${resultVar}();
      else ${resultVar} = ${resultVar}(arg);
    }

    if (args.length === 0) ${resultVar} = ${resultVar}();
  `;

  return parse(callCurryCode).program.body;
};

/**
 * Recursive function to generate curried function *body* given an ordinary function.
 * @param {*} t 
 * @param {*} param1 
 * @returns 
 */
export default function generateCurriedBody(t, {id, params, body, generator, async}) {
  if (params.length <= 1) {
    // Functions with one or zero params need not be curried.
    return convertToBlockStatement(t, body);
  }

  const currentParams = params.slice(0, 1);
  const nextParams = params.slice(1);

  const recursiveCurriedBody = generateCurriedBody(t, {
    id,
    params: nextParams,
    body,
    generator,
    async
  });
  const curriedFE = t.functionExpression(
    null,
    nextParams,
    recursiveCurriedBody,
    (params.length <= 2) ? generator : false,
    (params.length <= 2) ? async : false
  );
  const boundCurriedFE = attachBindToFE(t, curriedFE);
  const curriedBody = convertToBlockStatement(t, boundCurriedFE);

  const responseFE = t.functionExpression(
    null,
    currentParams,
    curriedBody,
    false,
    false
  );
  const boundResponseFE = attachBindToFE(t, responseFE);
  const [responseDecl, resultVar] = declareAsVariable(t, {id, functionExpr: boundResponseFE});

  const callCurryBody = generateCurriedFECall(t, {params, resultVar});
  const returnStatement = t.returnStatement(t.identifier(resultVar));

  const updatedBody = t.blockStatement(
    [responseDecl, ...callCurryBody, returnStatement],
    recursiveCurriedBody.directives
  );

  return updatedBody;
}
