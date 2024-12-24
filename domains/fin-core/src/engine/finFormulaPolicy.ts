class FinFormulaPolicy {
  rowRegex = /\{\{([0-9,a-z,-]+)\,x((\+|\-|\*)[-]?\d+)?\}\}/g;
  driverRegex = /\{\{([0-9,a-z,-]+)\}\}/g;

  canExtractRowInfoFrom(finFormula: string) {
    const rowRegex = new RegExp(this.rowRegex);
    return Boolean(finFormula.match(rowRegex));
  }

  extractRowInfoFrom(finFormula: string) {
    const rowRegex = new RegExp(this.rowRegex);
    const matches = rowRegex.exec(finFormula);

    if (!matches) {
      throw Error(
        "rowRegex.exec(finFormula) is null. you should check canExtractRowInfoFrom before calling this function"
      );
    }

    const [fullMatch, rowId, offsetString = ""] = matches as unknown as [
      string,
      string,
      string,
    ];

    return {
      fullMatch,
      rowId,
      offsetString,
    };
  }

  canExtractDriverInfoFrom(finFormula: string) {
    const driverRegex = new RegExp(this.driverRegex);
    return finFormula.match(driverRegex);
  }

  extractDriverInfoFrom(finFormula: string) {
    const driverRegex = new RegExp(this.driverRegex);
    const matches = driverRegex.exec(finFormula);

    if (!matches) {
      throw Error(
        "driverRegex.exec(finFormula) is null. you should check canExtractDriverInfoFrom before calling this function"
      );
    }

    const [fullMatch, driverId] = matches as unknown as [string, string];

    return {
      fullMatch,
      driverId,
    };
  }
}

export default new FinFormulaPolicy();
