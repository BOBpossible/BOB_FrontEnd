import {customAxios} from './customAxios';

//맵 탭 - 현재 진행중인 미션 조회
export const getMissionsProgress = async () => {
  const {data} = await customAxios().get('/api/v1/missions/me/progress');
  //   console.log('GotData', data); //message에 ["요청에 성공"] 떠야함
  return data.result;
};
