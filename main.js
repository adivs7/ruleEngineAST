const apiUrl = "http://localhost:3000";

async function createRule() {
  const ruleInput = document.getElementById("rule-input").value;

  try {
    const response = await fetch(`${apiUrl}/create_rule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rule_string: ruleInput }),
    });

    const data = await response.json();
    document.getElementById("create-rule-result").innerText = JSON.stringify(
      data.ast,
      null,
      2
    );
  } catch (error) {
    document.getElementById(
      "create-rule-result"
    ).innerText = `Error: ${error.message}`;
  }
}

async function combineRules() {
  const rulesInput = document
    .getElementById("combine-rules-input")
    .value.split(";")
    .map((rule) => rule.trim());

  try {
    const response = await fetch(`${apiUrl}/combine_rules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rules: rulesInput }),
    });

    const data = await response.json();
    document.getElementById("combine-rule-result").innerText = JSON.stringify(
      data.ast,
      null,
      2
    );
  } catch (error) {
    document.getElementById(
      "combine-rule-result"
    ).innerText = `Error: ${error.message}`;
  }
}

async function evaluateRule() {
  const astInput = document.getElementById("evaluate-rule-ast").value;
  const dataInput = JSON.parse(
    document.getElementById("evaluate-rule-data").value
  );

  try {
    const response = await fetch(`${apiUrl}/evaluate_rule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ast: JSON.parse(astInput), data: dataInput }),
    });

    const data = await response.json();
    document.getElementById(
      "evaluate-rule-result"
    ).innerText = `Result: ${data.result}`;
  } catch (error) {
    document.getElementById(
      "evaluate-rule-result"
    ).innerText = `Error: ${error.message}`;
  }
}
