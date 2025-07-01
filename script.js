let memory = 0; // 🧠 Memory storage

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

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;

    switch (value) {
      case "AC":
        display.value = "";
        break;
      case "=":
        try {
          display.value = evaluateExpression(display.value);
        } catch {
          display.value = "Error";
        }
        break;
      case "√":
        display.value += "sqrt(";
        break;
      case "sin":
      case "cos":
      case "tan":
      case "log":
        display.value += value + "(";
        break;
      case "MC":
        memory = 0;
        break;
      case "MR":
        display.value += memory;
        break;
      case "M+":
        try {
          memory += parseFloat(evaluateExpression(display.value));
        } catch {}
        break;
      case "M-":
        try {
          memory -= parseFloat(evaluateExpression(display.value));
        } catch {}
        break;
      default:
        display.value += value;
    }
  });
});
