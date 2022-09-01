# Goal
Write a transpiler to change functions to curried functions i.e.,
`f(x,y) -> f(x,f(y))` or something on those lines.

## Examples

### Case 1
```js
// Input
function showMessage() {
    alert('Hello everyone');
}

// Output
function showMessage() {
    alert('Hello everyone');
}
```

### Case 2
```js
// Input
function showMessage(from, text) {
  alert(from + ': ' + text);
}

// Output

// Curried Function
function __showMessage(from) {
    return function(text) {
        alert(from + ': ' + text);
    }
}

// Adapter for curried function
function showMessage(from, text) {
    if (text == undefined) {
        return __showMessage(from);
    }

    return __showMessage(from)(text);
}
```

### Case 3
```js
// Input
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

// Output

// Curried Function
function __showMessage(from) {
    return function(text) {
        alert(from + ': ' + text);
    }
}

// Assume parameter is passed if default variables are given.
function showMessage(from, text = "no text given") {
    if (text == undefined) {
        return __showMessage(from);
    }

    return __showMessage(from)(text);
}
```


# Targets
[x] Create sample babel transpiler
[x] Publish sample babel tranpiler on npm
[x] Brainstorm on transforming function to curried function
[x] Integrate unit test framework
[] Integrate changes only for specific test files
[] Test out all possible combinations of functions and scopes
[] Write dozens of unit tests
[] Implement changes
[] Publish to npm
[] Publish as v1 on Github and NPM
[] Develop website to 

## Optional Targets
[] Think about name mangling to prevent collisions with existing function names