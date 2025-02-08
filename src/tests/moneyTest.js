import formatCurrency from "../scripts/utils/money.js";

let testCase = formatCurrency(2095);
let expectedValue = '20.95'
if (testCase === expectedValue) console.log(testCase, "passed");
else console.log(testCase, "failed");

testCase = formatCurrency(0);
expectedValue = '0.00'
if (testCase === expectedValue) console.log(testCase, "passed");
else console.log(testCase, "failed");

testCase = formatCurrency(2000.5);
expectedValue = '20.01'
if (testCase === expectedValue) console.log(testCase, "passed");
else console.log(testCase, "failed");


testCase = formatCurrency(2000.4);
expectedValue = '20.01'
if (testCase === expectedValue) console.log(testCase, "passed");
else console.log(testCase, "failed");