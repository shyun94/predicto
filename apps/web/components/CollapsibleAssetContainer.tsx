import { ActionIcon, Box, Collapse, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function CollapsibleAssetContainer({ title, children }: Props) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Flex direction={"column"}>
      <Flex gap={"xs"} align={"center"}>
        <ActionIcon variant="default" onClick={toggle}>
          {opened ? <IconCaretDownFilled /> : <IconCaretDownFilled />}
        </ActionIcon>
        <Text>{title}</Text>
      </Flex>
      <Collapse
        in={opened}
        transitionDuration={100}
        transitionTimingFunction="linear"
      >
        <Box p={"md"}>{children}</Box>
      </Collapse>
    </Flex>
  );
}
