import React from "react";
import { Eye, Download, ExternalLink } from "lucide-react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 

interface MarkdownPreviewProps {
  markdownContent: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  markdownContent,
}) => {
  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Custom components for react-markdown
  const components = {
    // Headings
    h1: ({ children, ...props }) => (
      <h1 
        className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-0 mb-4 sm:mb-6 lg:mb-8 flex items-start group"
        {...props}
      >
        <div className="w-2 sm:w-3 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2 sm:mr-3 lg:mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 
        className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-300 mt-6 sm:mt-8 lg:mt-10 mb-3 sm:mb-4 lg:mb-6 flex items-start group"
        {...props}
      >
        <div className="w-1.5 sm:w-2 h-5 sm:h-6 lg:h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 
        className="text-base sm:text-lg lg:text-xl font-semibold text-cyan-300 mt-4 sm:mt-6 lg:mt-8 mb-2 sm:mb-3 lg:mb-4 flex items-start group"
        {...props}
      >
        <div className="w-1 h-4 sm:h-5 lg:h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h3>
    ),
    
    // Paragraphs
    p: ({ children, ...props }) => (
      <p className="mb-3 sm:mb-4 text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg text-left" {...props}>
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children, ...props }) => (
      <ul className="my-3 sm:my-4 space-y-2 sm:space-y-3" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-3 sm:my-4 space-y-2 sm:space-y-3" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-200 text-sm sm:text-base lg:text-lg group flex items-start" {...props}>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 sm:mt-3 mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
        <span className="text-left flex-1">{children}</span>
      </li>
    ),
    
    // Code
    code: ({ inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code 
            className="bg-cyan-500/20 text-cyan-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-xs sm:text-sm border border-cyan-500/30 font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="text-cyan-200 font-mono text-xs sm:text-sm" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <div className="bg-gray-900/60 border border-cyan-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 my-4 sm:my-6 font-mono text-xs sm:text-sm backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-x-auto">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Code
          </span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <pre className="text-cyan-200 text-left overflow-x-auto" {...props}>
          {children}
        </pre>
      </div>
    ),
    
    // Emphasis
    strong: ({ children, ...props }) => (
      <strong 
        className="text-cyan-300 font-semibold bg-cyan-500/10 px-1 rounded"
        {...props}
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-blue-300 italic" {...props}>
        {children}
      </em>
    ),
    
    // Links
    a: ({ children, href, ...props }) => (
      <a 
        href={href}
        className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors break-words"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    
    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-2 sm:border-l-4 border-cyan-500/50 pl-3 sm:pl-4 lg:pl-6 py-2 my-4 sm:my-6 bg-cyan-500/5 rounded-r-lg italic text-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-6 sm:my-8 border-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" {...props} />
    ),
    
    // Images
    img: ({ src, alt, ...props }) => (
      <img 
        src={src} 
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-lg my-3 sm:my-4"
        {...props}
      />
    )
  };

  return (
    <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-cyan-500/10 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white truncate">Live Preview</h3>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                See how your documentation looks
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleDownload}
              className="p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
              title="Download markdown"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110">
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-60px)] sm:h-[calc(100%-80px)] lg:h-[calc(100%-88px)] p-3 sm:p-4 lg:p-6 overflow-y-auto bg-gray-900/20 backdrop-blur-sm custom-scrollbar">
        <div className="text-gray-100 text-left prose prose-invert max-w-none">
          <Markdown 
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
};