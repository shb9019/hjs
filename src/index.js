import generateCurriedBody from "./generateCurriedBody";

let visitor = () => {};

const getCurriedBodyFromPath = (path, t) => {
  const {node} = path;

  const {id, params, body} = node;
  path.traverse(visitor(t));
  const curriedBody = generateCurriedBody(t, {
    id,
    params,
    body,
    generator: node.generator,
    async: node.async
  });

  return curriedBody;
};

visitor = (t) => {
  return {
    FunctionDeclaration(path) {
      const {node} = path;
  
      const {params} = node;
      if (params.length <= 1) {
        return;
      }
  
      path.replaceWith(
        t.functionDeclaration(
          node.id,
          params,
          getCurriedBodyFromPath(path, t),
          false,
          false
        )
      );
  
      path.skip();
    },
    FunctionExpression(path) {
      const {node} = path;
  
      const {params} = node;
      if (params.length <= 1) {
        return;
      }
  
      path.replaceWith(
        t.functionExpression(
          node.id,
          params,
          getCurriedBodyFromPath(path, t),
          false,
          false
        )
      );
  
      path.skip();
    },
    ArrowFunctionExpression(path) {
      const {node} = path;
  
      const {params} = node;
      if (params.length <= 1) {
        return;
      }
  
      path.replaceWith(
        t.arrowFunctionExpression(
          params,
          getCurriedBodyFromPath(path, t),
          false
        )
      );
  
      path.skip();
    },
    ObjectMethod(path) {
      const {node} = path;
  
      const {params} = node;
      if (params.length <= 1) {
        return;
      }
  
      path.replaceWith(
        t.objectMethod(
          node.kind,
          node.key,
          params,
          getCurriedBodyFromPath(path, t),
          node.computed,
          false,
          false
        )
      );
  
      path.skip();
    },
    ClassMethod(path) {
      const {node} = path;
  
      const {params} = node;
      if ((params.length <= 1) || (node.kind === "constructor")) {
        return;
      }
  
      path.replaceWith(
        t.classMethod(
          node.kind,
          node.key,
          params,
          getCurriedBodyFromPath(path, t),
          node.computed,
          node.static,
          false,
          false
        )
      );
  
      path.skip();
    },
  };
};

export default ({ types: t }) => {
  return {
    visitor: visitor(t),
  };
};
