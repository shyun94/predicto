import { FinDriver, FinModel } from "@repo/fin-core";
import DriverCard from "./DriverCard";
import { Button, Flex, Stack, Title } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

interface Props {
  model: FinModel;
  drivers: FinDriver[];
  onAddDriver: (driver: FinDriver) => void;
  onUpdateDriver?: (updatedDriver: FinDriver) => void;
}

export default function DriverArea({
  model,
  drivers,
  onAddDriver,
  onUpdateDriver,
}: Props) {
  const handleUpdateDriver = (updatedDriver: FinDriver) => {
    if (onUpdateDriver) {
      onUpdateDriver(updatedDriver);
    }
  };

  return (
    <Flex direction="column" gap="md" w="300px">
      <Title order={3} mb="md">
        Drivers
      </Title>
      <Stack mb="sm">
        {drivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            onUpdate={handleUpdateDriver}
          />
        ))}
        <Button
          onClick={() =>
            onAddDriver({
              id: uuidv4(),
              name: "",
              value: "",
              format: { type: "number" },
              modelId: model.id,
              order: drivers.length,
            })
          }
        >
          드라이버 추가
        </Button>
      </Stack>
    </Flex>
  );
}
