let href = "";
let screenWidth;
let msg = document.querySelector(".msg");
let nav = document.querySelector("nav");
let black = document.querySelector(".black");
let body = document.querySelector("body");
// let dropdownSwitchP = document.querySelector(".dropdown-switch p");
let pageHeader = document.querySelector(".pageHeader");
let aside = document.querySelector("aside");

// nav展開 有sub
let navWithSub = document.querySelectorAll("nav span");
navWithSub.forEach((element) => {
  const child = element.nextElementSibling.childNodes;
  child.forEach((c) => {
    if (c.nodeName !== "#text") {
      c.addEventListener("click", function () {
        if (c.hasAttribute("data-href")) {
          window.open(c.dataset.href, "_self");
        }
      });
    }
  });
  element.addEventListener("click", function () {
    if (this.classList.length) {
      this.classList.remove("active");
      this.nextElementSibling.classList.add("d-none");
    } else {
      this.classList.add("active");
      this.nextElementSibling.classList.remove("d-none");
    }
  });
});

// nav展開 沒有sub
let navWithoutSub = document.querySelectorAll("nav .withoutSub");
navWithoutSub.forEach((element) => {
  element.addEventListener("click", function () {
    if (this.hasAttribute("data-href")) {
      window.open(this.dataset.href, "_self");
    }
  });
});

//換頻道選單
// let dropdownSwitch = document.querySelector(".dropdown-switch");
// dropdownSwitch.addEventListener("click", function () {
//   if (this.getAttribute("class").includes("active")) {
//     this.classList.remove("active");
//     this.nextElementSibling.classList.remove("active");
//   } else {
//     this.classList.add("active");
//     this.nextElementSibling.classList.add("active");
//   }
// });

// 每一頁 copy link
let copyLink = document.querySelectorAll(".copyLink"); //可以加上"，"變成共用複製
copyLink.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.dataset.href !== undefined) {
      location.href.indexOf("#") !== -1
        ? (href = location.href.split("#")[0])
        : (href = location.href);
      var input = document.body.appendChild(document.createElement("input"));
      input.value = `${href}${element.dataset.href}`;
      input.focus();
      input.select();
      try {
        message("連結已複製"); //可以改變文案
        return document.execCommand("copy");
      } catch (e) {
        console.warn("Copy to clipboard failed.", e);
        return false;
      } finally {
        input.parentNode.removeChild(input);
      }
    }
  });
});

// 色彩頁 copy color
let copyColor = document.querySelectorAll(".copyColor"); //可以加上"，"變成共用複製
copyColor.forEach((element) => {
  element.addEventListener("click", function () {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = element.innerHTML;
    input.focus();
    input.select();
    try {
      message("色碼已複製"); //可以改變文案
      return document.execCommand("copy");
    } catch (e) {
      console.warn("Copy to clipboard failed.", e);
      return false;
    } finally {
      input.parentNode.removeChild(input);
    }
  });
});

function message(content) {
  setTimeout(function () {
    msg.innerHTML = `<p>${content}</ｐ>`;
    msg.classList.add("active");
  }, 100);
  setTimeout(function () {
    msg.classList.remove("active");
  }, 3000);
}

function cardSetMarginBottom() {
  // ＊＊＊ special 特殊情形使用，偵測電腦版的卡片 ＊＊＊
  //兩個的類型如果卡片數量大於2，則需要設置margin-bottom:40px
  //三個的類型如果卡片數量大3，則需要設置margin-bottom:40px
  let type1 = document.querySelectorAll(".card-group--2");
  for (let t1 = 0; t1 < type1.length; t1++) {
    // console.log(type1[t1].children)
    if (type1[t1].children.length > 2) {
      let u = type1[t1].children.length % 2;
      // console.log(u)
      if (u == 0) {
        u = 2;
      }
      for (let c = 0; c < type1[t1].children.length - u; c++) {
        type1[t1].children[c].style.marginBottom = "40px";
      }
    }
  }
  let type2 = document.querySelectorAll(".card-group--3");
  for (let t2 = 0; t2 < type2.length; t2++) {
    if (type2[t2].children.length > 3) {
      let u = type2[t2].children.length % 3;
      if (u == 0) {
        u = 3;
      }
      for (let c = 0; c < type2[t2].children.length - u; c++) {
        type2[t2].children[c].style.marginBottom = "40px";
      }
    }
  }
}

