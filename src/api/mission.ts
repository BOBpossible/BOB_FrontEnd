import {customAxios} from './customAxios';

//맵 탭 - 현재 진행중인 미션 조회
export const getMissionsProgress = async () => {
  const {data} = await customAxios().get('/api/v1/missions/me/progress');
  return data.result;
};
export const getMissionsComplete = async () => {
  const response = await customAxios().get('/api/v1/missions/me/complete');
  return response.data.result;
};
export const patchMissionCancel = async (missionId: number) => {
  const response = await customAxios().patch(`/api/v1/missions/users/cancel/${missionId}`);
  return response.data.message;
};
//미션 성공요청
export const patchMissionSuccessRequest = async (missionId: number) => {
  const response = await customAxios().patch(`/api/v1/missions/users/success-request/${missionId}`);
  return response.data.message;
};
//미션 성공
export const patchMissionSuccess = async (missionId: number) => {
  const response = await customAxios().patch(`/api/v1/missions/success/${missionId}`);
  return response.data.message;
};
