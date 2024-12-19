"use client";
import { useShape } from "@electric-sql/react";

function Component() {
  const { data } = useShape({
    url: `http://localhost:3001/v1/shape`,
    params: {
      table: `foo`,
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Component;
