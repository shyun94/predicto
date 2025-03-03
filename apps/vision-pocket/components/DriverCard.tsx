import { FinDriver } from "@repo/fin-core";
import { useState } from "react";
import { Card, Flex } from "@mantine/core";
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
    <Card shadow="sm" padding="md" radius="md" withBorder mb="sm">
      <Flex align="center" mb="xs">
        <strong style={{ width: "50px" }}>이름:</strong>
        <EditableText
          value={name}
          onChange={handleNameChange}
          placeholder="(이름 없음)"
        />
      </Flex>
      <Flex align="center">
        <strong style={{ width: "50px" }}>값:</strong>
        <EditableText
          value={value}
          onChange={handleValueChange}
          placeholder="(값 없음)"
        />
      </Flex>
    </Card>
  );
}
