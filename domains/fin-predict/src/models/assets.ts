import { TimeRange } from "@repo/fin-core";

export type RecurringDeposit = {
  id: string;
  name: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

export type TimeDeposit = {
  id: string;
  name: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

export type Loan = {
  id: string;
  name: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};

export type Stock = {
  id: string;
  name: string;
  timeRange: TimeRange;
  amount: number;
  interestRate: number;
};
