import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

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
    <nav style={{ border: "1px solid gray" }}>
      <ol>{lis}</ol>
    </nav>
  );
};
const Article = (props) => {
  return (
    <article style={{ border: "1px solid gray" }}>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
};
const Create = (props) => {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value; //name.value로 값 가져올 수 있으
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body" />
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
};
const Update = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value; //name.value로 값 가져올 수 있으
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          />
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
};
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState();
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "js is ..." },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = (
      <Article
        title="Welcome"
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
    );
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
    contextControl = (
      <>
        <li>
          <Button
            variant="contained"
            href={"/update/" + id}
            onClick={(event) => {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </Button>
        </li>
        <li>
          <Button
            variant="contained"
            onClick={() => {
              const newTopics = [];
              topics.map((e) => {
                if (e.id !== parseInt(id)) {
                  newTopics.push(e);
                }
              });
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          >
            Delete
          </Button>
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title: title, body: body };
          setTopics([...topics, newTopic]);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;

    topics.map((e) => {
      if (e.id === parseInt(id)) {
        title = e.title;
        body = e.body;
      }
    });
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const updatedTopic = { id: parseInt(id), title: title, body: body };

          const newTopics = [...topics];
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === parseInt(id)) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }
  return (
    <Container fixed>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      />
      <Grid container>
        <Grid item xs="4">
          <Nav
            topics={topics}
            onChangeMode={(_id) => {
              setMode("READ");
              setId(_id);
            }}
          />
        </Grid>
        <Grid item xs="8">
          {content}
        </Grid>
      </Grid>
      <ul>
        <li>
          <Button
            variant="contained"
            onClick={() => {
              setMode("CREATE");
            }}
          >
            CREATE
          </Button>
        </li>
        {contextControl}
      </ul>
    </Container>
  );
}

export default App;
