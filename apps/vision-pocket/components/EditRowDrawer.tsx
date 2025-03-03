import { FinRow } from "@repo/fin-core";
import { Box, Button, Drawer, Group, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";

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
    <Drawer
      opened={opened}
      onClose={onClose}
      position="bottom"
      size="md"
      title="행 편집"
      withCloseButton
      closeButtonProps={{ size: "md" }}
      withOverlay={false}
      lockScroll={false}
      closeOnClickOutside={false}
      styles={{
        content: {
          borderTop: "1px solid #e0e0e0",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        },
        body: {
          padding: "16px",
        },
        inner: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        header: {
          backgroundColor: "white",
        },
      }}
    >
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
    </Drawer>
  );
}
