const signinBtn = document.querySelector("#signin-form-button");
const signinText = document.querySelector("#login-text");
const loading = document.querySelector("#loader");

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const form = e.target.form;
  const formData = new FormData(form);
    console.log(form)
  const formDataObj = {};
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  signinText.classList.toggle("hidden");
  loading.classList.toggle("hidden");

  console.log(JSON.stringify(formDataObj));
  fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataObj),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Login successful") {
        window.location = "http://localhost:3000/dashboard.html";
      }
    });
});
