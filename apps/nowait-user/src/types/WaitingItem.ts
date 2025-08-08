export interface WaitingItem {
  id: number;
  number: number;
  storeName: number;
  waitingCount: number;
  departmentName: string;
  category: string;
  people: number;
  date: string;
  location: string;
  imageUrl: string;
  departmentId?: number; // 홈페이지에서 사용하는 departmentId 추가
}
