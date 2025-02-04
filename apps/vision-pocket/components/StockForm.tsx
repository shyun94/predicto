import { NumberInput } from "@mantine/core";
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
        thousandSeparator
        label="예치 금액"
        suffix="원"
        hideControls
        description={formatKoreanCurrency(
          form.getInputProps("amount").defaultValue
        )}
        {...form.getInputProps("amount")}
      />

      <NumberInput
        thousandSeparator
        label="월 납입 금액"
        suffix="원"
        hideControls
        description={formatKoreanCurrency(
          form.getInputProps("recurringAmount").defaultValue
        )}
        {...form.getInputProps("recurringAmount")}
      />
      <NumberInput
        thousandSeparator
        label="예상 연 평균 이율 (%)"
        suffix="%"
        hideControls
        {...form.getInputProps("interestRate")}
      />
    </form>
  );
}
