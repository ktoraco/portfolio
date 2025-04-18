document.addEventListener("DOMContentLoaded", function () {
  // グローバルにisMenuOpenを定義
  let isMenuOpen = false;

  // ページの場所に基づいてヘッダーのパスを決定
  const headerPath = window.location.pathname.includes('/src/') ? 
                     "/src/header.html" : 
                     "/header.html";

  // header.htmlの読み込み
  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      }

      // ダークモードの状態をlocalStorageから取得
      const isDarkMode = localStorage.getItem("dark-mode") === "true";

      // ページ読み込み時にダークモードを適用
      if (isDarkMode) {
        document.body.classList.add("dark-mode");
        const header = document.getElementById("header-placeholder");
        const headerToggle = document.querySelector(".hamburger-menu");
        const footer = document.getElementById("footer-placeholder");
        const container = document.querySelector(".container");
        const headText = document.querySelector(".head-text");
        const skills = document.querySelectorAll(".skills li");
        const workTag = document.querySelector(".work-tag");
        const menu = document.getElementById("menu");

        header?.classList.add("dark-mode");
        footer?.classList.add("dark-mode");
        container?.classList.add("dark-mode");
        headerToggle?.classList.add("dark-mode");
        workTag?.classList.add("dark-mode");
        menu?.classList.toggle("dark-mode");

        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
          const themeImage = themeToggle.querySelector("img");
          if (themeImage) {
            // 相対パスで画像を指定
            const themeLightPath = window.location.pathname.includes('/src/') ? 
                                   "../images/header/theme-light.svg" : 
                                   "images/header/theme-light.svg";
            themeImage.src = themeLightPath;
          }
        }

        if (headText) {
          headText.classList.toggle("dark-mode");
        }

        // 各li要素にdark-modeクラスを適用
        skills.forEach((skill) => {
          skill.classList.toggle("dark-mode");
        });
      }

      // メニューのトグル機能を追加
      const menuToggle = document.getElementById("menu-toggle");
      const menu = document.getElementById("menu");

      if (menuToggle) {
        menuToggle.addEventListener("click", function (event) {
          event.stopPropagation();
          menu.classList.toggle("show");
          isMenuOpen = !isMenuOpen;
        });
      }

      // ドキュメント全体にクリックイベントを追加してメニュー外クリック時に閉じる
      document.addEventListener("click", function (event) {
        if (isMenuOpen && !menu.contains(event.target) && event.target !== menuToggle) {
          menu.classList.remove("show");
          isMenuOpen = false;
        }
      });

      // ダークモードの切り替え
      const themeToggle = document.getElementById("theme-toggle");
      themeToggle?.addEventListener("click", function () {
        const isDarkModeNow = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", isDarkModeNow); // 状態をlocalStorageに保存

        // 画像の切り替え - 相対パスに修正
        const themeImage = themeToggle.querySelector("img");
        
        // ページの場所に応じてパスを動的に決定
        const themeLightPath = window.location.pathname.includes('/src/') ? 
                               "../images/header/theme-light.svg" : 
                               "images/header/theme-light.svg";
        const themeDarkPath = window.location.pathname.includes('/src/') ? 
                              "../images/header/theme-dark.svg" : 
                              "images/header/theme-dark.svg";
        
        themeImage.src = isDarkModeNow ? themeLightPath : themeDarkPath;

        const header = document.getElementById("header-placeholder");
        const headerToggle = document.querySelector(".hamburger-menu");
        const footer = document.getElementById("footer-placeholder");
        const container = document.querySelector(".container");
        const headText = document.querySelector(".head-text");
        const skills = document.querySelectorAll(".skills li");
        const workTag = document.querySelector(".work-tag");
        const menu = document.getElementById("menu");

        header.classList.toggle("dark-mode", isDarkModeNow);
        footer.classList.toggle("dark-mode", isDarkModeNow);
        container.classList.toggle("dark-mode", isDarkModeNow);
        headerToggle.classList.toggle("dark-mode", isDarkModeNow);
        workTag?.classList.toggle("dark-mode", isDarkModeNow);
        menu.classList.toggle("dark-mode", isDarkModeNow);

        if (headText) {
          headText.classList.toggle("dark-mode", isDarkModeNow);
        }

        // 各li要素にdark-modeクラスを適用
        skills.forEach((skill) => {
          skill.classList.toggle("dark-mode", isDarkModeNow);
        });
      });
    });

  // ページの場所に基づいてフッターのパスを決定
  const footerPath = window.location.pathname.includes('/src/') ? 
                     "/src/footer.html" : 
                     "/footer.html";

  // footer.htmlの読み込み
  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      }
    });

  // iframe内クリックイベントを検知
  window.addEventListener("message", function (event) {
    if (event.data === "iframeClicked") {
      const menu = document.getElementById("menu");
      if (isMenuOpen && menu) {
        menu.classList.remove("show"); // メニューを閉じる
        isMenuOpen = false;
      }
    }
  });
});
