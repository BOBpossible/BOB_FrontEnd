//현재 진행중인 미션 타입
export type IMissionsProgress = {
  mission: string;
  missionId: number;
  missionStatus: string; ///NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
};
