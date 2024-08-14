const Node = require("./ast");

// Parse a rule string and return the corresponding AST
function createRule(ruleString) {
  // Example parsing logic: convert string to AST
  // This is simplified; a more robust parser is needed for complex rules
  // Here, we're assuming that rules are well-formed and simplified
  const tokens = ruleString.match(
    /(\w+\s*=\s*'\w+'|\w+\s*[><=]\s*\d+|\(|\)|AND|OR)/g
  );
  const stack = [];

  tokens.forEach((token) => {
    if (token === "AND" || token === "OR") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(new Node("operator", token, left, right));
    } else if (token === "(" || token === ")") {
      // Handle parenthesis for precedence (left as exercise)
    } else {
      stack.push(new Node("operand", token));
    }
  });

  return stack[0]; // root node of the AST
}

// Combine multiple ASTs into one
function combineRules(rules) {
  if (rules.length === 1) return rules[0];

  let combined = rules[0];
  for (let i = 1; i < rules.length; i++) {
    combined = new Node("operator", "AND", combined, rules[i]);
  }

  return combined;
}

// Evaluate the AST against provided user data
function evaluateRule(ast, data) {
  if (ast.type === "operand") {
    const [field, operator, value] = ast.value.split(/(=|>|<)/);
    switch (operator.trim()) {
      case "=":
        return data[field.trim()] === value.trim().replace(/'/g, "");
      case ">":
        return data[field.trim()] > parseInt(value.trim(), 10);
      case "<":
        return data[field.trim()] < parseInt(value.trim(), 10);
    }
  } else if (ast.type === "operator") {
    const leftEval = evaluateRule(ast.left, data);
    const rightEval = evaluateRule(ast.right, data);

    if (ast.value === "AND") return leftEval && rightEval;
    if (ast.value === "OR") return leftEval || rightEval;
  }
  return false;
}

module.exports = { createRule, combineRules, evaluateRule };
