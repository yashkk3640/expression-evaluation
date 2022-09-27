const moment = require("moment-timezone");
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
  noOfArgs: 2,
};
export const SUB = {
  compute: (args1, args2) => Number(args1) - Number(args2),
  noOfArgs: 2,
};
export const MUL = {
  compute: (args1, args2) => Number(args1) * Number(args2),
  noOfArgs: 2,
};
export const DIV = {
  compute: (args1, args2) => Number(args1) / Number(args2),
  noOfArgs: 2,
};

export const EQ = {
  compute: (args1, args2) => args1 === args2,
  noOfArgs: 2,
};
export const NEQ = {
  compute: (args1, args2) => args1 !== args2,
  noOfArgs: 2,
};
export const GT = {
  compute: (args1, args2) => Number(args1) > Number(args2),
  noOfArgs: 2,
};
export const GTE = {
  compute: (args1, args2) => Number(args1) >= Number(args2),
  noOfArgs: 2,
};
export const LT = {
  compute: (args1, args2) => Number(args1) < Number(args2),
  noOfArgs: 2,
};
export const LTE = {
  compute: (args1, args2) => Number(args1) <= Number(args2),
  noOfArgs: 2,
};

export const AND = {
  compute: (args1, args2) => getBoolean(args1) && getBoolean(args2),
  noOfArgs: 2,
};
export const OR = {
  compute: (args1, args2) => getBoolean(args1) || getBoolean(args2),
  noOfArgs: 2,
};

export const NOT = {
  compute: (args1) => !getBoolean(args1),
  noOfArgs: 1,
};

export const TRUE = {
  compute: () => true,
  noOfArgs: 0,
};

export const IF_ELSE = {
  compute: (args1, args2, args3) => (getBoolean(args1) ? args2 : args3),
  noOfArgs: 3,
};

export const CONCAT = { compute: (args1, args2) => args1 + args2, noOfArgs: 2 };

export const UPPERCASE = { compute: (arg) => arg.toUpperCase(), noOfArgs: 1 };
export const LOWERCASE = { compute: (arg) => arg.toLowerCase(), noOfArgs: 1 };
export const CAMEL_TO_TITLE = {
  compute: (arg) =>
    arg
      .replace(/(?!^[A-Z])([A-Z])/g, (match) => ` ${match}`) // ([A-Z])
      .replace(/^./, (match) => match.toUpperCase()),
  noOfArgs: 1,
};

export const DATE_GT = {
  compute: (args1, args2) => moment(args1).isAfter(moment(args2)),
  noOfArgs: 2,
};

export const DATE_GTE = {
  compute: (args1, args2) => moment(args1).isSameOrAfter(moment(args2)),
  noOfArgs: 2,
};

export const DATE_LT = {
  compute: (args1, args2) => moment(args1).isBefore(moment(args2)),
  noOfArgs: 2,
};

export const DATE_LTE = {
  compute: (args1, args2) => moment(args1).isSameOrBefore(moment(args2)),
  noOfArgs: 2,
};

export const ADD_IN_DATE = {
  compute: (args1, args2, args3) =>
    moment
      .tz(args1, TIME_ZONE)
      .add(Number(args2), args3)
      .clone()
      .format(DEFAULT_DATE_FORMAT),
  noOfArgs: 3,
};

export const NOW = {
  compute: () => moment.tz(TIME_ZONE).format(DEFAULT_DATE_FORMAT),
  noOfArgs: 0,
};

export const DATE_FORMAT = {
  compute: (dt, format) => (dt ? moment.tz(dt, TIME_ZONE).format(format) : dt),
  noOfArgs: 2,
};

export const NOT_EMPTY = {
  compute: (arg) =>
    arg != null
      ? arg.includes("[")
        ? CHECK_ARRAY(JSON.parse(arg))
        : arg !== ""
      : false,
  noOfArgs: 1,
};

export const EMPTY = {
  compute: (arg) => !NOT_EMPTY.compute(arg),
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
