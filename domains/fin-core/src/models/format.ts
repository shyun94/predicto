type NumericFormatType = "percent" | "currency" | "number";
type TextFormatType = "text";
export type FormatType = TextFormatType | NumericFormatType;

export type Format = {
  type: FormatType;
  // options?: numbro.Format;
};
