import { FinTimeSegment } from "./finTimeSegment";
import type { Format } from "./format";

export type FinRow = {
  id: string;
  name: string;
  order: number;
  format: Format;
  modelId: string;
  timeSegments: FinTimeSegment[];
};
