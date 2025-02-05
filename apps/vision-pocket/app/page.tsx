"use client";

import { AppShell, Button, Flex, Space, Stack } from "@mantine/core";
import { useState } from "react";
import { RecurringDeposit, Stock, TimeDeposit } from "@repo/fin-predict";
import StockForm from "../components/StockForm";
import { sum } from "es-toolkit";
import getExpectedStock from "../../../domains/fin-predict/src/calculator/getExpectedStock";
import formatKoreanCurrency from "../utils/formatKoreanCurrency";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Page() {
  const [stock, setStock] = useState<Partial<Stock>>({});

  const result = isStockNotPartial(stock)
    ? [
        { label: "1년후", ...getExpectedStock({ stock, afterYear: 1 }) },
        { label: "2년후", ...getExpectedStock({ stock, afterYear: 2 }) },
        { label: "3년후", ...getExpectedStock({ stock, afterYear: 3 }) },
        { label: "5년후", ...getExpectedStock({ stock, afterYear: 5 }) },
        { label: "10년후", ...getExpectedStock({ stock, afterYear: 10 }) },
        { label: "15년후", ...getExpectedStock({ stock, afterYear: 15 }) },
        { label: "20년후", ...getExpectedStock({ stock, afterYear: 20 }) },
        { label: "25년후", ...getExpectedStock({ stock, afterYear: 25 }) },
        { label: "30년후", ...getExpectedStock({ stock, afterYear: 30 }) },
        { label: "35년후", ...getExpectedStock({ stock, afterYear: 35 }) },
        { label: "40년후", ...getExpectedStock({ stock, afterYear: 40 }) },
      ]
    : undefined;

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Flex justify={"center"} direction={"column"}>
          <Flex maw={736} direction={"column"} w={"100%"}>
            <Space h="md" />

            <Stack>
              <StockForm onChange={setStock} />
            </Stack>
          </Flex>
          <Space h="md" />

          <Button
            pos="fixed"
            bottom={0}
            left={0}
            right={0}
            h={60}
            style={{
              zIndex: 1000,
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
            size="xl"
            color="dark.6"
          >
            계산하기
          </Button>

          {result && (
            <>
              <Flex maw={736} direction={"column"} w={"100%"}>
                {result.map((n) => (
                  <div key={n.label}>
                    {n.label}: {formatKoreanCurrency(n.total)}
                  </div>
                ))}
                <Space h="md" />
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={result}>
                    <XAxis dataKey="label" />
                    <YAxis
                      tickFormatter={(value) => formatKoreanCurrency(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="initialInvestmentAmount"
                      fill="#1f78b4"
                      name="초기 투자금"
                      stackId="a"
                    />
                    <Bar
                      dataKey="additionalInvestmentAmount"
                      fill="#e63946"
                      name="추가 투자금"
                      stackId="a"
                    />
                    <Bar
                      dataKey="totalProfit"
                      fill="#2a9d8f"
                      name="총 수익"
                      stackId="a"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </Flex>
            </>
          )}
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}

const isStockNotPartial = (stock: Partial<Stock>): stock is Stock => {
  if (
    stock.id &&
    stock.amount !== undefined &&
    stock.interestRate !== undefined &&
    stock.recurringAmount !== undefined
  ) {
    return true;
  }
  return false;
};

// 커스텀 툴팁 컴포넌트 정의
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((acc, curr) => acc + (curr.value || 0), 0);
    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        {payload.map((item) => (
          <p key={item.name} style={{ color: item.color }}>
            {item.name}: {formatKoreanCurrency(item.value)} (
            {Math.round((item.value / total) * 100)}%)
          </p>
        ))}
        <hr />
        <p>총 합계: {formatKoreanCurrency(total)}</p>
      </div>
    );
  }
  return null;
};
