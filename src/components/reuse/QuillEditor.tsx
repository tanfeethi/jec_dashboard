import React from "react";
import { Editor } from "primereact/editor";

interface ReusableEditorProps {
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  rows?: number; // New prop to control height
}

const QuillEditor: React.FC<ReusableEditorProps> = ({
  value,
  onChange,
  style,
  placeholder = "Start typing here...",
  rows = 5, // Default to 5 rows
}) => {
  // Fallback to height from rows if no explicit style height is provided
  const computedHeight = style?.height ?? `${rows * 24}px`;

  return (
    <div className="card">
      <Editor
        value={value}
        onTextChange={(e) => onChange(e.htmlValue ?? "")}
        style={{ ...style, height: computedHeight }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default QuillEditor;
