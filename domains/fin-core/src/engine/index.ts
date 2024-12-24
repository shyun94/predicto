import type { FinRow } from "../models/finRow";
import finFormulaConverter from "./finFormulaConverter";
import { HyperFormula } from "hyperformula";
import type { FinModel } from "../models/finModel";
import timeSegmentPolicy from "./timeSegmentPolicy";
import type { FinDriver } from "../models/finDriver";
import type { YearMonth } from "../models/timeRange";
import dayjs = require("dayjs");

export type FinContents = { finRows: FinRow[]; finDrivers: FinDriver[] };

export default class FinFormulaTableManager {
  columnHeaders: YearMonth[];

  private hf: HyperFormula;
  private finRowsSheetId: number;
  private finDriversSheetId: number;
  private finDriversSheetName: string;
  private startYearMonth: YearMonth;
  private endYearMonth: YearMonth;

  constructor(finDriverBasedModel: FinModel) {
    const { hf, finRowsSheetId, finDriversSheetId, finDriversSheetName } =
      this.getInitializedHyperFormula(finDriverBasedModel);
    this.hf = hf;
    this.finRowsSheetId = finRowsSheetId;
    this.finDriversSheetId = finDriversSheetId;
    this.finDriversSheetName = finDriversSheetName;
    this.startYearMonth = finDriverBasedModel.timeRange.startYearMonth;
    this.endYearMonth = finDriverBasedModel.timeRange.endYearMonth;
    this.columnHeaders = this.getColumnHeaders();
  }

  setFinContents(finContents: FinContents) {
    this.hf.setSheetContent(
      this.finRowsSheetId,
      this.getCellFormulas(finContents)
    );
    this.hf.setSheetContent(
      this.finDriversSheetId,
      finContents.finDrivers.map((finDriver) => [finDriver.value])
    );
  }

  getCellValues(): string[][] {
    return this.hf
      .getSheetValues(this.finRowsSheetId)
      .map((row) => row.map((cell) => cell?.toString() ?? ""));
  }

  getAppliedTimeSegmentIds(finRows: FinRow[]): (string | null)[][] {
    return finRows.map((finRow) =>
      this.columnHeaders.map((currentMonth) => {
        const timeSegment = timeSegmentPolicy.getAppliedTimeSegmentInCell(
          finRow,
          currentMonth
        );
        return timeSegment?.id ?? null;
      })
    );
  }

  private getInitializedHyperFormula(finDriverBasedModel: FinModel) {
    const hf = HyperFormula.buildEmpty({
      precisionRounding: 10,
      licenseKey: "internal-use-in-handsontable",
    });

    const finRowsSheetId = hf.getSheetId(
      hf.addSheet(finDriverBasedModel.id + "-finRows")
    )!;

    const finDriversSheetName = finDriverBasedModel.id + "-finDrivers";

    const finDriversSheetId = hf.getSheetId(hf.addSheet(finDriversSheetName))!;

    return { hf, finRowsSheetId, finDriversSheetId, finDriversSheetName };
  }

  private getCellFormulas(finContents: FinContents): string[][] {
    const { finRows } = finContents;
    return finRows.map((finRow) =>
      this.columnHeaders.map((currentMonth) =>
        this.getCellFormula(finRow, currentMonth, finContents)
      )
    );
  }

  private getColumnHeaders() {
    const headers = [];
    let currentMonth = this.startYearMonth;

    while (
      dayjs(currentMonth).isSame(this.endYearMonth) ||
      dayjs(currentMonth).isBefore(this.endYearMonth)
    ) {
      headers.push(currentMonth);
      currentMonth = dayjs(currentMonth).add(1, "month").format("YYYY-MM");
    }

    return headers;
  }

  private getCellFormula(
    finRow: FinRow, // row
    currentMonth: YearMonth, // col
    finContents: FinContents
  ): string {
    return finFormulaConverter.convertFinFormulaToCellFormula(
      timeSegmentPolicy.getAppliedTimeSegmentInCell(finRow, currentMonth)
        ?.formula ?? "",
      dayjs(currentMonth).diff(this.startYearMonth, "M"),
      finContents,
      this.finDriversSheetName
    );
  }
}