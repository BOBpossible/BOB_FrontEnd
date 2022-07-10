import {customAxios} from './customAxios';

export const getStoreData = async (storeId?: number) => {
  const response = await customAxios().get(`/api/v1/stores/${storeId}`);
  return response.data.result;
};

export const getStoreReviewImages = async (storeId?: number, pageParam = 1) => {
  const response = await customAxios().get(`/api/v1/reviews/images/${storeId}`, {
    params: {page: pageParam, size: 3},
  });
  const processedResponse = {
    content: response.data.result.content,
    last: response.data.result.last,
  };
  return processedResponse;
};
