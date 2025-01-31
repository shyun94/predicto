import { NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Stock } from "@repo/fin-predict";

interface Props {
  onChange: (value: Partial<Stock>) => void;
}

export default function StockForm({ onChange }: Props) {
  const form = useForm<Partial<Stock>>({
    mode: "uncontrolled",
    initialValues: {
      amount: 0,
      interestRate: 1,
      timeRange: ["2024-01", "2024-12"],
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
        {...form.getInputProps("amount")}
      />
      <NumberInput
        thousandSeparator
        label="예상 연 평균 이율 (%)"
        suffix="%"
        {...form.getInputProps("interestRate")}
      />
    </form>
  );
}
