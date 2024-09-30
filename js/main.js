document.addEventListener("DOMContentLoaded", function () {
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
          menu.classList.add("hide"); // メニューを閉じる
          setTimeout(() => {
            menu.classList.remove("show", "hide"); // アニメーション後にクラスを削除
            menu.style.display = "none"; // メニューを非表示にする
          }, 300); // アニメーションの時間に合わせて調整
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
  }, 5000); // 表示までの時間を5秒に変更

  document.addEventListener("DOMContentLoaded", function () {
    // iframeがクリックされたときのイベントリスナーを追加
    window.addEventListener("iframeClicked", function () {
      const menu = document.getElementById("menu");
      if (menu.classList.contains("show")) {
        menu.classList.remove("show"); // メニューを閉じる
      }
    });
  });
});
