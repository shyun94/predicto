import type { TimeRange } from "./timeRange";

export interface FinTimeSegment {
  id: string;
  formula: string;
  timeRange: TimeRange;
  rowId: string;
  order: number;
}
