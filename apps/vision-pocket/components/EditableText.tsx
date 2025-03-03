import { useState, useRef, KeyboardEvent, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  editableStyle?: React.CSSProperties;
  viewStyle?: React.CSSProperties;
}

export default function EditableText({
  value,
  onChange,
  placeholder = "(비어 있음)",
  style = {},
  editableStyle = {},
  viewStyle = {},
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const editableRef = useRef<HTMLDivElement>(null);

  // 편집 모드로 전환될 때 자동 포커스
  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();

      // 커서를 텍스트 끝으로 이동
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  // 외부에서 값이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSave = () => {
    if (editableRef.current) {
      const content = editableRef.current.textContent || "";
      setText(content);
      onChange(content);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const commonStyle: React.CSSProperties = {
    minHeight: "24px",
    padding: "3px 6px",
    display: "inline-block",
    minWidth: "150px",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    ...style,
  };

  const defaultEditableStyle: React.CSSProperties = {
    ...commonStyle,
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    ...editableStyle,
  };

  const defaultViewStyle: React.CSSProperties = {
    ...commonStyle,
    cursor: "pointer",
    textDecoration: "underline dotted",
    ...viewStyle,
  };

  if (isEditing) {
    return (
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        style={defaultEditableStyle}
      >
        {text}
      </div>
    );
  }

  return (
    <span onClick={() => setIsEditing(true)} style={defaultViewStyle}>
      {value || placeholder}
    </span>
  );
}
