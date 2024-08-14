const { expect } = require("chai");
const { createRule, combineRules, evaluateRule } = require("../src/rules");

describe("Rule Engine Tests", () => {
  it("should create individual rules", () => {
    const rule1 = "age > 30 AND department = 'Sales'";
    const ast1 = createRule(rule1);
    expect(ast1.type).to.equal("operator");
    expect(ast1.left.value).to.equal("age > 30");
    expect(ast1.right.value).to.equal("department = 'Sales'");
  });

  it("should combine rules", () => {
    const rule1 = "age > 30 AND department = 'Sales'";
    const rule2 = "salary > 50000 OR experience > 5";
    const combinedAST = combineRules([createRule(rule1), createRule(rule2)]);
    expect(combinedAST.type).to.equal("operator");
  });

  it("should evaluate rule correctly", () => {
    const rule1 = "age > 30 AND department = 'Sales'";
    const ast = createRule(rule1);
    const data = { age: 35, department: "Sales", salary: 60000, experience: 3 };
    const result = evaluateRule(ast, data);
    expect(result).to.be.true;
  });
});
