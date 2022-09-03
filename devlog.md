# Log

1. Install nvm and switch to node v16.
2. Create npm repo using `npm init`
3. Install webpack and webpack cli using `npm install webpack webpack-cli --save-dev`
4. Create index.html and src/index.js files.
5. Follow https://webpack.js.org/guides/getting-started/.
6. Install babel, `npm install --save-dev babel-loader @babel/core`
7. Install preset-env, `npm install @babel/preset-env --save-dev`
8. Create test-plugin.js file in plugin directory.
9. Setup webpack inside plugin directory to enable bundling.
10. After struggling with the config to output the default function, I figured out that I have to specify a library name!
11. Still another error now in the parent project, `self is not defined`. Fixed this by setting `global` property to `this` in webpack config.
12. Everything works as expected with webpack now.
13. Migrating to babel using https://github.com/entwicklerstube/babel-plugin-root-import/ as reference. Worked pretty well.
14. Minimized the amount of code required to make this work. Works well now!
15. Refactored codebase and moved client files to separate directory.
16. Looking into writing unit tests now.
17. Integrated babel-plugin-tester to implement testing. Struggled with setting up fixtures, but that's done.
18. I'm done with recursively generating a curried body, but it still doesn't stick to the intended definition.
19. Currently, calling a function with partial parameters, leads to a curried function which I don't want.
20. I've successfully implemented the recursive definitions.
21. I've hit a roadblock with default parameters. Consider the following function,
```js
  function addNumbers(a, b, c = 10, d = 11, e);
```
The following function call can be interpreted in 3 ways. Each of these can return a function accepting the remaining parameters.
```js
  addNumbers(1, 2); // Takes 3 parameters
  addNumbers(1, 2, undefined); // Takes 2 parameters
  addNumbers(1, 2, undefined, undefined); // Takes 1 parameter
```
Can we decide on how to deal with these? The best choice seems to be the first one. But that'll lead to the following function call.
```js
  function addNumbers(a, b, c = 10, d = 11);
  addNumbers(0, 1)()();
  addNumbers(0, 1, undefined, undefined);
```
I'm going with the first one itself.
22. I hit another issue with arrow functions not having the arguments binding. Overcame it by creating a separate args array that will be used by the code.
23. Think about using function properties to achieve this, instead of directly modifying functions itself.