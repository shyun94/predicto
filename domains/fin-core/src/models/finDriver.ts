import { Format } from "./format";

export interface FinDriver {
  id: string;
  name: string;
  value: string;
  format: Format;
  createdById: string;
  driverBasedModelId: string;
  order: number;
  createdAt: Date;
}
