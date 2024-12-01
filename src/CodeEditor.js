import React from "react";

const CodeEditor = ({ fileName, code, onCodeChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4>{fileName}</h4>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(fileName, e.target.value)}
        rows={10}
        cols={50}
        style={{ width: "100%", fontFamily: "monospace" }}
      />
    </div>
  );
};

export default CodeEditor;