import type { FinContents } from "./finFormulaTableManager";
import type { FinRow } from "../models/finRow";
import type { FinDriver } from "../models/finDriver";
import finFormulaPolicy from "./finFormulaPolicy";

class FinFormulaConverter {
  public convertFinFormulaToCellFormula(
    finFormula: string,
    colIndex: number,
    finContents: FinContents,
    finDriversSheetName: string
  ) {
    try {
      return this.convertWithRegex(
        finFormula,
        colIndex,
        finContents,
        finDriversSheetName
      );
    } catch (e) {
      if (e instanceof RefError) {
        return "#REF!";
      }
      throw e;
    }
  }

  private convertWithRegex(
    formula: string,
    colIndex: number,
    { rows, drivers }: FinContents,
    finDriversSheetName: string
  ): string {
    return this.convertDriversWithRegex(
      this.convertRowsWithRegex(formula, colIndex, rows),
      drivers,
      finDriversSheetName
    );
  }

  private convertRowsWithRegex(
    formula: string,
    colIndex: number,
    rows: FinRow[]
  ) {
    let newFormula = formula;
    while (finFormulaPolicy.canExtractRowInfoFrom(newFormula)) {
      const { fullMatch, rowId, offsetString } =
        finFormulaPolicy.extractRowInfoFrom(newFormula);

      const newCell = `${this.getColumnStringByOffset(
        colIndex,
        offsetString
      )}${this.getRowString(rowId, rows)}`;

      newFormula = newFormula.replace(fullMatch, newCell);
    }
    return newFormula;
  }

  private convertDriversWithRegex(
    formula: string,
    drivers: FinDriver[],
    driversSheetName: string
  ) {
    const preAddress = `'${driversSheetName}'!`;

    let newFormula = formula;
    while (finFormulaPolicy.canExtractDriverInfoFrom(newFormula)) {
      const { fullMatch, driverId } =
        finFormulaPolicy.extractDriverInfoFrom(newFormula);

      const newCell = `${preAddress}A${
        drivers.findIndex((driver) => driver.id === driverId) + 1
      }`;

      newFormula = newFormula.replace(fullMatch, newCell);
    }
    return newFormula;
  }

  private getColumnStringByOffset(colIndex: number, offsetString: string) {
    const operator = offsetString.match(/(\+|\-|\*)/)?.[0] ?? "+";
    const offset = parseInt(offsetString.replace(operator, "") || "0");
    const newCol =
      colIndex +
      (operator === "+"
        ? offset
        : operator === "-"
          ? -offset
          : colIndex * offset);

    return this.getColumnStringByColIndex(newCol + 1);
  }

  // A, B, ... AA, AB
  private getColumnStringByColIndex(colIndex: number): string {
    let columnName = "";
    while (colIndex > 0) {
      const remainder = (colIndex - 1) % 26;
      columnName = String.fromCharCode(65 + remainder) + columnName;
      colIndex = Math.floor((colIndex - 1) / 26);
    }

    if (columnName === "") throw new RefError();

    return columnName;
  }

  // convert Row Id to Row Index
  private getRowString(targetRowId: string, rows: FinRow[]): string {
    const targetRowIndex = rows.findIndex((row) => row.id === targetRowId) + 1;

    if (targetRowIndex === 0) throw new RefError();

    return targetRowIndex.toString();
  }
}

class RefError extends Error {
  constructor() {
    super("!REF error");
  }
}

export default new FinFormulaConverter();
