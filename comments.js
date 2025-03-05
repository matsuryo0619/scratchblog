var NGComments = ["死ね", "バカ", ".exe"]; // 簡易的なNGワードの設定
var regex = new RegExp(NGComments.join("|"));

function test(wcheck) {
  if (wcheck.match(regex) != null) {
    alert("ERROR: コメントにNGワードが含まれています");
    return false;
  }
  document.getElementById("submitbutton").disabled = true;
  return true;
}

function getUrlParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || ""; // パラメータが無い場合は空文字を返す
}

function createGoogleForm() {
  const formId = "1FAIpQLSeJi8SiLCAtUaep3Z7wGK0H2OZosK_YEaRMo7vxB_VEFrWq8g";
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

  const form = document.createElement("form");
  form.action = formUrl;
  form.method = "post";
  form.target = "hidden_iframe";
  form.onsubmit = function() {
    return test(document.getElementById("Comments_wcheck").value);
  };

  // 名前入力欄
  const nameParagraph = document.createElement("p");
  const nameInput = document.createElement("input");
  nameInput.name = "entry.691642850"; // 必要に応じてentry番号を変更
  nameInput.placeholder = "名前";
  nameInput.value = "名無し";
  nameInput.required = true;
  nameParagraph.appendChild(nameInput);
  form.appendChild(nameParagraph);

  // コメント入力欄
  const commentParagraph = document.createElement("p");
  const commentTextarea = document.createElement("textarea");
  commentTextarea.name = "entry.1605539997"; // 必要に応じてentry番号を変更
  commentTextarea.placeholder = "コメント";
  commentTextarea.rows = 10;
  commentTextarea.cols = 40;
  commentTextarea.maxLength = 400;
  commentTextarea.id = "Comments_wcheck";
  commentTextarea.required = true;
  commentParagraph.appendChild(commentTextarea);
  form.appendChild(commentParagraph);

  // entry.148490561 に "art" + URLパラメータの data をセット
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

  // フォームをDOMに追加
  document.body.appendChild(form);

  // hidden_iframeの作成（送信後のリダイレクトを防ぐ）
  const hiddenIframe = document.createElement("iframe");
  hiddenIframe.name = "hidden_iframe";
  hiddenIframe.style.display = "none";
  document.body.appendChild(hiddenIframe);
}

// フォーム生成関数の実行
createGoogleForm();
