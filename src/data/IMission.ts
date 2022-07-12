//현재 진행중인 미션 타입
export type IMissionsProgress = {
  mission: string;
  missionId: number;
  missionStatus: string; ///NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
};
export type IMissionCardProps = {
  mission?: string;
  missionId?: number;
  point?: number;
  storeCategory?: string;
  storeName?: string;
  missionStatus?: string; //"NEW","PROGRESS","OWNER_CHECK"
  onPressRequestBtn: () => void;
};
export type IMissionCardContentProps = {
  missionId?: number;
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};
export type IDataCompletedMissionsType = {
  dayOfWeek: string;
  mission: string;
  missionId: number;
  missionStatus: string; ///NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
  successDate: string;
};
