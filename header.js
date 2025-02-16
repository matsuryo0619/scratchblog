//ヘッダーを作成
const header = document.createElement('header');
header.id = 'header';

//ヘッダーの子要素を作成
const Logo = document.createElement('img');
Logo.id = 'header_logo';
Logo.src = 'img/Logo.png';

const Search = document.createElement('input');
Search.type = 'text';
Search.id = 'header_Search';
Search.placeholder = 'サイト内検索';

//ボタンの親リスト
const Button_parent = document.createElement('ul');
Button_parent.style.listStyle = 'none';
Button_parent.id = 'header_buttonlist';

const ButtonList = [
  {text: 'ホーム', src: 'Home.html'},
  {text: '私の作品', src: 'myStuff.html'}
]

ButtonList.forEach((data) => {
  const Button = document.createElement('li');
  Button.classList.add('header_List');
  Button.textContent = data.text;
  Button_parent.appendChild(Button);

  Button.addEventListener('click', function() {
    if (data.src.includes('https://')) {
      window.location.href = data.src;
    } else {
      window.location.href = `https://matsuryo0619.github.io/scratchblog/${data.src}`;
    }
  });
});

//ヘッダーに子要素を追加
header.appendChild(Logo);
header.appendChild(Search);
header.appendChild(Button_parent);

//ヘッダーをHTMLに追加
document.body.appendChild(header);

//ヘッダーイベント
Logo.addEventListener('click', function() {
  window.open('https://scratch.mit.edu');
});

Search.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const value = Search.value;
    if (value.trim().length > 0) {
      sessionStorage.setItem('searchQuery', value);
      window.location.href = 'search.html';
    }
  }
});
