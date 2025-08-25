// 1. 은행 확인
// 2. 계좌번호 길이 확인
// 3. 짝대기 추가

const format: Record<string, number[]> = {
  IBK기업: [3, 6, 2],
  국민은행: [6, 2],
  신한은행: [3, 3],
  하나은행: [3, 6],
  농협은행: [6, 2],
  우리은행: [4, 3],
};

// 계좌번호에 - 붙이는 함수
export const accountFormat = (bank: string, accountNumber: string) => {
  // 은행 확인하고 없으면 - 없는 계좌 번호 리턴
  const rule = format[bank];
  if (!rule) return accountNumber;
  let result = [];
  let start = 0;
  //은행 포맷에 맞게 - 추가
  for (let i = 0; i < rule.length; i++) {
    const end = start + rule[i];
    const number = accountNumber.slice(start, end);
    result.push(number);
    start = end;
  }
  return result.join("-");
};
