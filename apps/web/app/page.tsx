"use client";
import { useShape } from "@electric-sql/react";

function Component() {
  const { data } = useShape({
    url: `http://localhost:3000/shape-proxy`,
    params: {
      table: `foo`,
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Component;
