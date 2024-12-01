import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";

const App = () => {
  const [mainCode, setMainCode] = useState(
    "public class Main {\n    public static void main(String[] args) {\n        Helper.printMessage();\n        System.out.println(\"Hello, Lambda!\");\n    }\n}"
  );
  const [files, setFiles] = useState([
    {
      fileName: "Helper.java",
      code: "public class Helper {\n    public static void printMessage() {\n        System.out.println(\"Hello from Helper class!\");\n    }\n}",
    },
  ]);
  const [output, setOutput] = useState("");

  const handleMainCodeChange = (e) => setMainCode(e.target.value);

  const handleCodeChange = (fileName, newCode) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.fileName === fileName ? { ...file, code: newCode } : file
      )
    );
  };

  const handleAddFile = () => {
    const newFileName = `File${files.length + 1}.java`;
    setFiles([...files, { fileName: newFileName, code: "" }]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://mqtt2grlrubq3pc37auub72vxe0jgtca.lambda-url.eu-central-1.on.aws/",
        {
          main: mainCode,
          files: files,
          tests: []
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Multi-File Code Editor</h1>
      <div style={{ marginBottom: "20px" }}>
        <h3>Main.java</h3>
        <textarea
          value={mainCode}
          onChange={handleMainCodeChange}
          rows={10}
          cols={50}
          style={{ width: "100%", fontFamily: "monospace" }}
        />
      </div>
      <h3>Additional Files</h3>
      {files.map((file, index) => (
        <CodeEditor
          key={index}
          fileName={file.fileName}
          code={file.code}
          onCodeChange={handleCodeChange}
        />
      ))}
      <button onClick={handleAddFile} style={{ marginBottom: "20px" }}>
        Add File
      </button>
      <br />
      <button onClick={handleSubmit} style={{ marginBottom: "20px" }}>
        Submit Code
      </button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default App;
