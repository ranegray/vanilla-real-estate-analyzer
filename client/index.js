const submitBtn = document.querySelector("#property-form-button");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const form = e.target.form;
  const formData = new FormData(form);

  const formDataObj = {};
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  fetch("http://localhost:3000/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataObj),
    redirect: "follow",
  }).then((response) => {
    window.location = "http://localhost:3000/dashboard.html";
    response.json();
  });

  // TODO: add a copy straight to the DOM. I think its called optimistic loading or something like that.

  console.log(formDataObj);
});
