import type { TimeRange } from "./timeRange";

export interface FinModel {
  id: string;
  name: string;
  createdById: string;
  timeRange: TimeRange;
  createdAt: Date;
}
