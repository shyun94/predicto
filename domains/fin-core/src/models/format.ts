type NumericFormatType = "percent" | "currency" | "number";
export type FormatType = "text" | NumericFormatType;

export type Format = {
  type: FormatType;
  // options?: numbro.Format;
};
