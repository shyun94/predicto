import { TimeRange } from "@repo/fin-core";

/** @description 적금 */
export type RecurringDeposit = {
  id: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

/** @description 예금 */
export type TimeDeposit = {
  id: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

/** @description 대출 */
export type Loan = {
  id: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

/** @description 주식 */
export type Stock = {
  id: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};
