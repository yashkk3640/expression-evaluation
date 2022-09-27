const functions = require("./functions");
export const functionsMap = functions;
// TODO: regex working upto 5 level of brackets
const BRACKET_REGEX =
  /\w+\s*\((?:[^)(]+|\((?:[^)(]+|\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))*\))*\)/g;

export const VARIABLE_REGEX = /\$\$(.*?)\$\$/g;

// using !!! as separator as BRACKET_REGEX is using word and space to resolve
export const FUNCTION_ARGUMENT_SEPARATOR = "!!!";

/** Validate Expression */

export const validateFunction = (
  strFunCall = "",
  setMessage = (_) => _,
  strict = false
) => {
  const bracketStartAt = strFunCall.indexOf("(");
  if (bracketStartAt !== -1) {
    if (
      strFunCall.match(/\(/g).length === (strFunCall.match(/\)/g) || []).length
    ) {
      const funName = strFunCall.substring(0, bracketStartAt).trim();
      const funArgs = strFunCall
        .substring(bracketStartAt + 1, strFunCall.length - 1)
        .trim();
      if (functions[funName]) {
        const { isValid, args } = validateNestedCall(funArgs, setMessage);
        if (isValid) {
          const isSameNoOfArgs =
            args
              .split(",")
              .map((ar) => ar.trim())
              .filter((ar) => ar !== "").length === functions[funName].noOfArgs;
          if (!isSameNoOfArgs)
            setMessage(
              `Invalid number of arguments for ${funName}. (needs ${functions[funName].noOfArgs})`
            );
          return isSameNoOfArgs;
        } else {
          return false;
        }
      }
      setMessage(`Invalid function name ${funName}.`);
      return false;
    }
    setMessage("Brackets are not matching up properly.");
    return false;
  }
  if (strict) {
    setMessage("Specify Expression Only.");
    return false;
  }
  return true;
};

const validateNestedCall = (argumentString, setMessage) => {
  let args = argumentString;
  let valid = true;
  const nestedCall = argumentString.match(BRACKET_REGEX);
  if (nestedCall && nestedCall.length > 0) {
    nestedCall.forEach((c) => {
      const isValid = validateFunction(c, setMessage);
      if (isValid) {
        args = args.replace(c, 1);
      } else {
        valid = isValid;
      }
    });
  }
  return { isValid: valid, args };
};

const validateFunctionWNull = (str) => {
  let mayBeFunCall = false;
  const setMsg = (msg = "") =>
    (mayBeFunCall = msg.includes("Invalid number of arguments"));
  return validateFunction(str, setMsg, true) || mayBeFunCall;
};

/** Evaluate Expression */
// if we have string "test ADD(1, 2) test2" it should be working with this function
// if function split by space connect it
export const evaluateExprFromString = (strFunCall = "") =>
  strFunCall
    .split(" ")
    .reduce((arr, str) => {
      if (validateFunctionWNull(str)) {
        // normal function
        return [...arr, evaluateFunction(str)];
      } else if (
        // if split bcoz of 1 space
        `${arr[arr.length - 1] || ""}`.indexOf("(") > 0 &&
        validateFunctionWNull(`${arr[arr.length - 1] || ""} ${str}`)
      ) {
        return [
          ...arr.slice(0, -1),
          evaluateFunction(`${arr[arr.length - 1] || ""} ${str}`),
        ];
      } else if (`${arr[arr.length - 1] || ""}`.indexOf("(") > 0) {
        // still not solved may be more than 1 space
        return [...arr.slice(0, -1), `${arr[arr.length - 1] || ""} ${str}`];
      }
      return [...arr, str];
    }, [])
    .join(" ");

export const evaluateFunction = (strFunCall = "") => {
  if (typeof strFunCall === "string") {
    const bracketStartAt = strFunCall.indexOf("(");
    if (bracketStartAt !== -1) {
      return callFunction(
        strFunCall.substring(0, bracketStartAt).trim(),
        strFunCall.substring(bracketStartAt + 1, strFunCall.length - 1).trim()
      );
    }
  }
  return strFunCall;
};

const getRidOfNestedCall = (argumentString) => {
  let args = argumentString;
  const nestedCall = args.match(BRACKET_REGEX);
  if (nestedCall && nestedCall.length > 0) {
    nestedCall.forEach((c) => (args = args.replace(c, evaluateFunction(c))));
  }
  return args;
};

const getArguments = (argumentString, noOfArgs = 2) => {
  let args = argumentString;
  if (noOfArgs === 1) {
    args = getRidOfNestedCall(args);
    return [args];
  } else {
    args = getRidOfNestedCall(args);
    return args.split(FUNCTION_ARGUMENT_SEPARATOR).map((ar) => ar.trim());
  }
};

const callFunction = (name, args) => {
  if (functions[name]) {
    const { compute, noOfArgs } = functions[name];
    return compute(...getArguments(args, noOfArgs));
  } else return "";
};

/** Render Expression */

export const renderExpression = (expr = "") => {
  const splitText = expr.split(VARIABLE_REGEX);

  if (splitText.length <= 1) {
    return expr;
  }

  const matches = expr.match(VARIABLE_REGEX).map((v) => v.replace(/\$\$/g, ""));

  return splitText.reduce((arr, element) => {
    if (!element) return arr;
    if (matches.includes(element)) {
      return [
        ...arr,
        `<b key='${element}'>
          <i>${element}</i>
        </b>`,
      ];
    }
    return [...arr, element];
  }, []);
};

/** Is All Arguments available? */
// also supporting for inner values, like grid.columnId
export const isAllArgsAvailable = (expr, formData) => {
  const allArgs = expr.match(VARIABLE_REGEX) || [];
  const isAllArgsAvail = allArgs.reduce((isValid, ar) => {
    const variable = ar.replace(/\$\$/g, "");
    const indexOfDOT = variable.indexOf(".");
    return (
      isValid &&
      (indexOfDOT !== -1
        ? (formData[variable.substring(0, indexOfDOT)] || {})[
            variable.substring(indexOfDOT + 1)
          ]
        : formData[variable]) != null
    );
  }, true);
  return isAllArgsAvail;
};
