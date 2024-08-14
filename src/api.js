const express = require("express");
const bodyParser = require("body-parser");
const { createRule, combineRules, evaluateRule } = require("./rules");

const app = express();
app.use(bodyParser.json());

app.post("/create_rule", (req, res) => {
  const { rule_string } = req.body;
  const ast = createRule(rule_string);
  res.json({ ast });
});

app.post("/combine_rules", (req, res) => {
  const { rules } = req.body;
  const astList = rules.map((ruleString) => createRule(ruleString));
  const combinedAST = combineRules(astList);
  res.json({ ast: combinedAST });
});

app.post("/evaluate_rule", (req, res) => {
  const { ast, data } = req.body;
  const result = evaluateRule(ast, data);
  res.json({ result });
});

module.exports = app;
