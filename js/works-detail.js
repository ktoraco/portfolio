/**
 * Works Detail ページ用の共通スクリプト
 * テーマ切り替えやパス修正など、works-detailsディレクトリ内のすべてのページで
 * 共通して使用する機能を提供します
 */

document.addEventListener("DOMContentLoaded", function () {
  // ヘッダーが読み込まれた後に実行
  setTimeout(() => {
    // ヘッダー内の画像パスを修正
    const headerImg = document.querySelector(".header-left img");
    if (headerImg) {
      headerImg.src = "../../images/header/Kichita Design_text.svg";
    }

    // テーマトグルアイコンのパス修正
    const themeToggleImg = document.querySelector("#theme-toggle img");
    if (themeToggleImg) {
      // ダークモードの状態に応じて適切な画像を設定
      const isDarkMode = localStorage.getItem("dark-mode") === "true";
      themeToggleImg.src = isDarkMode ? "../../images/header/theme-light.svg" : "../../images/header/theme-dark.svg";
    }

    // テーマトグルボタンのクリックイベントを上書き
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      // 既存のイベントリスナーを削除して新しいものを追加
      themeToggle.replaceWith(themeToggle.cloneNode(true));

      // 新しいテーマトグル要素を取得
      const newThemeToggle = document.getElementById("theme-toggle");

      // 新しいクリックイベントリスナーを追加
      newThemeToggle.addEventListener("click", function () {
        const isDarkModeNow = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", isDarkModeNow);

        // works-detailページ専用のパス設定
        const themeImage = newThemeToggle.querySelector("img");
        themeImage.src = isDarkModeNow ? "../../images/header/theme-light.svg" : "../../images/header/theme-dark.svg";

        // 残りの要素にダークモードを適用
        const header = document.getElementById("header-placeholder");
        const headerToggle = document.querySelector(".hamburger-menu");
        const footer = document.getElementById("footer-placeholder");
        const container = document.querySelector(".container");
        const headText = document.querySelector(".head-text");
        const skills = document.querySelectorAll(".skills li");
        const workTag = document.querySelector(".work-tag");
        const menu = document.getElementById("menu");

        if (header) header.classList.toggle("dark-mode", isDarkModeNow);
        if (footer) footer.classList.toggle("dark-mode", isDarkModeNow);
        if (container) container.classList.toggle("dark-mode", isDarkModeNow);
        if (headerToggle) headerToggle.classList.toggle("dark-mode", isDarkModeNow);
        if (workTag) workTag.classList.toggle("dark-mode", isDarkModeNow);
        if (menu) menu.classList.toggle("dark-mode", isDarkModeNow);
        if (headText) headText.classList.toggle("dark-mode", isDarkModeNow);

        // スワイパーナビゲーションの色も調整（works-detail_1.htmlのSwiper用）
        const swiperButtons = document.querySelectorAll(".swiper-button-next, .swiper-button-prev");
        const swiperPagination = document.querySelectorAll(".swiper-pagination-bullet");

        swiperButtons.forEach((button) => {
          button.style.color = isDarkModeNow ? "#dddddd" : "#525252";
        });

        swiperPagination.forEach((bullet) => {
          bullet.style.backgroundColor = isDarkModeNow ? "#dddddd" : "#525252";
        });

        // 各li要素にdark-modeクラスを適用
        skills.forEach((skill) => {
          if (skill) skill.classList.toggle("dark-mode", isDarkModeNow);
        });
      });
    }
  }, 100);

  // works-detail_1.html用のSwiper初期化（他のページではこの部分は無視されます）
  if (document.querySelector(".swiper")) {
    initSwiper();
  }
});

/**
 * works-detail_1.html用のSwiper初期化
 */
function initSwiper() {
  // スワイパーの初期化
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    // レスポンシブ設定
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });

  // モーダル表示の処理
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const swiperImages = document.querySelectorAll(".swiper-img");
  const closeModal = document.querySelector(".close-modal");

  // 各スライド画像にクリックイベントを追加
  swiperImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  // モーダル閉じるボタン
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // モーダル外クリックで閉じる
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ESCキーでモーダルを閉じる
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });
}
