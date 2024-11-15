const dayjs = require("dayjs");
const { TIME_ZONE } = require("../enum");

export const EXPRESSION_TABLE = [
  {
    key: "arithmetic",
    data: {
      call: "Arithmetic Functions",
    },
    children: [
      {
        key: "ADD",
        data: {
          call: "ADD(Number1,Number2)",
          desc: "Summation of two input numbers",
          example: "ADD(3,2) => 5",
          noOfArgs: 2,
        },
      },
      {
        key: "SUB",
        data: {
          call: "SUB(Number1,Number2)",
          desc: "Subtraction of two input numbers",
          example: "SUB(3,2) => 1",
          noOfArgs: 2,
        },
      },
      {
        key: "MUL",
        data: {
          call: "MUL(Number1,Number2)",
          desc: "Multiplication of two input numbers",
          example: "MUL(3,2) => 6",
          noOfArgs: 2,
        },
      },
      {
        key: "DIV",
        data: {
          call: "DIV(Number1,Number2)",
          desc: "Division of two input numbers",
          example: "DIV(10,2) => 5",
          noOfArgs: 2,
        },
      },
    ],
  },
  {
    key: "relational",
    data: {
      call: "Relational Functions",
    },
    children: [
      {
        key: "EQ",
        data: {
          call: "EQ(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is equal to Input 2, else returns FALSE",
          example: "EQ(3,3) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "NEQ",
        data: {
          call: "NEQ(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is not equal to Input 2, else returns FALSE",
          example: "NEQ(3,3) => false",
          noOfArgs: 2,
        },
      },
      {
        key: "GT",
        data: {
          call: "GT(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is greater than Input 2, else returns FALSE",
          example: "GT(3,2) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "GTE",
        data: {
          call: "GTE(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is greater than or equal to Input 2, else returns FALSE",
          example: "GTE(3,2) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "LT",
        data: {
          call: "LT(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is less than Input 2, else returns FALSE",
          example: "LT(3,2) => false",
          noOfArgs: 2,
        },
      },
      {
        key: "LTE",
        data: {
          call: "LTE(Input1,Input2)",
          desc: "Returns TRUE if Input 1 is less than or equal to Input 2, else returns FALSE",
          example: "LTE(3,2) => false",
          noOfArgs: 2,
        },
      },
    ],
  },
  {
    key: "logical",
    data: {
      call: "Logical Functions",
    },
    children: [
      {
        key: "AND",
        data: {
          call: "AND(Condition1,Condition2)",
          desc: "Returns TRUE if Condition1 and Condition2 are TRUE, else returns FALSE",
          example: "AND(true,false) => false",
          noOfArgs: 2,
        },
      },
      {
        key: "OR",
        data: {
          call: "OR(Condition1,Condition2)",
          desc: "Returns TRUE if Condition1 or Condition2 is TRUE, else returns FALSE",
          example: "OR(true,false) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "NOT",
        data: {
          call: "NOT(Condition)",
          desc: "Returns the Opposite of provided Condition",
          example: "NOT(true) => false",
          noOfArgs: 1,
        },
      },
      {
        key: "TRUE",
        data: {
          call: "TRUE()",
          desc: "Returns TRUE always  (Has no inputs)",
          example: "TRUE() => true",
          noOfArgs: 0,
        },
      },
    ],
  },
  {
    key: "date",
    data: { call: "Date Functions" },
    children: [
      {
        key: "DATE_GT",
        data: {
          call: "DATE_GT(Date1,Date2)",
          desc: "Returns TRUE if Is Date1 greater than Date2, else returns FALSE",
          example: "DATE_GT(today,today) => false",
          noOfArgs: 2,
        },
      },
      {
        key: "DATE_GTE",
        data: {
          call: "DATE_GTE(Date1,Date2)",
          desc: "Returns TRUE if Is Date1 greater than or equal to Date2, else returns FALSE",
          example: "DATE_GTE(today,yesterday) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "DATE_LT",
        data: {
          call: "DATE_LT(Date1,Date2)",
          desc: "Returns TRUE if Is Date1 less than Date2, else returns FALSE",
          example: "DATE_LT(yesterday,yesterday) => false",
          noOfArgs: 2,
        },
      },
      {
        key: "DATE_LTE",
        data: {
          call: "DATE_LTE(Date1,Date2)",
          desc: "Returns TRUE if Is Date1 less than or equal to Date2, else returns FALSE",
          example: "DATE_LTE(yesterday,yesterday) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "ADD_IN_DATE",
        data: {
          call: "ADD_IN_DATE(InputDate,Number,UnitType)",
          desc: "Returns a Date that is the result of InputDate + Number of Units (you can use years, quarters, months, weeks, days, hours and minutes)",
          example: "ADD_IN_DATE(yesterday,1,days) => today",
          noOfArgs: 3,
        },
      },
      {
        key: "NOW",
        data: {
          call: "NOW()",
          desc: "Returns a Current Datetime",
          example: `NOW() => ${dayjs().tz(TIME_ZONE).format()}`,
          noOfArgs: 0,
        },
      },
      {
        key: "DATE_FORMAT",
        data: {
          call: "DATE_FORMAT(InputDate,Format)",
          desc: "Return Date in specified format",
          example: "DATE_FORMAT(02-12-2021,MM/DD/YYYY) => 02/12/2021",
          noOfArgs: 2,
        },
      },
    ],
  },
  {
    key: "condition",
    data: { call: "Condition Function" },
    children: [
      {
        key: "IF_ELSE",
        data: {
          call: "IF_ELSE(Condition1,True_Result,False_Result)",
          desc: "Returns True_Result if Condition1 is TRUE, else returns False_Result. Condition1 must result in a Boolean and True_Result and False_Result values can be boolean,numeric, or text",
          example: "IF_ELSE(true,4,3) => 4",
          noOfArgs: 3,
        },
      },
      {
        key: "NOT_EMPTY",
        data: {
          call: "NOT_EMPTY(variable)",
          desc: "Returns TRUE if variable is not null (not empty)",
          example: "NOT_EMPTY(varWithoutValue) => false",
          noOfArgs: 1,
        },
      },
      {
        key: "EMPTY",
        data: {
          call: "EMPTY(variable)",
          desc: "Returns TRUE if variable is null (empty)",
          example: "EMPTY(varWithoutValue) => true",
          noOfArgs: 1,
        },
      },
    ],
  },
  {
    key: "string",
    data: {
      call: "String Function",
    },
    children: [
      {
        key: "CONCAT",
        data: {
          call: "CONCAT(String1,String2)",
          desc: "Results in a string that is a combination of String1 and String2",
          example: "CONCAT(fname,lname) => fnamelname",
          noOfArgs: 2,
        },
      },
      {
        key: "UPPERCASE",
        data: {
          call: "UPPERCASE(String)",
          desc: "Results in a string that is all uppercase letters",
          example: "UPPERCASE(ticketNumber) => TICKETNUMBER",
          noOfArgs: 1,
        },
      },
      {
        key: "LOWERCASE",
        data: {
          call: "LOWERCASE(String)",
          desc: "Results in a string that is all lowercase letters",
          example: "LOWERCASE(ticketNumber) => ticketnumber",
          noOfArgs: 1,
        },
      },
      {
        key: "CONTAINS",
        data: {
          call: "CONTAINS(String1,String2)",
          desc: "Returns TRUE if String2 is present in String1, or else FALSE",
          example: "CONTAINS(ticket number,ticket) => true",
          noOfArgs: 2,
        },
      },
      {
        key: "CAMEL_TO_TITLE",
        data: {
          call: "CAMEL_TO_TITLE(String)",
          desc: "Results in a string that in Title Case",
          example: "CAMEL_TO_TITLE(ticketNumber) => Ticket Number",
          noOfArgs: 1,
        },
      },
    ],
  },
  {
    key: "push",
    data: {
      call: "PUSH",
      desc: "Add element in Array",
      example: "PUSH(array,3) => [(all element array),3]",
      noOfArgs: 2,
    },
  },
  {
    key: "special",
    data: {
      call: "Special Function",
    },
    children: [
      {
        key: "sum",
        data: {
          call: "SUM",
          desc: "Sum of Elements separated by ':' or Sum of property from Array by '::'",
          example: "SUM($$array$$::propertyName)",
          noOfArgs: 1,
        },
      },
    ],
  },
];

// const Documentation = () => (
//   <table className="expression-table">
//     <thead>
//       <th style={{ width: "20%" }}>Function</th>
//       <th style={{ width: "40%" }}>Description</th>
//       <th style={{ width: "20%" }}>Example</th>
//       <th style={{ width: "8%" }}>No of Arguments</th>
//     </thead>
//     <tbody>
//       {EXPRESSION_TABLE.map(({ key, data, children }) => (
//         <React.Fragment key={key}>
//           <tr key={key}>
//             <th style={{ textAlign: "left", paddingLeft: "50px" }} colSpan={4}>
//               {data.call}
//             </th>
//           </tr>
//           {children.map(({ key, data }) => (
//             <tr key={key}>
//               <td>{data.call}</td>
//               <td>{data.desc}</td>
//               <td>{data.example}</td>
//               <td>{data.noOfArgs}</td>
//             </tr>
//           ))}
//         </React.Fragment>
//       ))}
//     </tbody>
//   </table>
// );

// export default Documentation;
