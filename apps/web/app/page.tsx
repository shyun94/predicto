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
import { useState } from "react";
import { RecurringDeposit, Stock, TimeDeposit } from "@repo/fin-predict";
import RecurringDepositForm from "../components/RecurringDepositForm";
import StockForm from "../components/StockForm";
import { sum } from "es-toolkit";

export default function Page() {
  const [timeDeposit, setTimeDeposit] = useState<Partial<TimeDeposit>>({});
  const [recurringDeposit, setRecurringDeposit] = useState<
    Partial<RecurringDeposit>
  >({});
  const [stock, setStock] = useState<Partial<Stock>>();

  const totalAssets = sum([
    timeDeposit?.amount ?? 0,
    recurringDeposit?.amount ?? 0,
    stock?.amount ?? 0,
  ]);

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Flex justify={"center"}>
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
              <CollapsibleAssetContainer title={"예금"}>
                <TimeDepositForm onChange={setTimeDeposit} />
              </CollapsibleAssetContainer>
              <CollapsibleAssetContainer title={"적금"}>
                <RecurringDepositForm onChange={setRecurringDeposit} />
              </CollapsibleAssetContainer>
              <CollapsibleAssetContainer title={"주식"}>
                <StockForm onChange={setStock} />
              </CollapsibleAssetContainer>
            </Stack>
          </Flex>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
