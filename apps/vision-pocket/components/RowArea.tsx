import { FinRow } from "@repo/fin-core";
import { Table, Title, Button, Box, Flex } from "@mantine/core";
import { useState, useEffect } from "react";
import EditRowDrawer from "./EditRowDrawer";

interface RowAreaProps {
  rows: FinRow[];
  cellValues: string[][];
  onAddRow: () => void;
  onUpdateRow?: (updatedRow: FinRow) => void;
  onRowClick?: (row: FinRow) => void;
}

export default function RowArea({
  rows,
  cellValues,
  onAddRow,
  onUpdateRow,
  onRowClick,
}: RowAreaProps) {
  const [selectedRow, setSelectedRow] = useState<FinRow | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 컴포넌트 마운트 시 스크롤바 스타일 적용
  useEffect(() => {
    // 항상 스크롤바 공간을 확보하는 CSS 추가
    const style = document.createElement("style");
    style.textContent = `
      body {
        overflow-y: scroll;
      }
      /* 웹킷 기반 브라우저에서 스크롤바 항상 표시 */
      ::-webkit-scrollbar {
        width: 10px;
        background-color: rgba(0, 0, 0, 0.05);
      }
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleRowClick = (row: FinRow) => {
    if (selectedRow && drawerOpen) {
      // 이미 드로어가 열려있는 경우, 드로어를 닫고 약간의 지연 후 새 드로어 열기
      setDrawerOpen(false);
      setTimeout(() => {
        setSelectedRow(row);
        setDrawerOpen(true);
        if (onRowClick) {
          onRowClick(row);
        }
      }, 300); // 트랜지션 시간과 일치시킴
    } else {
      // 드로어가 닫혀있는 경우, 바로 열기
      setSelectedRow(row);
      setDrawerOpen(true);
      if (onRowClick) {
        onRowClick(row);
      }
    }
  };

  const handleSaveRow = (updatedRow: FinRow) => {
    if (onUpdateRow) {
      onUpdateRow(updatedRow);
    }
    setDrawerOpen(false);
  };

  // 월 헤더 생성 (2025-01부터 2025-12까지)
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return `2025-${month.toString().padStart(2, "0")}`;
  });

  return (
    <Flex direction="column" style={flexContainerStyle}>
      <Flex justify="space-between" align="center">
        <Title order={3} mb="md">
          Rows
        </Title>
        <Button onClick={onAddRow}>행 추가</Button>
      </Flex>
      <Box
        style={{
          ...tableContainerStyle,
          flex: 1,
        }}
      >
        <div style={{ ...tableWrapperStyle, height: "100%" }}>
          <Table striped highlightOnHover>
            <thead style={tableHeadStyle}>
              <tr>
                <th style={{ width: "150px" }}>이름</th>
                {months.map((month) => (
                  <th key={month} style={{ width: "80px", textAlign: "right" }}>
                    {month}
                  </th>
                ))}
                {/* 오른쪽 여백을 위한 빈 열 */}
                <th style={{ width: "20px" }}></th>
              </tr>
            </thead>
          </Table>
          <div style={{ ...tableBodyStyle, height: "calc(100% - 50px)" }}>
            <Table striped highlightOnHover>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{ width: "150px" }}>{row.name}</td>
                    {months.map((_, colIndex) => (
                      <td
                        key={`${row.id}-${colIndex}`}
                        style={{ width: "80px", textAlign: "right" }}
                      >
                        {cellValues[rowIndex] && cellValues[rowIndex][colIndex]
                          ? cellValues[rowIndex][colIndex]
                          : "-"}
                      </td>
                    ))}
                    {/* 오른쪽 여백을 위한 빈 셀 */}
                    <td style={{ width: "20px" }}></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Box>

      <EditRowDrawer
        opened={drawerOpen}
        row={selectedRow}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveRow}
      />
    </Flex>
  );
}

// 스타일 정의
const flexContainerStyle: React.CSSProperties = {
  flex: 1,
  height: "100%",
  position: "relative",
  overflow: "hidden",
};

// 테이블 스타일
const tableContainerStyle: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  borderRadius: "4px",
  border: "1px solid #e0e0e0",
  display: "flex",
  flexDirection: "column",
};

const tableWrapperStyle: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const tableHeadStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  backgroundColor: "#f9f9f9",
  zIndex: 1,
};

const tableBodyStyle: React.CSSProperties = {
  display: "block",
  overflowY: "scroll", // auto 대신 scroll 사용
  overflowX: "hidden",
  flex: 1,
  paddingRight: "0", // 스크롤바 공간 확보 제거
  scrollbarWidth: "thin", // Firefox용
  scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)", // Firefox용
};
