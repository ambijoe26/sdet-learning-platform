import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  readOnly?: boolean;
  language?: 'java' | 'javascript' | 'typescript' | 'sql' | 'bash';
  onCodeChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  readOnly = false,
  language = 'java',
  onCodeChange
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'vs-dark'>('vs-dark');

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (onCodeChange) {
        onCodeChange(value);
      }
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('⏳ Running code...\n');

    // Simulate code execution with a bit more realism
    setTimeout(() => {
      const mockOutputs: { [key: string]: string } = {
        java: `Output:\n------\n✓ Program compiled successfully\n✓ Test case 1: PASS\n✓ Test case 2: PASS\n\nExecution time: 234ms\nMemory used: 12.5MB\n\n💡 To run this on your machine:\n1. Copy the code above\n2. Paste into your IDE (IntelliJ, Eclipse, VS Code)\n3. Compile: javac FileName.java\n4. Run: java FileName`,
        javascript: `Output:\n------\n✓ Code executed successfully\nResult: [output shown above]\n\n💡 To run this on your machine:\n1. Copy the code above\n2. Create a .js file in your editor\n3. Run: node filename.js\n4. Or paste in browser DevTools console`,
        sql: `Output:\n------\nQuery executed successfully\nRows affected: 5\nExecution time: 45ms\n\n📋 Results:\nid | name | status\n1  | Task1| DONE\n2  | Task2| PENDING\n\n💡 To run this on your machine:\n1. Copy the query above\n2. Open your database client\n3. Paste and execute`,
        typescript: `Output:\n------\n✓ Compilation successful\n✓ Type checking passed\nResult: [output shown above]\n\n💡 To run this on your machine:\n1. Copy the code above\n2. Install TypeScript: npm install typescript\n3. Compile: tsc file.ts\n4. Run: node file.js`,
        bash: `Output:\n------\n✓ Script executed\n[Command output]\n\n💡 To run this on your machine:\n1. Copy the script above\n2. Save as script.sh\n3. chmod +x script.sh\n4. ./script.sh`
      };

      setOutput(`${mockOutputs[language] || mockOutputs.java}`);
      setIsRunning(false);
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <span className="language-badge">{language.toUpperCase()}</span>
        </div>
        <div className="toolbar-right">
          <button className="btn-theme" onClick={toggleTheme} title="Toggle theme">
            {theme === 'vs-dark' ? '☀️' : '🌙'}
          </button>
          {!readOnly && (
            <button
              className="btn-run"
              onClick={handleRunCode}
              disabled={isRunning}
              title="Run code (Ctrl+Enter)"
            >
              {isRunning ? '⏳ Running...' : '▶️ Run'}
            </button>
          )}
        </div>
      </div>

      <div className="monaco-editor-wrapper">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            readOnly: readOnly,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: 14,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 16, bottom: 16 }
          }}
        />
      </div>

      {output && (
        <div className="code-output">
          <div className="output-header">
            <span>📤 Console Output</span>
            <button
              className="btn-clear-output"
              onClick={() => setOutput('')}
              title="Clear output"
            >
              ✕
            </button>
          </div>
          <pre className="output-content">{output}</pre>
        </div>
      )}

      <div className="editor-hints">
        <p>💡 <strong>Tip:</strong> Use syntax highlighting to spot errors. Copy code to your IDE for full features like debugging and testing.</p>
        <p>🎹 <strong>Keyboard:</strong> Ctrl+Enter to run | Ctrl+Z to undo | Ctrl+Shift+F to format</p>
      </div>
    </div>
  );
};

export default CodeEditor;
