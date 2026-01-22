// "00002359" 오픈 시간 데이터 "00:00 - 23:59"로 변경하는 함수
export const formatBusinessHours = (time: string | undefined) => {
  const startHour = time?.slice(0, 2);
  const startMinute = time?.slice(2, 4);
  const endHour = time?.slice(4, 6);
  const endMinute = time?.slice(6, 8);
  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};
