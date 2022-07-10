import {customAxios} from './customAxios';

//맵 탭 - 현재 진행중인 미션 조회
export const getMissionsProgress = async () => {
  const {data} = await customAxios().get('/api/v1/missions/me/progress');
  //   console.log('GotData', data); //message에 ["요청에 성공"] 떠야함
  return data.result;
};
export const getMissionsComplete = async () => {
  const {response} = await customAxios().get('/api/v1/missions/me/complete');
  return response.result;
};
export const patchMissionCancel = async (missionId: number) => {
  const response = await customAxios().patch(`/api/v1/missions/challenge/${missionId}`);
  return response.data.message;
};
