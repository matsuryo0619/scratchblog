//ファイル名のみ記述(.cssや.jsは省く)
const reqcss = ['main', 'header', 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'];
const reqjs =[
  {src: 'header', defer: true}
]

//CSSを読み込む
reqcss.forEach((word) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${word}.css`;
  document.head.appendChild(link);
});

//JSを読み込む
reqjs.forEach((file) => {
  const script = document.createElement('script');
  script.src = `${file.src}.js`;
  if (file.defer) {
    script.defer = true;
  }
  document.head.appendChild(script);
});

//サイトアイコン
const icon = document.createElement('link');
icon.rel = 'icon';
icon.href = 'img/icon.png';
document.head.appendChild(icon);
