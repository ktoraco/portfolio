document.addEventListener("DOMContentLoaded", function () {
  // const heroimgs = ["../images/heroImg/1.jpg", "../images/heroImg/2.jpg", "../images/heroImg/3.jpg", "../images/heroImg/4.jpg", "../images/heroImg/5.jpg", "../images/heroImg/6.jpg"];

  // const randomImage = heroimgs[Math.floor(Math.random() * heroimgs.length)];
  // const heroImgElement = document.querySelector(".heroImg");

  // if (heroImgElement) {
  //   heroImgElement.style.backgroundImage = `url(${randomImage})`;
  //   heroImgElement.style.backgroundSize = "cover";
  //   heroImgElement.style.backgroundPosition = "center";
  //   heroImgElement.style.height = "240px";
  // }

  // header.htmlの読み込み
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // メニューのトグル機能を追加
      const menuToggle = document.getElementById("menu-toggle");
      const menu = document.getElementById("menu");
      let isMenuOpen = false; // メニューの状態を管理するフラグ

      if (menuToggle) {
        menuToggle.addEventListener("click", function (event) {
          event.stopPropagation(); // クリックイベントのバブリングを防ぐ
          menu.classList.toggle("show");
          isMenuOpen = !isMenuOpen; // メニューの状態を切り替え
        });
      }

      // ドキュメント全体にクリックイベントを追加
      document.addEventListener("click", function (event) {
        if (isMenuOpen && !menu.contains(event.target) && event.target !== menuToggle) {
          menu.classList.remove("show"); // メニューを閉じる
          isMenuOpen = false; // メニューの状態を更新
        }
      });
    });

  // footer.htmlの読み込み
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // 3秒経つとPlease touch meの文字が現れる
  const targetMessage = document.querySelector(".touchMessage");
  setTimeout(() => {
    targetMessage.style.opacity = "1";
    targetMessage.classList.add("blink");
  }, 3000);

  document.addEventListener("DOMContentLoaded", function () {
    // 既存のコード...

    // iframeがクリックされたときのイベントリスナーを追加
    window.addEventListener("iframeClicked", function () {
      const menu = document.getElementById("menu");
      if (menu.classList.contains("show")) {
        menu.classList.remove("show"); // メニューを閉じる
      }
    });
  });
});
