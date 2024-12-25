import { Format } from "./format";

export interface FinDriver {
  id: string;
  name: string;
  value: string;
  format: Format;
  modelId: string;
  order: number;
}
