import React, { useEffect, useState } from "react";
import "./App.css";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import prism from "prismjs";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`function sum() {
                return 1 + 1;
              }`);
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:8080/ai/get-review", {
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
