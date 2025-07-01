const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;

    if (value === "AC") {
      display.value = "";
    } else if (value === "=") {
      try {
        display.value = evaluateExpression(display.value);
      } catch {
        display.value = "Error";
      }
    } else if (["sin", "cos", "tan", "log", "√"].includes(value)) {
      if (value === "√") {
        display.value += "sqrt(";
      } else {
        display.value += value + "(";
      }
    } else {
      display.value += value;
    }
  });
});

function evaluateExpression(expr) {
  expr = expr
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/sqrt\(/g, "Math.sqrt(");

  return Function('"use strict"; return (' + expr + ')')();
}
