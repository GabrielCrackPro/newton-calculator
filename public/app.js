const calculatorForm = document.querySelector("#calculator-form");

const resultContainer = document.querySelector(".result-container");
const resultExpression = document.querySelector("#result-expression");
const resultOperation = document.querySelector("#result-operation");
const result = document.querySelector("#result");

const alert = document.querySelector(".alert");

const baseUrl = "https://newton.now.sh/api/v2/"; // operation/expression

resultContainer.style.display = "none";

const hideAlert = () => {
  alert.classList.add("d-none");
};

calculatorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(calculatorForm);
  const expression = formData.get("expression");
  const operation = formData.get("operation");
  if (!expression || !operation) {
    alert.style.animation = "show 0.5s";
    alert.textContent = "Please enter an expression and operation";
    alert.classList.add("alert-danger");
    alert.classList.remove("d-none");
    setTimeout(hideAlert, 2000);
    calculatorForm.reset();
    return;
  } else {
    const url = `${baseUrl}${operation}/${expression}`;
    let response = await fetch(url).then((response) => {
      return response.json();
    });
    if (response.result) {
      result.classList.add("bg-success");
    }
    resultExpression.innerHTML += " " + expression;
    resultOperation.innerHTML += " " + operation;
    result.innerHTML += " " + response.result;
    navigator.clipboard.writeText(response.result);
    alert.classList.add("alert-success");
    resultContainer.style.display = "block";
    resultContainer.style.animation = "show 0.5s";
    alert.style.animation = "show 0.5s";
    alert.textContent = "Result copied to clipboard";
    alert.classList.remove("d-none");
    setTimeout(hideAlert, 2000);
  }
  calculatorForm.reset();
});
