// ローディングクルクル
const loader = document.getElementById('js-loader');
window.addEventListener('load', () => {
  // コンテンツ読み込み完了後の処理
  const ms = 400;
  loader.style.transition = 'opacity ' + ms + 'ms';
  
  setTimeout(function(){loader.style.opacity = 0;}, 1);
  setTimeout(function(){loader.style.display = "none";}, ms);
});

document.addEventListener("DOMContentLoaded",() => {
  // DOM利用可能になった場合の処理
  var title = document.querySelectorAll('.js-accordion-title');

  // アコーディオン
  for (let i = 0; i < title.length; i ++){
    let titleEach = title[i];
    let content = titleEach.nextElementSibling;
    titleEach.addEventListener('click', () => {
      titleEach.classList.toggle('is-active');
      content.classList.toggle('is-open');
    });
  }

  // スクロールで出現
  const pageTopBtn = document.getElementById('js-scroll-top');
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset;
    if ( y > 100){
      setTimeout(function(){
        pageTopBtn.style.opacity = 1;
      }, 100);
    } else {
      setTimeout(function(){
        pageTopBtn.style.opacity = 0;
      }, 100);
    }
  });

  // スクロールトップボタン
  scrollTop('js-scroll-top', 150);

  function scrollTop(elem,duration) {
    let target = document.getElementById(elem); // #js-button
    target.addEventListener('click', function() {
      let currentY = window.pageYOffset; // 現在のスクロール位置を取得
      let step = duration/currentY > 1 ? 10 : 100; // 三項演算子
      let timeStep = duration/currentY * step; // スクロールスピードの速さ調整
      let intervalID = setInterval(scrollUp, timeStep);
      // timeStepの間隔でscrollUpを繰り返す。
      // clearItervalのために返り値intervalIDを定義する。

      function scrollUp(){
        currentY = window.pageYOffset;
        if(currentY === 0) {
            clearInterval(intervalID); // ページ最上部に来たら終了
        } else {
            scrollBy( 0, -step ); // step分上へスクロール
        }
      }
    });
  }

  // スクロールトップモダンな書き方
  /* 
  const PageTopBtn = document.getElementById('js-scroll-top');
  PageTopBtn.addEventListener('click', () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  */

  // fadeInアニメーション
  let fadeInTarget = document.querySelectorAll('.fade-in');
  window.addEventListener('scroll', () => {
    for (let i = 0; i < fadeInTarget.length; i++){
      const rect = fadeInTarget[i].getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight; // 現在のブラウザの高さ
      if (scroll > offset - windowHeight + 150) {
        fadeInTarget[i].classList.add('scroll-in');
      }
    }
  });

  const modalBtn = document.getElementById('modalOpen');
  const modal = document.getElementById('modal');

  const ms = 400;
  modal.style.transition = 'opacity ' + ms + 'ms';

  modalBtn.addEventListener('click', () =>{
    setTimeout(function(){modal.classList.add('is_open')},1);
    setTimeout(function(){modal.style.opacity = 1}, 50);
  });
  
  let modalClose = document.querySelectorAll('.js-modal-close');
    for (let i =0; i < modalClose.length; i++){
    modalClose[i].addEventListener('click', () => {
      setTimeout(function(){modal.style.opacity = 0}, 1);
      setTimeout(function(){modal.classList.remove('is_open')}, 400)
    });
  }

  // https://qiita.com/makoto1219/items/9d5b71a792025703cdea

  // スムーススクロール
  const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
  for (let i = 0; i < smoothScrollTrigger.length; i++){
    smoothScrollTrigger[i].addEventListener('click', (e) => {
      e.preventDefault(); // デフォルトのイベントをキャンセル
      let href = smoothScrollTrigger[i].getAttribute('href');
      // console.log(smoothScrollTrigger[i]) 結果: <a href="#menu1">menu1</a>
      // console.log(href) 結果: #menu1
      let targetElement = document.getElementById(href.replace('#', ''));
      // console.log(targetElement) 結果: menu1

      const rect = targetElement.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const gap = 60; // 固定ヘッダー分の高さを引く
      const target = rect + offset - gap; // offsetTop()

      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    });
  }

});