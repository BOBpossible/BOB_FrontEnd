//홈 화면에 나타나는 미션 카드 정보 (완료 전과 후 포함)
export type IHomeMission = {
  dayOfWeek: string;
  mission: string;
  missionId: number;
  missionStatus: string;
  point: number;
  storeCategory: string;
  storeId: number;
  storeName: string;
  successDate: string;
};

//홈 화면을 채워줄 모든 데이터들
export type IHomeData = {
  dday: number;
  missions: IHomeMission[];
  point: number;
  rewards: number;
};
