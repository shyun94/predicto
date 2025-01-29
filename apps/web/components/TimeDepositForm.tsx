import { NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeDeposit } from "@repo/fin-predict";

interface Props {
  onChange: (value: Partial<TimeDeposit>) => void;
}

export default function TimeDepositForm({ onChange }: Props) {
  const form = useForm<Partial<TimeDeposit>>({
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
        label="이율 (%)"
        suffix="%"
        {...form.getInputProps("interestRate")}
      />
    </form>
  );
}
