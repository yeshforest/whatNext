import "./App.css";
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); //클릭해도 리로드 x
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
const Nav = (props) => {
  const lis = [];
  props.topics.map((t) => {
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(event.target.id); //event객체를 이용해 a태그의 id값을 알아냄
          }}
        >
          {t.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
};
const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
};
function App() {
  const mode = "WELCOME";
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "js is ..." },
  ];
  if (mode === "WELCOME") {
    let content = null;
  } else if (mode === "READ") {
  }
  return (
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          alert("HEADER");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          alert(id);
        }}
      />
      <Article title="Welcome" body="Hello, WEB" />
      <Article title="HI" body="Hello, WEB" />
    </div>
  );
}

export default App;
