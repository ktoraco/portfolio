const password = prompt("Password:");
if (password !== "yorudoraKatsuo") {
  alert("Access denied!");
  window.location.href = "about:blank";
}
