"use client";

import { useState } from "react";
import { FinDriver, FinModel, FinRow } from "@repo/fin-core";
import { v4 as uuidv4 } from "uuid";

export default function MainPage() {
  const [model, setModel] = useState<FinModel>({
    id: uuidv4(),
    name: "",
    timeRange: ["2025-01", "2025-12"],
  });
  const [drivers, setDrivers] = useState<FinDriver[]>([]);
  const [rows, setRows] = useState<FinRow[]>([]);

  return (
    <div>
      <div>
        <button
          onClick={() =>
            setDrivers((prev) => [
              ...prev,
              {
                id: uuidv4(),
                name: "",
                value: Math.random().toString(),
                format: { type: "number" },
                driverBasedModelId: "1",
                order: prev.length,
              },
            ])
          }
        >
          add driver
        </button>
        <button
          onClick={() =>
            setRows((prev) => [...prev, makeRandomRow(drivers, prev.length)])
          }
        >
          add row
        </button>
      </div>

      <div>
        model
        <pre>{JSON.stringify(model, null, 2)}</pre>
      </div>

      <div>
        drivers
        <pre>{JSON.stringify(drivers, null, 2)}</pre>
      </div>

      <div>
        rows
        <pre>{JSON.stringify(rows, null, 2)}</pre>
      </div>
    </div>
  );
}

const makeRandomRow = (drivers: FinDriver[], index: number): FinRow => {
  const id = uuidv4();
  return {
    id,
    name: "",
    order: index,
    format: { type: "number" },
    finModelId: "1",
    timeSegments: [
      {
        id: uuidv4(),
        formula: "1",
        timeRange: ["2025-01", "2025-12"],
        rowId: index.toString(),
        order: 0,
      },
      {
        id: uuidv4(),
        formula: drivers[0]
          ? `={{${drivers[0]?.id}, x}} + {{${id}, x-1}}`
          : "1",
        timeRange: ["2025-01", "2025-12"],
        rowId: index.toString(),
        order: 1,
      },
    ],
  };
};
