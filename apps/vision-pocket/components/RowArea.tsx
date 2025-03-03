import { FinRow } from "@repo/fin-core";

interface Props {
  rows: FinRow[];
  onAddRow: (row: FinRow) => void;
}

export default function RowArea({ rows, onAddRow }: Props) {
  return <div>RowArea</div>;
}
