import {customAxios} from './customAxios';

//storeId로 가게 상세 정보 조회
export const getStores = async (storeId: number) => {
  const {data} = await customAxios().get(`/api/v1/stores/${storeId}`);
  return data.result;
};
