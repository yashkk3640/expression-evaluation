const dayjs = require("dayjs");
const { DEFAULT_DATE_FORMAT, TIME_ZONE } = require("../enum");

const getBoolean = (strBool) =>
  strBool.trim().toLowerCase() === "true"
    ? true
    : strBool.trim().toLowerCase() === "false"
    ? false
    : undefined;

const CHECK_ARRAY = (arr) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  !arr.some(
    (a) =>
      a == null ||
      (typeof a === "string" && a === "") ||
      (typeof a === "object" && JSON.stringify(a) === JSON.stringify({}))
  );

export const ADD = {
  compute: (args1, args2) => Number(args1) + Number(args2),
  name: "Addition",
  noOfArgs: 2,
};
export const SUB = {
  compute: (args1, args2) => Number(args1) - Number(args2),
  name: "Subtraction",
  noOfArgs: 2,
};
export const MUL = {
  compute: (args1, args2) => Number(args1) * Number(args2),
  name: "Multiplication",
  noOfArgs: 2,
};
export const DIV = {
  compute: (args1, args2) => Number(args1) / Number(args2),
  name: "Division",
  noOfArgs: 2,
};

export const EQ = {
  compute: (args1, args2) => args1 === args2,
  name: "Equal",
  noOfArgs: 2,
};
export const NEQ = {
  compute: (args1, args2) => args1 !== args2,
  name: "Not Equal",
  noOfArgs: 2,
};
export const GT = {
  compute: (args1, args2) => Number(args1) > Number(args2),
  name: "Greater Than",
  noOfArgs: 2,
};
export const GTE = {
  compute: (args1, args2) => Number(args1) >= Number(args2),
  name: "Greater Than or Equal",
  noOfArgs: 2,
};
export const LT = {
  compute: (args1, args2) => Number(args1) < Number(args2),
  name: "Less Than",
  noOfArgs: 2,
};
export const LTE = {
  compute: (args1, args2) => Number(args1) <= Number(args2),
  name: "Less Than or Equal",
  noOfArgs: 2,
};

export const CONTAINS = {
  compute: (args1 = "", args2) =>
    args2 && String(args1).includes(String(args2)),
  name: "Contains",
  noOfArgs: 2,
};

export const AND = {
  compute: (args1, args2) => getBoolean(args1) && getBoolean(args2),
  name: "Logical AND (&&)",
  noOfArgs: 2,
};
export const OR = {
  compute: (args1, args2) => getBoolean(args1) || getBoolean(args2),
  name: "Logical OR (||)",
  noOfArgs: 2,
};

export const NOT = {
  compute: (args1) => !getBoolean(args1),
  name: "Logical NOT (!)",
  noOfArgs: 1,
};

export const TRUE = {
  compute: () => true,
  name: "Always Returns True",
  noOfArgs: 0,
};

export const IF_ELSE = {
  compute: (args1, args2, args3) => (getBoolean(args1) ? args2 : args3),
  name: "If Else",
  noOfArgs: 3,
};

export const CONCAT = {
  compute: (args1, args2) => args1 + args2,
  name: "Concatenation",
  noOfArgs: 2,
};

export const UPPERCASE = {
  compute: (arg) => arg.toUpperCase(),
  name: "Uppercase",
  noOfArgs: 1,
};

export const LOWERCASE = {
  compute: (arg) => arg.toLowerCase(),
  name: "Lowercase",
  noOfArgs: 1,
};

export const CAMEL_TO_TITLE = {
  compute: (arg) =>
    arg
      .replace(/(?!^[A-Z])([A-Z])/g, (match) => ` ${match}`) // ([A-Z])
      .replace(/^./, (match) => match.toUpperCase()),
  noOfArgs: 1,
};

export const DATE_GT = {
  compute: (args1, args2) => dayjs(args1).isAfter(dayjs(args2)),
  name: "Date Greater Than",
  noOfArgs: 2,
};

export const DATE_GTE = {
  compute: (args1, args2) => dayjs(args1).isSameOrAfter(dayjs(args2)),
  name: "Date Greater Than or Equal",
  noOfArgs: 2,
};

export const DATE_LT = {
  compute: (args1, args2) => dayjs(args1).isBefore(dayjs(args2)),
  name: "Date Less Than",
  noOfArgs: 2,
};

export const DATE_LTE = {
  compute: (args1, args2) => dayjs(args1).isSameOrBefore(dayjs(args2)),
  name: "Date Less Than or Equal",
  noOfArgs: 2,
};

export const ADD_IN_DATE = {
  compute: (args1, args2, args3) =>
    dayjs
      .tz(args1, TIME_ZONE)
      .add(Number(args2), args3)
      .clone()
      .format(DEFAULT_DATE_FORMAT),
  name: "Add days in Date",
  noOfArgs: 3,
};

export const NOW = {
  compute: () => dayjs().tz(TIME_ZONE).format(DEFAULT_DATE_FORMAT),
  name: "Current Date time",
  noOfArgs: 0,
};

export const DATE_FORMAT = {
  compute: (dt, format) => (dt ? dayjs.tz(dt, TIME_ZONE).format(format) : dt),
  noOfArgs: 2,
};

export const NOT_EMPTY = {
  compute: (arg) =>
    arg != null
      ? arg.includes("[")
        ? CHECK_ARRAY(JSON.parse(arg))
        : arg !== ""
      : false,
  name: "Not Empty",
  noOfArgs: 1,
};

export const EMPTY = {
  compute: (arg) => !NOT_EMPTY.compute(arg),
  name: "Empty",
  noOfArgs: 1,
};

export const PUSH = {
  compute: (arg1, arg2) => {
    let value = arg2;
    try {
      value = JSON.parse(arg2);
    } catch (e) {
      console.warn("skipping JSON parsing as got invalid JSON");
    }
    return arg1 == null || arg1 === ""
      ? [value]
      : JSON.parse(arg1).concat(value);
  },
  noOfArgs: 2,
};

export const SUM = {
  compute: (arg) => {
    // data should be loaded for :: (state of array)
    if (typeof arg === "string" && arg.includes(":")) {
      const indexOfDC = arg.indexOf("::");
      // string should have "::" sequentially and it should be starts with "[{" as it's array call
      const isArrayCall = indexOfDC > -1 && arg.startsWith("[{");
      const propName = isArrayCall ? arg.slice(indexOfDC + 2) : "";
      const jsonArray = isArrayCall && JSON.parse(arg.substring(0, indexOfDC));

      const array = Array.isArray(jsonArray) ? jsonArray : arg.split(":");
      const sum = array.reduce(
        (acc, a) =>
          acc + (isArrayCall ? Number(a[propName] || 0) : Number(a || 0)),
        0
      );
      return +sum.toFixed(4);
    }
    return 0;
  },
  name: "Sum of Column",
  // name: 'Sum or Column or Array prop',
  noOfArgs: 1,
};
