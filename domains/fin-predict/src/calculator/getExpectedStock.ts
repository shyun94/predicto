import { Stock } from "../models/assets";

interface Params {
  stock: Stock;
  afterYear: number;
}

export default function getExpectedStock({ stock, afterYear }: Params): {
  totalProfit: number;
  additionalInvestmentAmount: number;
  initialInvestmentAmount: number;
  total: number;
} {
  // 연이율을 소수점으로 변환 (예: 10% -> 0.1)
  const annualRate = stock.interestRate / 100;

  // 연이율을 월이율로 변환
  const monthlyRate = annualRate / 12;
  const totalMonths = afterYear * 12;

  // BigInt로 계산하기 위해 소수점 6자리까지 정확도 유지
  const DECIMAL_PRECISION = 1_000_000n;

  // 초기 투자금을 BigInt로 변환
  const initialAmount = BigInt(
    Math.round(stock.amount * Number(DECIMAL_PRECISION))
  );

  // 매월 투자금을 BigInt로 변환
  const monthlyAmount = BigInt(
    Math.round(stock.recurringAmount * Number(DECIMAL_PRECISION))
  );

  // 월 수익률을 BigInt로 변환
  const monthlyRateBigInt = BigInt(
    Math.round(monthlyRate * Number(DECIMAL_PRECISION))
  );

  // 초기 투자금의 최종 가치 계산
  let initialFinalValue = initialAmount;
  for (let i = 0; i < totalMonths; i++) {
    initialFinalValue =
      initialFinalValue +
      (initialFinalValue * monthlyRateBigInt) / DECIMAL_PRECISION;
  }

  // 매월 추가 투자금의 최종 가치 계산
  let additionalFinalValue = 0n;
  for (let i = 0; i < totalMonths; i++) {
    let monthlyValue = monthlyAmount;
    for (let j = 0; j < totalMonths - i; j++) {
      monthlyValue =
        monthlyValue + (monthlyValue * monthlyRateBigInt) / DECIMAL_PRECISION;
    }
    additionalFinalValue += monthlyValue;
  }

  // BigInt를 다시 number로 변환하고 정확도 조정
  const initialFinal = Number(initialFinalValue) / Number(DECIMAL_PRECISION);
  const additionalFinal =
    Number(additionalFinalValue) / Number(DECIMAL_PRECISION);

  // 총 투자금 계산
  const totalInvestment = stock.amount + stock.recurringAmount * totalMonths;

  return {
    totalProfit: initialFinal + additionalFinal - totalInvestment,
    additionalInvestmentAmount: stock.recurringAmount * totalMonths,
    initialInvestmentAmount: stock.amount,
    total: initialFinal + additionalFinal,
  };
}
