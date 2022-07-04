export type MissionInterface = {
  storeName: string;
  storeCategory: string;
  missionContent: string;
  point: number;
  menuImage: {uri: string}[] | null;
};

export const createMission = (): MissionInterface => {
  return {
    storeName: '밥풀이네 식당',
    storeCategory: '밥',
    missionContent: '밥플레이스로',
    point: 500,
    menuImage: null,
  };
};
