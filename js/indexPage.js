// indexHtml星の明滅のコード
window.addEventListener("DOMContentLoaded", () => {
  // 星を表示するための親要素を取得
  const stars = document.querySelector(".stars");

  // 星を生成する関数
  const createStar = () => {
    const starEl = document.createElement("span");
    starEl.className = "star";
    const minSize = 1; // 星の最小サイズを指定
    const maxSize = 2; // 星の最大サイズを指定
    const size = Math.random() * (maxSize - minSize) + minSize;
    starEl.style.width = `${size}px`;
    starEl.style.height = `${size}px`;
    starEl.style.left = `${Math.random() * 100}%`;
    starEl.style.top = `${Math.random() * 100}%`;
    starEl.style.animationDelay = `${Math.random() * 10}s`;
    stars.appendChild(starEl);
  };

  // 画面サイズに応じて星の数を調整
  const screenWidth = window.innerWidth;
  let starCount;

  if (screenWidth >= 768) {
    // PCサイズ
    starCount = 500;
  } else {
    // スマホサイズ
    starCount = Math.floor(500 / 3);
  }

  // for文で星を生成する関数を指定した回数呼び出す
  for (let i = 0; i < starCount; i++) {
    createStar();
  }
});

//空の制御のコード
document.addEventListener("DOMContentLoaded", function () {
  const element = document.getElementById("sky");
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  function skyChange() {
    if ((hours >= 4 && hours < 7) || (hours === 7 && minutes === 0)) {
      element.classList.add("bgSkySunset");
    } else if ((hours > 7 && hours < 16) || (hours === 16 && minutes <= 30)) {
      element.classList.add("bgSkyEvening");
    } else if ((hours === 16 && minutes > 30) || (hours > 16 && hours < 19) || (hours === 19 && minutes === 0)) {
      element.classList.add("bgSkySunset");
    } else {
      element.classList.add("bgSkyNight", "stars");
    }
  }

  skyChange();
});

//飛行機に関するコード
document.addEventListener("DOMContentLoaded", function () {
  const airplaneImgSrc = "../images/startup/airPlane1.png";
  const maxAirplanes = 3; // 同時に存在する最大の飛行機の数
  let currentAirplanes = 0;

  function createAirplane() {
    if (currentAirplanes >= maxAirplanes) return; // 最大数に達している場合は何もしない

    const airplane = document.createElement("img");
    airplane.src = airplaneImgSrc;
    airplane.className = "airplane";
    document.body.appendChild(airplane);
    currentAirplanes++; // 飛行機を追加

    const startPosition = Math.random() < 0.5 ? "left" : "right";
    const startOffset = Math.random() * 300; // 上端から300px以内

    // 向きの調整
    if (startPosition === "right") {
      airplane.style.transform = "rotate(180deg)"; // 右からの場合は180°回転
      airplane.style.left = "-24px";
      airplane.style.top = `${startOffset}px`;
      airplane.style.transition = `left 15s linear`;
      setTimeout(() => {
        airplane.style.left = `${window.innerWidth + 24}px`;
      }, 0);
    } else {
      airplane.style.transform = "none"; // 左からの場合は回転なし
      airplane.style.right = "-24px";
      airplane.style.top = `${startOffset}px`;
      airplane.style.zIndex = "5"; // 飛行機の z-index を設定
      airplane.style.transition = `right 15s linear`;
      setTimeout(() => {
        airplane.style.right = `${window.innerWidth + 24}px`;
      }, 0);
    }

    airplane.addEventListener("transitionend", () => {
      const skyElement = document.getElementById("sky");
      const skyRect = skyElement.getBoundingClientRect();
      const airplaneRect = airplane.getBoundingClientRect();

      // 飛行機がskyの領域を超えた場合
      if (airplaneRect.right < skyRect.left || airplaneRect.left > skyRect.right) {
        setTimeout(() => {
          airplane.remove();
          currentAirplanes--; // 飛行機が削除されたらカウントを減らす
        }, 10); // 0.01秒後に削除
      }
    });
  }

  // 最初の飛行機を即座に生成
  createAirplane();
  setInterval(() => {
    createAirplane();
  }, 8000); // 8秒ごとに飛行機を生成
});
