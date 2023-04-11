const submitBtn = document.querySelector("button");
const propertiesEl = document.querySelector("#property-list");

fetch("http://localhost:3000/api/properties")
  .then((response) => response.json())
  .then((data) => {
    let formatCurrency = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD'
    });

    console.log(data);
    data.data.forEach((property) => {
      const { name, address, purchase_price, down_payment, loan_length, interest_rate, rental_income, expenses } = property
      // const cashFlow = calculateCashFlow()
      const propertyCard = document.createElement("div");
      propertyCard.classList.add(
        "text-white",
        "border-2",
        "px-2",
        "py-2",
        "my-1",
        "rounded-md",
        "flex",
        "justify-between",
        "border-neutral-700"
      );
      propertyCard.innerHTML = `
        <div>
          <h2 class="font-semibold">${name}</h2>
          <h3>${address}</h3>
          <p>${formatCurrency.format(purchase_price)}</p>
        </div>
        <div>
          <h3 class="font-semibold">Cash Flow</h3>
          <p>real cash flow</p>
        </div>
      `;
      propertiesEl.append(propertyCard);
    });
  });

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

  // add a copy straight to the DOM. I think its called optimistic loading or something like that.

  console.log(formDataObj);
});
