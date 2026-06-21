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

  // --- ヘッダー（ロゴ＝サーチド出版／ナビ） ---
  var headerHtml = ''
    + '<a class="brand" href="/">サーチド出版<span class="en">SEARCHED&nbsp;PRESS</span></a>'
    + '<nav class="nav">'
    + '  <a href="/shinsho.html">サーチド新書</a>'
    + '  <a href="/research.html">リサーチ</a>'
    + '  <a href="/articles.html">データベース</a>'
    + '  <a href="/pricing.html">購読・購入&nbsp;🔒</a>'
    + '  <a href="/contact.html">お問い合わせ</a>'
    + '</nav>';
  var hwrap = document.querySelector('.site-header .wrap');
  if (hwrap) { hwrap.innerHTML = headerHtml; }

  // --- フッター ---
  var year = new Date().getFullYear();
  var html = ''
    + '<footer class="site-footer"><div class="wrap"><div class="footer-grid" style="grid-template-columns:1.6fr 1fr 1fr;">'
    + '  <div class="brand-col">'
    + '    <a class="brand" href="/">サーチド出版<span class="en">SEARCHED&nbsp;PRESS</span></a>'
    + '    <p class="desc">深い分析と教養を求める読者のための発行体。読むに値する論考を編集し、検索可能な知として蓄える。</p>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>コンテンツ</h4>'
    + '    <a href="/shinsho.html">サーチド新書</a>'
    + '    <a href="/research.html">リサーチ</a>'
    + '    <a href="/articles.html">データベース</a>'
    + '    <a href="/pricing.html">購読・購入</a>'
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
