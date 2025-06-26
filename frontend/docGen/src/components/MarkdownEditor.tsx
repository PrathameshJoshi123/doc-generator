import React from "react";
import { Edit, Copy, Download } from "lucide-react";

interface MarkdownEditorProps {
  markdownContent: string;
  setMarkdownContent: (content: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdownContent,
  setMarkdownContent,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden">
      <div className="p-6 border-b border-cyan-500/10 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Markdown Editor
              </h3>
              <p className="text-sm text-gray-400">
                Edit your generated documentation
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
              title="Download as file"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-88px)] p-6 bg-gray-900/20 backdrop-blur-sm">
        <textarea
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          className="w-full h-full resize-none outline-none font-mono text-sm leading-relaxed bg-transparent text-gray-100 placeholder-gray-400 selection:bg-cyan-500/20"
          placeholder="Your generated markdown content will appear here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};