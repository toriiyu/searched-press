// 共通レイアウト：ヘッダーのブランド/ナビを上書きし、フッターを挿入する（全ページで読み込む）
(function () {
  // --- favicon（サイトアイコン） ---
  if (!document.querySelector('link[rel="icon"]')) {
    var ic = document.createElement('link');
    ic.rel = 'icon'; ic.type = 'image/svg+xml'; ic.href = '/assets/favicon.svg';
    document.head.appendChild(ic);
  }
  // --- 動的演出CSS ---
  if (!document.querySelector('link[data-anim]')) {
    var an = document.createElement('link');
    an.rel = 'stylesheet'; an.href = '/assets/anim.css'; an.setAttribute('data-anim', '1');
    document.head.appendChild(an);
  }

  // --- 眼鏡ブランドマーク（SEARCHED ロゴ） ---
  var mark = '<span class="gl" aria-hidden="true"><svg viewBox="0 0 64 26" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"><rect x="2" y="4" width="24" height="18" rx="6"/><rect x="38" y="4" width="24" height="18" rx="6"/><path d="M26 9 C30 5.2 34 5.2 38 9" stroke-linecap="round"/></svg></span>';
  var brand = '<a class="brand" href="/">' + mark + '<span class="txt">サーチド出版<span class="en">SEARCHED&nbsp;PRESS</span></span></a>';

  // --- ヘッダー（ロゴ＝サーチド出版／ナビ） ---
  var headerHtml = ''
    + brand
    + '<nav class="nav">'
    + '  <a href="/shinsho.html">サーチド新書</a>'
    + '  <a href="/research.html">リサーチ</a>'
    + '  <a href="/articles.html">データベース</a>'
    + '  <a href="/contact.html">お問い合わせ</a>'
    + '</nav>';
  var hwrap = document.querySelector('.site-header .wrap');
  if (hwrap) { hwrap.innerHTML = headerHtml; }

  // --- フッター ---
  var year = new Date().getFullYear();
  var html = ''
    + '<footer class="site-footer"><div class="wrap"><div class="footer-grid" style="grid-template-columns:1.6fr 1fr 1fr;">'
    + '  <div class="brand-col">'
    + '    ' + brand
    + '    <p class="desc">書一冊分の文量で、あらゆるテーマを超徹底解説する好奇心駆動のニューメディア。文化人類学から思想・政治・AI・金融・暮らしまで、超入門／超全史／超徹底解説で編む。</p>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>コンテンツ</h4>'
    + '    <a href="/shinsho.html">サーチド新書</a>'
    + '    <a href="/research.html">リサーチ</a>'
    + '    <a href="/articles.html">データベース</a>'
    + '    <a href="/contact.html">お問い合わせ</a>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>刊行・発信</h4>'
    + '    <a class="ext" href="https://www.amazon.co.jp/dp/B0H3QDHRFP" target="_blank" rel="noopener">『人類学超入門』（Kindle）</a>'
    + '    <a class="ext" href="https://note.com/searched" target="_blank" rel="noopener">note</a>'
    + '    <a class="ext" href="https://x.com/searched_press" target="_blank" rel="noopener">X（@searched_press）</a>'
    + '  </div>'
    + '</div>'
    + '<div class="copyright">'
    + '  <span>&copy; ' + year + ' サーチド出版</span>'
    + '  <span>searched.press</span>'
    + '</div>'
    + '</div></footer>';
  var mount = document.getElementById('site-footer');
  if (mount) { mount.outerHTML = html; }

  // --- スクロール・リビール（要素がふわっと出現） ---
  try {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      var sels = ['.section-head', '.cards .card', '.article-row', '.book', '.plan', '.channels', '.def-table', '.prose .read', '.form-grid'];
      sels.forEach(function (sel) {
        var els = document.querySelectorAll(sel);
        els.forEach(function (el, i) {
          el.classList.add('reveal');
          el.style.transitionDelay = (Math.min(i, 6) * 70) + 'ms';
          io.observe(el);
        });
      });
    }
  } catch (e) { /* no-op */ }
})();
