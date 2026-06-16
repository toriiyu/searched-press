// 共通フッターを挿入する（全ページで読み込む）
(function () {
  var year = new Date().getFullYear();
  var html = ''
    + '<footer class="site-footer"><div class="wrap"><div class="footer-grid">'
    + '  <div class="brand-col">'
    + '    <a class="brand" href="/">サーチド新書<span class="en">SEARCHED&nbsp;PRESS</span></a>'
    + '    <p class="desc">深い分析と教養を求める読者のための、長文コンテンツの発行体。読むに値する論考を編集し、検索可能な知として蓄える。</p>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>コンテンツ</h4>'
    + '    <a href="/articles.html">記事一覧・データベース</a>'
    + '    <a href="/about.html">編集方針</a>'
    + '    <a href="/pricing.html">購読・購入</a>'
    + '    <a href="/contact.html">お問い合わせ</a>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>刊行・発信</h4>'
    + '    <a class="ext" href="https://www.amazon.co.jp/dp/B0H3QDHRFP" target="_blank" rel="noopener">『人類学超入門』（Kindle）</a>'
    + '    <a class="ext" href="https://note.com/searched" target="_blank" rel="noopener">note</a>'
    + '    <a class="ext" href="https://x.com/searched_press" target="_blank" rel="noopener">X（@searched_press）</a>'
    + '  </div>'
    + '  <div class="footer-col">'
    + '    <h4>規約・法務</h4>'
    + '    <a href="/legal/tokushoho.html">特定商取引法に基づく表記</a>'
    + '    <a href="/legal/privacy.html">プライバシーポリシー</a>'
    + '    <a href="/legal/terms.html">利用規約</a>'
    + '  </div>'
    + '</div>'
    + '<div class="copyright">'
    + '  <span>&copy; ' + year + ' サーチド新書編集部</span>'
    + '  <span>searched.press</span>'
    + '</div>'
    + '</div></footer>';
  var mount = document.getElementById('site-footer');
  if (mount) { mount.outerHTML = html; }
})();
