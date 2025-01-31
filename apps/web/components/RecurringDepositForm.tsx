import { NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RecurringDeposit } from "@repo/fin-predict";

interface Props {
  onChange: (value: Partial<RecurringDeposit>) => void;
}

export default function RecurringDepositForm({ onChange }: Props) {
  const form = useForm<Partial<RecurringDeposit>>({
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
        label="월 예치 금액"
        suffix="원"
        {...form.getInputProps("amount")}
      />
      <NumberInput
        thousandSeparator
        label="이율 (%)"
        suffix="%"
        {...form.getInputProps("interestRate")}
      />
    </form>
  );
}
