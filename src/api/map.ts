import {customAxios} from './customAxios';

export const getStoreList = async (userId?: number) => {
  const response = await customAxios().get(`/api/v1/map/stores/${userId}`);
  return response.data.result;
};
