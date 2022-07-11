import {customAxios} from './customAxios';

//storeId로 가게 상세 정보 조회
export const getStores = async (storeId: number) => {
  const {data} = await customAxios().get(`/api/v1/stores/${storeId}`);
  return data.result;
};
//마이페이지 - 나의 포인트 내역 조회
export const getPointsList = async ({pageParam = 0}) => {
  const response = await customAxios().get('/api/v1/points/list/me', {
    params: {page: pageParam, size: 5},
  });
  return response;
};
//마이페이지 - 나의 리뷰 내역 조회
export const getReviewsMe = async ({pageParam = 0}) => {
  const {data} = await customAxios().get('/api/v1/reviews/me', {
    params: {page: pageParam, size: 5},
  });
  return data.result;
};
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
