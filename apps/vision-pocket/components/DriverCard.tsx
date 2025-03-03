import { FinDriver } from "@repo/fin-core";
import { useState } from "react";
import { Card, Flex, Text } from "@mantine/core";
import EditableText from "./EditableText";

interface Props {
  driver: FinDriver;
  onUpdate?: (updatedDriver: FinDriver) => void;
}

export default function DriverCard({ driver, onUpdate }: Props) {
  const [name, setName] = useState(driver.name);
  const [value, setValue] = useState(driver.value);

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (onUpdate) {
      onUpdate({
        ...driver,
        name: newName,
      });
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onUpdate) {
      onUpdate({
        ...driver,
        value: newValue,
      });
    }
  };

  return (
    <Card shadow="xs" padding="xs" radius="sm" withBorder mb="xs" __size="xs">
      <Flex align="center" mb="xs" gap="xs">
        <Text size="xs" fw={500} style={{ width: "40px" }}>
          이름:
        </Text>
        <EditableText
          value={name}
          onChange={handleNameChange}
          placeholder="(이름 없음)"
          style={{ fontSize: "12px" }}
        />
      </Flex>
      <Flex align="center" gap="xs">
        <Text size="xs" fw={500} style={{ width: "40px" }}>
          값:
        </Text>
        <EditableText
          value={value}
          onChange={handleValueChange}
          placeholder="(값 없음)"
          style={{ fontSize: "12px" }}
        />
      </Flex>
    </Card>
  );
}
