const registerBtn = document.querySelector("#register-form-button");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const form = e.target.form;
  const formData = new FormData(form);

  const formDataObj = {};
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
