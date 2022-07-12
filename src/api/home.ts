import {customAxios} from './customAxios';

export const getHomeInfo = async () => {
  const response = await customAxios().get('/api/v1/missions/me');
  return response.data.result;
};

export const getHomeMissionDetail = async (missionId: number) => {
  const response = await customAxios().get(`/api/v1/map/mission/${missionId}`);
  return response.data.result;
};

export const patchHomeMissionChallenge = async (missionId: number) => {
  const response = await customAxios().patch(`/api/v1/missions/challenge/${missionId}`);
  return response.data.message;
};
