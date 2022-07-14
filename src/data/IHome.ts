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

export type IHomeMissionDetail = {
  addressDetail: string;
  addressStreet: string;
  category: string;
  images: {imageUrl: string}[];
  mission: string;
  missionId: number;
  name: string;
  point: number;
  storeId: number;
};

//알림
export type INotiType = {
  checked: boolean;
  date: string;
  id: number;
  pushType: string;
  storeName: string;
  subTitle: string;
  title: string;
};
