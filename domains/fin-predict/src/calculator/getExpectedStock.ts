import { Stock } from "../models/assets";

interface Params {
  stock: Stock;
  afterYear: number;
}

export default function getExpectedStock({ stock, afterYear }: Params): number {
  const { amount, recurringAmount, interestRate } = stock;
  const rate = BigInt(Math.round(interestRate * 100)); // Convert to integer to avoid floating-point issues
  const scale = BigInt(10000); // Scaling factor for precision

  // Future Value of the initial investment
  const futureValueInitial =
    (BigInt(amount) * pow(BigInt(10000) + rate, afterYear)) /
    pow(scale, afterYear);

  // Future Value of a series of recurring contributions (ordinary annuity)
  let futureValueRecurring = BigInt(0);
  for (let year = 1; year <= afterYear; year++) {
    futureValueRecurring +=
      (BigInt(recurringAmount) * pow(BigInt(10000) + rate, afterYear - year)) /
      pow(scale, afterYear - year);
  }

  // Total future value
  return Number(futureValueInitial + futureValueRecurring);
}

// Helper function for exponentiation with BigInt
function pow(base: bigint, exponent: number): bigint {
  let result = BigInt(1);
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result *= base;
    }
    base *= base;
    exponent = Math.floor(exponent / 2);
  }
  return result;
}
