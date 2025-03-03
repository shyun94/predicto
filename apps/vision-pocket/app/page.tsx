"use client";

import { AppShell, Flex } from "@mantine/core";
import {
  FinDriver,
  FinFormulaTableManager,
  FinModel,
  FinRow,
} from "@repo/fin-core";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import DriverArea from "../components/DriverArea";
import RowArea from "../components/RowArea";

export default function Page() {
  const [model, setModel] = useState<FinModel>({
    id: uuidv4(),
    name: "",
    timeRange: ["2025-01", "2025-12"],
  });
  const [drivers, setDrivers] = useState<FinDriver[]>([]);
  const [rows, setRows] = useState<FinRow[]>([]);

  const finFormulaManager = useMemo(() => {
    return new FinFormulaTableManager(model);
  }, [model]);

  const cellValues = useMemo(() => {
    finFormulaManager.setFinContents({
      rows,
      drivers,
    });
    return finFormulaManager.getCellValues();
  }, [drivers, finFormulaManager, rows]);

  return (
    <AppShell>
      <AppShell.Main style={{ height: "100vh" }}>
        <Flex direction="row" gap="md" style={{ height: "100%" }}>
          <Flex>
            <DriverArea
              model={model}
              drivers={drivers}
              onAddDriver={(newDriver) => {
                setDrivers((prev) => [...prev, newDriver]);
              }}
              onUpdateDriver={(updatedDriver) => {
                setDrivers((prev) =>
                  prev.map((driver) =>
                    driver.id === updatedDriver.id ? updatedDriver : driver
                  )
                );
              }}
            />
          </Flex>
          <Flex style={{ flex: 1, height: "100%" }}>
            <RowArea
              rows={rows}
              cellValues={cellValues}
              onAddRow={() => {
                setRows((prev) => [
                  ...prev,
                  makeRandomRow(drivers, model.id, prev.length),
                ]);
              }}
              onUpdateRow={(updatedRow) => {
                setRows((prev) =>
                  prev.map((row) =>
                    row.id === updatedRow.id ? updatedRow : row
                  )
                );
              }}
              onRowClick={(row) => {
                console.log("Row clicked:", row);
              }}
            />
          </Flex>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}

const makeRandomRow = (
  drivers: FinDriver[],
  modelId: string,
  index: number
): FinRow => {
  const id = uuidv4();
  return {
    id,
    name: "",
    order: index,
    format: { type: "number" },
    modelId: modelId,
    timeSegments: [
      {
        id: uuidv4(),
        formula: "1",
        timeRange: ["2025-01", "2025-12"],
        rowId: id,
        order: 0,
      },
      {
        id: uuidv4(),
        formula: drivers[0] ? `={{${drivers[0]?.id}}} + {{${id},x-1}}` : "1",
        timeRange: ["2025-02", "2025-12"],
        rowId: id,
        order: 1,
      },
    ],
  };
};
