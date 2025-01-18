import dayjs from "dayjs";
import type { FinRow } from "../models/finRow";
import type { FinTimeSegment } from "../models/finTimeSegment";
import type { YearMonth } from "../models/timeRange";
import { last } from "es-toolkit";

export class TimeSegmentPolicy {
  /**
   * @description
   * finRow가 row 정보, currentMonth가 col 정보로
   * 각 row,col에 timeSegment 정책에 따라 적용된 finFormula를 찾는 함수 */
  getAppliedTimeSegmentInCell = (
    finRow: FinRow,
    currentYearMonth: YearMonth
  ): FinTimeSegment | null => {
    const timeSegment = last(
      finRow.timeSegments.filter((ts) => {
        const isIncludeInTimeSegment =
          (dayjs(currentYearMonth).isSame(ts.timeRange[0]) ||
            dayjs(currentYearMonth).isAfter(ts.timeRange[0])) &&
          (dayjs(currentYearMonth).isSame(ts.timeRange[1]) ||
            dayjs(currentYearMonth).isBefore(ts.timeRange[1]));

        return isIncludeInTimeSegment;
      })
    );

    return timeSegment ?? null;
  };
}

export default new TimeSegmentPolicy();
