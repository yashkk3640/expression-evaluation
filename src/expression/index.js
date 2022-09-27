import _get from "lodash.get";
import {
  evaluateFunction,
  FUNCTION_ARGUMENT_SEPARATOR,
  VARIABLE_REGEX,
  evaluateExprFromString,
  validateFunction,
  renderExpression,
} from "./expressionFunction";
import { EXPRESSION_TABLE } from "./expressionDocJson";

const prepareDynamicValue = (originalValue, parameters) => {
  if (typeof originalValue === "string") {
    return originalValue.replace(VARIABLE_REGEX, (v) => {
      const variable = v.replace(/\$\$/g, "");
      const value = _get(parameters, variable);
      return value
        ? ["number", "object"].includes(typeof value)
          ? JSON.stringify(value)
          : value
        : "";
    });
  }
  return originalValue;
};

const expressionResolver = (expression, parameters) => {
  if (expression == null) {
    return expression;
  }
  const expressionString =
    typeof expression === "string"
      ? expression.replace(/,/g, FUNCTION_ARGUMENT_SEPARATOR)
      : expression;
  const strWithValue = prepareDynamicValue(expressionString, parameters);
  let result = evaluateFunction(strWithValue);
  if (typeof result === "string") {
    if (result === "") {
      result = strWithValue;
    }
    return result.replace(new RegExp(FUNCTION_ARGUMENT_SEPARATOR, "g"), ",");
  }
  return result;
};

export {
  EXPRESSION_TABLE,
  validateFunction,
  renderExpression,
  expressionResolver,
  evaluateExprFromString,
};

export default expressionResolver;
