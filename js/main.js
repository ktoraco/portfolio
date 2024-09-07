document.addEventListener("DOMContentLoaded", function () {
  const heroimgs = ["../images/heroImg/1.jpg", "../images/heroImg/2.jpg", "../images/heroImg/3.jpg", "../images/heroImg/4.jpg", "../images/heroImg/5.jpg", "../images/heroImg/6.jpg"];

  const randomImage = heroimgs[Math.floor(Math.random() * heroimgs.length)];
  const heroImgElement = document.querySelector(".heroImg");

  if (heroImgElement) {
    heroImgElement.style.backgroundImage = `url(${randomImage})`;
    heroImgElement.style.backgroundSize = "cover";
    heroImgElement.style.backgroundPosition = "center";
    heroImgElement.style.height = "240px";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("./header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    });
});