function init() {
  screenWidth = window.innerWidth;
  if (screenWidth > 768) {
    aside.style.marginTop = `${pageHeader.clientHeight}px`;
    black.style.width = "0%";
    body.style.overflow = "auto";
    nav.style.left = "-100%";
    // dropdownSwitchP.innerHTML = "其他子頻道設計系統";
    // ＊＊＊ special 特殊情形使用，偵測電腦版的卡片 ＊＊＊
    //兩個的類型如果卡片數量大於2，則需要設置margin-bottom:40px
    //三個的類型如果卡片數量大3，則需要設置margin-bottom:40px
    cardSetMarginBottom();
  } else {
    // dropdownSwitchP.innerHTML = "其他頻道";
  }
  // aside 出現
  if (window.innerWidth > 1000) {
    setTimeout(() => {
      document.querySelector("aside").style.opacity = "1";
    }, 500);
  }
  document.querySelector(".copyright-year").innerHTML =
    new Date().getFullYear();
}

function imgResize() {
  screenWidth = window.innerWidth;
  let img = document.querySelectorAll("img");
  for (let i = 0; i < img.length; i++) {
    if (screenWidth > 768) {
      if (img[i].hasAttribute("data-pc")) {
        img[i].setAttribute("src", `${img[i].getAttribute("data-pc")}`);
      }
    } else {
      if (img[i].hasAttribute("data-mb")) {
        img[i].setAttribute("src", `${img[i].getAttribute("data-mb")}`);
      }
    }
    // ＊＊＊ special 特殊情形使用，mb版圖片若有最小值width，須在圖片上加上data-minWidth屬性 ＊＊＊
    if (screenWidth < 500) {
      if (img[i].hasAttribute("data-minWidth")) {
        img[i].style.minWidth = `${img[i].getAttribute("data-minWidth")}px`;
        img[i].style.maxWidth = "initial";
      }
    } else {
      if (img[i].hasAttribute("data-minWidth")) {
        img[i].style.minWidth = `initial`;
        img[i].style.maxWidth = "100%";
      }
    }
  }
}

document.querySelector(".hamburger").addEventListener("click", function () {
  nav.style.left = "0";
  black.style.width = "100%";
  body.style.overflow = "hidden";
});

document.querySelector(".black").addEventListener("click", function () {
  nav.style.left = "-100%";
  black.style.width = "0%";
  body.style.overflow = "auto";
});

document.querySelector(".close").addEventListener("click", function () {
  nav.style.left = "-100%";
  black.style.width = "0%";
  body.style.overflow = "auto";
});

window.addEventListener("DOMContentLoaded", () => {
  let options = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      let id = entry.target.getAttribute("id");
      id = id.replace("section-", "");
      if (entry.intersectionRatio > 0) {
        document
          .querySelector(`aside li a[href="#${id}"]`)
          .parentElement.classList.add("active");
        history.pushState(null, null, `#${id}`);
      } else {
        document
          .querySelector(`aside li a[href="#${id}"]`)
          .parentElement.classList.remove("active");
      }
      // 滑動 < 50 強制亮第一個
      if (document.documentElement.scrollTop < 50) {
        document
          .querySelector(`aside li:nth-child(1) a`)
          .parentElement.classList.add("active");
      }
    });
  }, options);
  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });
});

window.onresize = (event) => {
  init();
  imgResize();
};

window.onload = (event) => {
  init();
  imgResize();
};
