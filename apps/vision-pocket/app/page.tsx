"use client";

import {
  AppShell,
  Flex,
  NumberFormatter,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import CollapsibleAssetContainer from "../components/CollapsibleAssetContainer";
import TimeDepositForm from "../components/TimeDepositForm";
import { Fragment, useState } from "react";
import { RecurringDeposit, Stock, TimeDeposit } from "@repo/fin-predict";
import RecurringDepositForm from "../components/RecurringDepositForm";
import StockForm from "../components/StockForm";
import { sum } from "es-toolkit";
import getExpectedStock from "../../../domains/fin-predict/src/calculator/getExpectedStock";
import formatKoreanCurrency from "../utils/formatKoreanCurrency";
import { BarChart } from "@mantine/charts";

export default function Page() {
  const [timeDeposit, setTimeDeposit] = useState<Partial<TimeDeposit>>({});
  const [recurringDeposit, setRecurringDeposit] = useState<
    Partial<RecurringDeposit>
  >({});
  const [stock, setStock] = useState<Partial<Stock>>({});

  const totalAssets = sum([
    timeDeposit?.amount ?? 0,
    recurringDeposit?.amount ?? 0,
    stock?.amount ?? 0,
  ]);

  const result = isStockNotPartial(stock)
    ? [
        { label: "1년후", ...getExpectedStock({ stock, afterYear: 1 }) },
        { label: "5년후", ...getExpectedStock({ stock, afterYear: 5 }) },
        { label: "10년후", ...getExpectedStock({ stock, afterYear: 10 }) },
        { label: "20년후", ...getExpectedStock({ stock, afterYear: 20 }) },
        { label: "30년후", ...getExpectedStock({ stock, afterYear: 30 }) },
        { label: "40년후", ...getExpectedStock({ stock, afterYear: 40 }) },
      ]
    : undefined;

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Flex justify={"center"} direction={"column"}>
          <Flex maw={736} direction={"column"} w={"100%"}>
            <Flex justify={"space-between"} align={"center"}>
              <Title order={3} size="xl">
                현재 총 자산
              </Title>
              <Title order={3} size="xl">
                <NumberFormatter
                  value={totalAssets}
                  suffix="원"
                  thousandSeparator
                />
              </Title>
            </Flex>

            <Space h="md" />

            <Stack>
              {/* <CollapsibleAssetContainer title={"예금"}>
                <TimeDepositForm onChange={setTimeDeposit} />
              </CollapsibleAssetContainer>
              <CollapsibleAssetContainer title={"적금"}>
                <RecurringDepositForm onChange={setRecurringDeposit} />
              </CollapsibleAssetContainer> */}
              <CollapsibleAssetContainer title={"주식"}>
                <StockForm onChange={setStock} />
              </CollapsibleAssetContainer>
            </Stack>
          </Flex>
          {result && (
            <>
              <Flex maw={736} direction={"column"} w={"100%"}>
                {result.map((n) => (
                  <div key={n.label}>
                    {n.label}: {formatKoreanCurrency(n.total)}
                  </div>
                ))}
                <Space h="md" />
                <BarChart
                  h={300}
                  data={result}
                  series={[
                    { name: "value", color: "indigo", label: "예상 금액" },
                  ]}
                  tickLine="y"
                  dataKey={"label"}
                  valueFormatter={(value) => formatKoreanCurrency(value)}
                />
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
