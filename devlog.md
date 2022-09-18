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
24. "this" will be whatever is passed before the dot. This is inline with javascript behavior.
25. This point can lead to weird behavior where `obj.func(1)(2)` will not have obj context. It should instead be called as `obj.func(1, 2)`.
26. Functions passed to library or in-built methods can take lesser parameters, but never more parameters than what is defined. Exception is variadic functions.
27. This plugin doesn't support functions built using `new Function` constructor.
28. Class constructor should not be curried. It's a creation of object. Wrap it inside a function if required.
29. Class methods must lock the context. Should they? See, class constructors do not need to be curried because they are not functions.
30. Class methods can be curried because they are methods. But, is there a benefit in letting them lose their context?
  If you don't preserve context, they would end up having to always call it using bind or apply.
31. It makes sense to preserve context because it is a method that is specific to a class object.
32. How do I allow users to also be able to override context by using call, apply and bind? These functions only
  change the value of "this". I have to somehow refer to "this" at nested function expressions. I cannot replace
  it with "that". Will nested "bind" of this work? 
33. Defining feature is that the first creation of curried function will bind the 'this' context. Irrespective of context.
34. I've refactored the code and moved stuff around with comments.
35. One thing I missed is nested functions with multiple parameters. Such nested functions will not be processed since we're skipping.
36. The above thing is simply solved using a recursive call to the visitor in the correct order.
37. I want to be able to return a function that preserves the parameters it accepts. Bind denies me from doing this. I don't think there is a choice right now. Need to fix later.
38. You should also ensure at least one parameter is always utilized.