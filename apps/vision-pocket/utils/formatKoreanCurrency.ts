export default function formatKoreanCurrency(amount: number) {
  if (isNaN(amount) || amount < 0) return "유효한 금액을 입력하세요.";

  const units = [
    { value: 100000000, label: "억" },
    { value: 10000, label: "만" },
    { value: 1000, label: "천" },
    { value: 100, label: "백" },
    { value: 10, label: "십" },
    { value: 1, label: "" },
  ];

  let result = "";

  for (const unit of units) {
    const unitAmount = Math.floor(amount / unit.value);
    if (unitAmount > 0) {
      result += `${unitAmount}${unit.label} `;
      amount %= unit.value;
    }
  }

  return result.trim() + "원";
}
