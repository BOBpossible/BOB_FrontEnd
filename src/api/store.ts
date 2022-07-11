import {customAxios} from './customAxios';

//storeId로 가게 상세 정보 조회
export const getStores = async (storeId: number) => {
  const {data} = await customAxios().get(`/api/v1/stores/${storeId}`);
  return data.result;
};
//마이페이지 - 나의 포인트 내역 조회
export const getPointsList = async ({pageParam = 0}) => {
  const response = await customAxios().get('/api/v1/points/list/me', {
    params: {
      page: pageParam,
      size: 5,
    },
  });
  return response;
};
