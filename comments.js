document.addEventListener('PageFinish', function() {
  // NGワードのリスト
  const NGComments = ["死ね", "バカ", ".exe"];
  const regex = new RegExp(NGComments.join("|"));

  // コメントチェック関数
  function test(wcheck) {
    if (wcheck.match(regex) != null) {
      alert("ERROR: コメントにNGワードが含まれています");
      return false;
    }
    return true;
  }

  // URLパラメータを取得する関数
  function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
  }

  // Googleフォームを作成する関数
  function createGoogleForm() {
    const formId = "1FAIpQLSeJi8SiLCAtUaep3Z7wGK0H2OZosK_YEaRMo7vxB_VEFrWq8g";
    const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const form = document.createElement("form");
    form.action = formUrl;
    form.method = "post";
    form.id = 'Comment_form';
    form.target = "hidden_iframe"; // リダイレクトを防ぐため

    form.onsubmit = function() {
      // コメントにNGワードが含まれていなければ送信
      if (!test(document.getElementById("Comments_wcheck").value)) {
        return false;
      }

      // 送信後、1秒待ってページをリロードし、スクロール位置を復元
      const scrollY = window.scrollY;
      setTimeout(() => {
        location.reload();
        window.scrollTo(0, scrollY);
      }, 1000);

      return true; // フォーム送信を許可
    };

    // 名前入力欄
    const nameParagraph = document.createElement("p");
    const nameInput = document.createElement("input");
    nameInput.name = "entry.691642850";
    nameInput.placeholder = "スクラッチネーム";
    nameInput.required = true;
    nameParagraph.appendChild(nameInput);
    form.appendChild(nameParagraph);

    // コメント入力欄
    const commentParagraph = document.createElement("p");
    const commentTextarea = document.createElement("textarea");
    commentTextarea.name = "entry.1605539997";
    commentTextarea.placeholder = "コメント";
    commentTextarea.rows = 10;
    commentTextarea.cols = 40;
    commentTextarea.maxLength = 400;
    commentTextarea.id = "Comments_wcheck";
    commentTextarea.required = true;
    commentParagraph.appendChild(commentTextarea);
    form.appendChild(commentParagraph);

    // URLパラメータを hidden フィールドに追加
    const dataValue = getUrlParameter("data");
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "entry.148490561";
    hiddenInput.value = "art" + dataValue;
    form.appendChild(hiddenInput);

    // 送信ボタン
    const submitInput = document.createElement("input");
    submitInput.type = "submit";
    submitInput.id = "submitbutton";
    submitInput.value = "送信";
    form.appendChild(submitInput);

    const content = document.getElementById('content');
    content.appendChild(form);

    // content の高さを取得し、フォームの位置を調整
    const contentHeight = parseInt(window.getComputedStyle(content).height, 10);
    form.style.top = (contentHeight + 100) + 'px';

    // hidden_iframeを作成
    const hiddenIframe = document.createElement("iframe");
    hiddenIframe.name = "hidden_iframe";
    hiddenIframe.style.display = "none";
    document.body.appendChild(hiddenIframe);
  }
  
  // フォーム生成
  createGoogleForm();

  const comments = document.createElement('div');
  comments.id = 'comments';
  document.getElementById('content').appendChild(comments);

  // d3.v6のfetchを使用してCSVを読み込み
  fetch("https://docs.google.com/spreadsheets/d/14j4HxVdHec5ELwRGyZKpehI8hM8Jpa1AppqqK3pKUA4/export?format=csv&range=A1:D")
    .then(response => response.text())
    .then(function(csvText) {
      // CSVの読み込みとパース
      const data = d3.csvParse(csvText);

      // データの逆順に
      data.reverse();

      let text = "";
      data.forEach((entry, i) => {
        const name = entry["ペンネーム"];
        const timestamp = entry["タイムスタンプ"];
        const commentsText = entry["コメント"];
        const id = entry["サイドID"];
        text += `${i + 1} 名前: <a href="https://scratch.mit.edu/users/${id}/">${name}</a> ${timestamp} <pre>${commentsText}</pre>`;
      });
      document.getElementById("comments").innerHTML = text;
    })
    .catch(function(error) {
      console.error("コメントデータの読み込みに失敗しました:", error);
    });

  // コメントテキストの処理
  function replaceText(text) {
    if (text === undefined || text === null) {
      return ""; // undefinedやnullなら空文字を返す
    }
    return text; // HTMLタグをエスケープせずそのまま返す
  }
});
