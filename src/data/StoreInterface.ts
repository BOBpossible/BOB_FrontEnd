// 가게 정보 인터페이스

export type StoreInterface = {
  storeId: number;
  name: string;
  rate: number;
  distance: number;
  category: string;
  point?: number;
};
