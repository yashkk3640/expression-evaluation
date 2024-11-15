 <div align="center">
 <img align="center" width="230" src="https://i.imgur.com/pGGFGpi.png" />
  <h2>Expression Evaluation</h2>
  <blockquote>String Expression with some variable and basic functions to be solved</blockquote>
 
 <a href="https://github.com/yashkk3640/expression-evaluation/actions"><img alt="Build Status" src="https://github.com/yashkk3640/expression-evaluation/workflows/Build/badge.svg?color=green" /></a> <a href="https://github.com/yashkk3640/expression-evaluation/actions"> <img alt="Publish Status" src="https://github.com/yashkk3640/expression-evaluation/workflows/Publish/badge.svg?color=green" /></a> 
 
<strong>For code base, check out [expression-evaluation](https://github.com/yashkk3640/expression-evaluation).</strong><br />
</div>

## ⭐️ Features

- Solve Text (type `String`) which may have some parameters using `prepareDynamicValue`
  `
- Babel 7
- Hot reloading (`npm start`)
- UMD exports, so your library works everywhere.
- Jest unit testing
- Daily [dependabot](https://dependabot.com) dependency updates

## 📦 Getting Started

```
git clone https://github.com/yashkk3640/expression-evaluation.git myLibrary
npm install
```

## 🚀 Deployment

1. `npm publish`
2. Your users can include your library as usual

### npm

```jsx
import expressionEvaluate from '@yashkk3640/expression-evaluation';
/* or
// one or any of this as per your use case
import {
    EXPRESSION_TABLE,
    validateFunction,
    renderExpression,
    expressionResolver,
    evaluateExprFromString,
    EVALUATE_EXPR_LINES
} from '@yashkk3640/expression-evaluation';
*/
const exprWVariable = `Hello IF_ELSE(EQ($$user$$,Yash Khatri),Owner,$$user$$) ,\nWelcome to the coding world of Expression Evaluation! 🎉

We’re excited to have you here. $$repoName$$ repository is dedicated to solve string expression variables and basic functions. Whether you’re a beginner or an experienced developer, we hope you find this project engaging and useful.`

// If your code just have expression like `IF_ELSE(EQ($$user$$,Yash Khatri),Owner,$$user$$)` recommended to use `expressionResolver` instead of EVALUATE_EXPR_LINES
const solvedExpr = EVALUATE_EXPR_LINES(exprWVariable, {user:'Yash Khatri',repoName:"@yashkk3640/expression-evaluation"})
/*
Output : 'Hello Owner,\nWelcome to the coding world of Expression Evaluation! 🎉\n\nWe’re excited to have you here. @yashkk3640/expression-evaluation repository is dedicated to solve string expression variables and basic functions. Whether you’re a beginner or an experienced developer, we hope you find this project engaging and useful.'
*/

...
```

## Exported Functions

| Functions Name          | Type     | Default Export | Description                                                                                       |
| ----------------------- | -------- | -------------- | ------------------------------------------------------------------------------------------------- |
| **expressionResolver**  | FUNCTION | `Yes`          | use to solve direct expression (string which just have Expression) [Details](#expressionResolver) |
| **EVALUATE_EXPR_LINES** | FUNCTION | `No`           | Use to solve paragraph kind of string (multiline strings) [Details](#EVALUATE_EXPR_LINES)         |
| **validateFunction**    | FUNCTION | `No`           | Use to validate is given string expression valid or not, [Details](#validatefunction)             |
| **renderExpression**    | FUNCTION | `No`           | Use to render expression with bold and italic text, [Details](#renderExpression)                  |
| **EXPRESSION_TABLE**    | JSON     | `No`           | Json of all available functions with example and no of arguments require to call                  |

## expressionResolver

### Overview

`expressionResolver` evaluates a mathematical expression represented as a string and substitutes parameters for variables. This allows users to dynamically compute values based on provided inputs.

### Parameters

- **`expression`**: `string`  
  A string representing the expression to evaluate (e.g., `ADD($$firstNum$$,$$secondNum$$)`).

- **`parameters`**: `object`  
  An object containing key-value pairs for variable substitution (e.g., `{ firstNum: 100, secondNum: 150 }`).

### Returns

- The result of the evaluated expression, which could be a number or a string. For example, `250` for the given inputs.

### Example

```javascript
const expression = "ADD($$firstNum$$,$$secondNum$$)";
const parameters = { firstNum: 100, secondNum: 150 };

const result = expressionResolver(expression, parameters);
// Output: 250
```

## EVALUATE_EXPR_LINES

### Overview

`EVALUATE_EXPR_LINES` evaluates string expressions with dynamic variables. It replaces placeholders with actual values, making it useful for templating and content generation.

### Parameters

- **`expressionLines`**: `string`  
  A string containing expressions with placeholders (e.g., `Hello IF_ELSE(EQ($$user$$,Yash Khatri),Owner,$$user$$),...`).

- **`parameters`**: `object`  
  An object for variable substitution (e.g., `{ user: 'Yash Khatri', repoName: "@yashkk3640/expression-evaluation" }`).

### Returns

- A string with function and variables replaced by their corresponding values.

### Example

```javascript
const expression = `Hello IF_ELSE(EQ($$user$$,Yash Khatri),Owner,$$user$$),\nWelcome to the coding world of Expression Evaluation! 🎉...`;
const parameters = {
  user: "Yash Khatri",
  repoName: "@yashkk3640/expression-evaluation",
};

const result = EVALUATE_EXPR_LINES(expression, parameters);
// Output: 'Hello Owner,\nWelcome to the coding world of Expression Evaluation! 🎉...'
```

## validateFunction

### Overview

`validateFunction` is a JavaScript utility that validates function calls represented as strings. It checks for proper syntax, including bracket matching, valid function names, and the correct number of arguments.

### Parameters

- **`strFunCall`**: `string` (default: `""`)  
  The function call string to validate.

- **`setMessage`**: `function` (default: `(_) => _`)  
  A callback function to display validation messages.

- **`strict`**: `boolean` (default: `false`)  
  If `true`, enforces strict validation for function call expressions.

### Returns

- Returns `true` if the function call is valid.
- Returns `false` if invalid, setting appropriate error messages via `setMessage`.

### Example

```javascript
const functions = {
  myFunction: { noOfArgs: 2 },
  anotherFunction: { noOfArgs: 1 },
};

const setMessage = (msg) => console.log(msg);

const isValid = validateFunction("myFunction(arg1, arg2)", setMessage);
// Output: true

const isInvalid = validateFunction("myFunction(arg1)", setMessage);
// Output: Invalid number of arguments for myFunction. (needs 2)
```

## renderExpression

### Overview

`renderExpression` formats a given expression string by identifying variables and rendering them in HTML. Variables are displayed in bold and italicized text.

### Parameters

- **`expr`**: `string` (default: `""`)  
  The expression string containing variables to format.

### Returns

- An array of strings and formatted HTML elements, where variables are wrapped in `<b>` and `<i>` tags.

### Example

```javascript
const VARIABLE_REGEX = /\$\$[a-zA-Z_][a-zA-Z0-9_]*/g;

const expression = "$$variable1 is greater than $$variable2";
const rendered = renderExpression(expression);

/* Output: [
   "<b key='variable1'><i>variable1</i></b> is greater than ",
   "<b key='variable2'><i>variable2</i></b>"
 ] */
```

# Happy coding! 🚀
