import { FinRow } from "@repo/fin-core";
import {
  Box,
  Button,
  Group,
  TextInput,
  Textarea,
  Transition,
} from "@mantine/core";
import { useEffect, useState, useCallback } from "react";

interface EditRowDrawerProps {
  opened: boolean;
  row: FinRow | null;
  onClose: () => void;
  onSave: (updatedRow: FinRow) => void;
}

export default function EditRowDrawer({
  opened,
  row,
  onClose,
  onSave,
}: EditRowDrawerProps) {
  const [editName, setEditName] = useState("");
  const [editFormula, setEditFormula] = useState("");

  // ESC 키 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && opened) {
        onClose();
      }
    },
    [opened, onClose]
  );

  // 컴포넌트 마운트/언마운트 시 이벤트 리스너 등록/해제
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // row가 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (row) {
      setEditName(row.name);
      setEditFormula(row.timeSegments[0]?.formula || "");
    }
  }, [row]);

  const handleSave = () => {
    if (row) {
      const updatedRow = {
        ...row,
        name: editName,
        timeSegments: row.timeSegments.map((segment, index) =>
          index === 0 ? { ...segment, formula: editFormula } : segment
        ),
      };
      onSave(updatedRow);
    }
  };

  return (
    <Transition
      mounted={opened}
      transition="slide-up"
      duration={300}
      timingFunction="ease"
    >
      {(styles) => (
        <Box style={{ ...styles, ...drawerContainerStyle }}>
          <Box style={drawerHeaderStyle}>
            <Box style={drawerTitleStyle}>행 편집</Box>
            <Button variant="subtle" onClick={onClose}>
              닫기
            </Button>
          </Box>

          {row && (
            <Box>
              <TextInput
                label="이름"
                value={editName}
                onChange={(e) => setEditName(e.currentTarget.value)}
                mb="md"
              />
              <Textarea
                label="기본 수식"
                value={editFormula}
                onChange={(e) => setEditFormula(e.currentTarget.value)}
                minRows={2}
                mb="lg"
              />
              <Group>
                <Button variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button onClick={handleSave}>저장</Button>
              </Group>
            </Box>
          )}
        </Box>
      )}
    </Transition>
  );
}

// 스타일 정의
const drawerContainerStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderTop: "1px solid #e0e0e0",
  borderLeft: "1px solid #e0e0e0",
  borderRight: "1px solid #e0e0e0",
  boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  height: "auto",
  overflow: "hidden",
  position: "relative",
  zIndex: 10,
  borderRadius: "8px 8px 0 0",
};

const drawerHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const drawerTitleStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "18px",
};
