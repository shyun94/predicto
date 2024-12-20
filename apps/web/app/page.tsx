"use client";
import { useShape } from "@electric-sql/react";

type Foo = {
  id: number;
  name: string;
  value: number;
};

function Component() {
  const { data } = useShape<Foo>({
    url: `http://localhost:3000/shape-proxy`,
    params: {
      table: `foo`,
    },
  });

  return <div>{data?.map((foo) => <div key={foo.id}>{foo.name}</div>)}</div>;
}

export default Component;
