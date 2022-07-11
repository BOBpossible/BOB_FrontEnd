import {customAxios} from './customAxios';

export const getStoreData = async (storeId?: number) => {
  const response = await customAxios().get(`/api/v1/stores/${storeId}`);
  return response.data.result;
};

export const getStoreReviewImages = async ({pageParam = 0}, storeId?: number) => {
  const response = await customAxios().get(`/api/v1/reviews/images/${storeId}`, {
    params: {page: pageParam, size: 3},
  });
  return response;
};

export const getStoreReviewList = async ({pageParam = 0}, storeId?: number) => {
  const response = await customAxios().get(`/api/v1/reviews/${storeId}`, {
    params: {page: pageParam, size: 3},
  });
  return response;
};
