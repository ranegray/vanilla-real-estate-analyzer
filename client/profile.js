const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.cookie = "authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

  setTimeout(() => {
    document.location = "http://localhost:3000/signin.html";
  }, 1000);
});
