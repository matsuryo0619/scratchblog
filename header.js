// ヘッダーを作成
const header = document.createElement('header');
header.id = 'header';

// ヘッダーの子要素を作成
const Logo = document.createElement('img');
Logo.id = 'header_logo';
Logo.src = 'https://matsuryo0619.github.io/scratchblog/img/Logo.png';

  // サイト内検索
  const SearchDIV = document.createElement('div');
  SearchDIV.id = 'SearchBOX';

  // サイト内検索ボックス
  const Search = document.createElement('input');
  Search.type = 'text';
  Search.id = 'header_Search';
  Search.placeholder = 'サイト内検索';
  Search.autocomplete = 'off';

  // サイト内検索ボタン
  const SearchBtn = document.createElement('i');
  SearchBtn.classList.add('fa-solid', 'fa-magnifying-glass');
  SearchBtn.id = 'header_SearchBtn';

  SearchDIV.appendChild(SearchBtn);
  SearchDIV.appendChild(Search);

  // ボタンの親リスト
  const Button_parent = document.createElement('ul');
  Button_parent.style.listStyle = 'none';
  Button_parent.id = 'header_buttonlist';

  const ButtonList = [
    { text: 'ホーム', src: 'Home.html' },
    { text: '私の作品', src: 'myStuff.html' }
  ];

  ButtonList.forEach((data) => {
    const Button = document.createElement('li');
    Button.classList.add('header_List');
    Button.textContent = data.text;
    Button_parent.appendChild(Button);

    Button.addEventListener('click', function () {
      if (data.src.includes('https://')) {
        window.location.href = data.src;
      } else {
        window.location.href = `https://matsuryo0619.github.io/scratchblog/${data.src}`;
      }
    });
  });

  // ヘッダーに子要素を追加
  header.appendChild(Logo);
  header.appendChild(SearchDIV);
  header.appendChild(Button_parent);

  // ヘッダーをHTMLに追加
  document.body.appendChild(header);

  // P要素を追加
  const header_margin = document.createElement('p');
  header_margin.textContent = 'ヘッダー間隔';
  header_margin.id = 'header_margin';
  document.body.prepend(header_margin);

  // ヘッダーイベント
  Logo.addEventListener('click', function () {
    window.location.href = 'https://matsuryo0619.github.io/scratchblog/Home.html';
  });

  // 検索バーにEnterが押された時の処理
  Search.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const value = Search.value;
      if (value.trim().length > 0) {
        window.location.href = `https://matsuryo0619.github.io/scratchblog/Search.html?q=${value}`;
      }
    }
  });

  // 検索ボタンが押されたときの処理
  SearchBtn.addEventListener('click', function () {
    const value = Search.value;
    if (value.trim().length > 0) {
      window.location.href = `https://matsuryo0619.github.io/scratchblog/Search.html?q=${value}`;
    }
  });

  // 検索バーが作成された後にカスタムイベントを発火
  const event = new CustomEvent('headerSearchCreated', {
    detail: { searchInput: Search }
  });
  window.dispatchEvent(event);
