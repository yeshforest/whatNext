import "./App.css";
import { useState } from "react";
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
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState();
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "js is ..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB" />;
  } else if (mode === "READ") {
    let title,
      body = null;

    topics.map((e) => {
      if (e.id === parseInt(id)) {
        title = e.title;
        body = e.body;
      }
    });

    content = <Article title={title} body={body} />;
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      />

      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
