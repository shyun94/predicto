import { NumberInput, Space } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Stock } from "@repo/fin-predict";
import formatKoreanCurrency from "../utils/formatKoreanCurrency";

interface Props {
  onChange: (value: Partial<Stock>) => void;
}

export default function StockForm({ onChange }: Props) {
  const form = useForm<Partial<Stock>>({
    mode: "uncontrolled",
    initialValues: {
      id: "asdf",
      amount: 0,
      recurringAmount: 0,
      interestRate: 1,
    },
    validate: {},
    onValuesChange: (values) => {
      onChange(values);
    },
  });

  return (
    <form>
      <NumberInput
        size="md"
        radius="xs"
        thousandSeparator
        label="현재 자산"
        suffix="원"
        hideControls
        description={`주식, 적금, 예금 모두를 합쳐봐요. ${formatKoreanCurrency(
          form.getInputProps("amount").defaultValue
        )}`}
        {...form.getInputProps("amount")}
      />
      <Space h="md" />
      <NumberInput
        size="md"
        radius="xs"
        thousandSeparator
        label="월 저축 투자액"
        suffix="원"
        hideControls
        description={`설마 0원은 아니죠..? ${formatKoreanCurrency(
          form.getInputProps("recurringAmount").defaultValue
        )}`}
        {...form.getInputProps("recurringAmount")}
      />
      <Space h="md" />
      <NumberInput
        size="md"
        radius="xs"
        thousandSeparator
        label="목표 연 수익률 (%)"
        suffix="%"
        hideControls
        description={`적금만 넣어도 3%를 공짜로 벌어요!`}
        {...form.getInputProps("interestRate")}
      />
    </form>
  );
}
