import React, { useEffect, useState } from "react";
import "./App.css";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import prism from "prismjs";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

const App = () => {
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`Your Code here...`);
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("/ai/get-review", {
      code,
    });
    setReview(response.data);
  }
  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.js, "js")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 15,
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          ></Editor>
        </div>
        <div onClick={reviewCode} className="button">
          Review
        </div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
};

export default App;
