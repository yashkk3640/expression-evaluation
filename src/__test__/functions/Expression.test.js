const { expressionResolver } = require("../../expression");
const { validateFunction } = require("../../expression/expressionFunction");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const { TIME_ZONE } = require("../../enum");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const NEEDS_TO_VALIDATE = [
  { expr: "MUL(10,5)", isValid: true, msgReg: /^$/i },
  {
    expr: "MUL(3,2,1)",
    isValid: false,
    msgReg: /invalid number of arguments/i,
  },
  {
    expr: "MUL(3,2",
    isValid: false,
    msgReg: /brackets are not matching/i,
  },
  {
    expr: "mul(3,2)",
    isValid: false,
    msgReg: /invalid function name/i,
  },
];

const EXECUTE = [
  {
    expr: "ADD(10,20)",
    vars: {},
    ans: 30,
  },
  {
    expr: "MUL(40,$$var1$$)",
    vars: { var1: 5 },
    ans: 200,
  },
  {
    expr: "ADD(SUB($$var3$$,$$var2$$),DIV($$var1$$,$$var2$$))",
    vars: { var1: 10, var2: 5, var3: 20 },
    ans: 17,
  },
  { expr: "LTE($$var1$$,2050)", vars: { var1: 2020 }, ans: true },
  {
    expr: "AND(EQ($$var1$$,$$var2$$),LT($$var3$$,$$var4$$))",
    vars: { var1: "test", var2: "test", var3: 10, var4: 8 },
    ans: false,
  },
  {
    expr: "OR(NEQ($$var1$$,$$var2$$),GTE($$var3$$,$$var4$$))",
    vars: { var1: "test", var2: "test", var3: 10, var4: 8 },
    ans: true,
  },
  {
    expr: "UPPERCASE($$var1$$)",
    vars: { var1: "html" },
    ans: "HTML",
  },
  {
    expr: "CAMEL_TO_TITLE(testingWithJest)",
    vars: {},
    ans: "Testing With Jest",
  },
  {
    expr: "CONCAT(UPPERCASE($$first$$),LOWERCASE($$second$$))",
    vars: { first: "abc", second: "xyz" },
    ans: "ABCxyz",
  },
  {
    expr: "IF_ELSE(GT($$var1$$,$$var2$$),SUB($$var3$$,$$var2$$),CONCAT($$var2$$,$$var3$$))",
    vars: { var1: 10, var2: 15, var3: 20 },
    ans: "1520",
  },
  {
    expr: "TRUE()",
    vars: {},
    ans: true,
  },
  {
    expr: "NOT(TRUE())",
    vars: {},
    ans: false,
  },
  {
    expr: "AND(DATE_GT($$var1$$,$$var2$$),DATE_GTE($$var2$$,$$var3$$))",
    vars: {
      var1: dayjs().add(2, "day").format(),
      var2: dayjs().add(1, "day").format(),
      var3: dayjs().add(1, "day").format(),
    },
    ans: true,
  },
  {
    expr: "AND(DATE_LTE($$var1$$,NOW()),DATE_LT(ADD_IN_DATE(NOW(),-2,days),$$var1$$))",
    vars: {
      var1: dayjs().subtract(1, "day").format(),
    },
    ans: true,
  },
  {
    expr: "DATE_FORMAT(NOW(),MM/DD/YY HH:mm)",
    vars: {},
    ans: dayjs().tz(TIME_ZONE).format("MM/DD/YY HH:mm"),
  },
  {
    expr: "NOT_EMPTY($$var0$$)",
    vars: {},
    ans: false,
  },
  {
    expr: "EMPTY($$var0$$)",
    vars: {},
    ans: true,
  },
  {
    expr: "PUSH($$arr$$,$$data$$)",
    vars: {
      arr: [
        {
          a: 1,
        },
        {
          a: 2,
        },
      ],
      data: {
        a: 3,
      },
    },
    ans: [
      {
        a: 1,
      },
      {
        a: 2,
      },
      {
        a: 3,
      },
    ],
  },
  {
    expr: "PUSH($$arr$$,$$data$$)",
    vars: {
      arr: ["Test1", "Test2"],
      data: "Test3",
    },
    ans: ["Test1", "Test2", "Test3"],
  },
  {
    expr: "PUSH($$arr$$,$$data$$)",
    vars: {
      arr: [1, 2],
      data: 3,
    },
    ans: [1, 2, 3],
  },
  {
    expr: "PUSH($$arr$$,$$data$$)",
    vars: {
      data: 3,
    },
    ans: [3],
  },
];

it("expression validation text", () => {
  NEEDS_TO_VALIDATE.map(({ expr, isValid, msgReg }) => {
    let invalidMsg = "";
    const valid = validateFunction(expr, (msg) => (invalidMsg = msg), true);
    expect(valid).toBe(isValid);
    expect(invalidMsg).toMatch(msgReg);
  });
});

it("expression evaluate test", () => {
  EXECUTE.map(({ expr, vars, ans }) => {
    const isValid = validateFunction(expr);
    expect(isValid).toBe(true);
    const answer = expressionResolver(expr, vars);
    // using toStrictEqual to match complex types as array of objects
    expect(answer).toStrictEqual(ans);
  });
});
