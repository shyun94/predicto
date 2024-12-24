import dayjs = require("dayjs");
import type { FinRow } from "../models/finRow";
import type { FinTimeSegment } from "../models/finTimeSegment";
import type { YearMonth } from "../models/timeRange";
import { findLast } from "lodash-es";

export class TimeSegmentPolicy {
  /**
   * @description
   * finRow가 row 정보, currentMonth가 col 정보로
   * 각 row,col에 timeSegment 정책에 따라 적용된 finFormula를 찾는 함수 */
  getAppliedTimeSegmentInCell = (
    finRow: FinRow,
    currentYearMonth: YearMonth
  ): FinTimeSegment | null => {
    const timeSegment = findLast(finRow.timeSegments, (ts) => {
      const isIncludeInTimeSegment =
        !dayjs(currentYearMonth).isBefore(ts.timeRange.startYearMonth) &&
        !dayjs(currentYearMonth).isAfter(ts.timeRange.endYearMonth);
      // getYearMonthUtil(currentYearMonth).isSameOrAfter(
      //   ts.timeRange.startYearMonth
      // ) &&
      // getYearMonthUtil(currentYearMonth).isSameOrBefore(
      //   ts.timeRange.endYearMonth
      // );

      return isIncludeInTimeSegment;
    });

    return timeSegment ?? null;
  };
}

export default new TimeSegmentPolicy();
