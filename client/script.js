const submitBtn = document.querySelector("button");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const form = e.target.form;
  const formData = new FormData(form);

  const formDataObj = {};
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

//   fetch("/api/properties", {
//     method: "post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formDataObj)
//   });

  console.log(formDataObj);
});
