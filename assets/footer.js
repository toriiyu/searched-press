// 共通レイアウト：ヘッダーのブランド/ナビを上書きし、フッターを挿入する（全ページで読み込む）
(function () {
  // --- ヘッダー（ロゴ＝サーチド出版／ナビ） ---
  var headerHtml = ''
    + '<a class="brand" href="/">サーチド出版<span class="en">SEARCHED&nbsp;PRESS</span></a>'
    + '<nav class="nav">'
    + '  <a href="/shinsho.html">サーチド新書</a>'
    + '  <a href="/research.html">リサーチ</a>'
    + '  <a href="/articles.html">データベース</a>'
    + '  <a href="/pricing.html">購読・購入</a>'
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
})();
