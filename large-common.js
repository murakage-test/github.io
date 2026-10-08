// 大量情報の読み取りテスト用：Q&A を n 件、読み込み後に描画する。
// 正解（needle）は必ず最後の1件にだけ入れる。件数は URL の ?n= で変えられる（既定 300、最大 5000）。
(function () {
  var places = ['本館', '別館', '第2ビル', '研修センター'];
  var sides = ['東側', '西側', '南側', '北側'];
  var items = ['ノートPC', 'プロジェクター', 'ホワイトボード', '延長コード', 'ヘッドセット', 'モバイルWi-Fi'];
  var forms = ['出張申請書', '仮払申請書', '購買依頼書', '備品貸出票', '交通費明細書'];

  function filler(i) {
    var k = i % 5, no = String(i + 1).padStart(4, '0');
    if (k === 0) return ['会議室 M-' + no + ' はどこにありますか？', places[i % 4] + ' ' + (i % 9 + 1) + '階 ' + sides[(i >> 2) % 4] + ' です。'];
    if (k === 1) return ['備品番号 B-' + no + ' は何ですか？', items[i % 6] + '（管理番号 ' + (1000 + i * 7) + '）です。'];
    if (k === 2) return ['費目コード E-' + no + ' の名称は？', '「' + ['旅費', '通信費', '消耗品費', '図書費', '研修費'][i % 5] + '・区分' + (i % 13 + 1) + '」です。'];
    if (k === 3) return ['様式番号 F-' + no + ' はどの書類ですか？', forms[i % 5] + '（第' + (i % 6 + 1) + '版）です。'];
    return ['拠点コード S-' + no + ' の所在地は？', ['名古屋', '大阪', '東京', '福岡', '仙台', '札幌'][i % 6] + '第' + (i % 4 + 1) + '事業所です。'];
  }

  window.renderFaq = function (container, needleQ, needleA) {
    var n = parseInt(new URLSearchParams(location.search).get('n'), 10);
    if (!(n > 0)) n = 300;
    n = Math.min(n, 5000);
    var dl = document.createElement('dl');
    for (var i = 0; i < n; i++) {
      var qa = i === n - 1 ? [needleQ, needleA] : filler(i);
      var dt = document.createElement('dt'); dt.textContent = 'Q' + (i + 1) + '：' + qa[0];
      var dd = document.createElement('dd'); dd.textContent = 'A：' + qa[1];
      dl.appendChild(dt); dl.appendChild(dd);
    }
    container.textContent = '';
    container.appendChild(dl);
    var c = document.getElementById('count');
    if (c) c.textContent = n + ' 件';
  };
})();
