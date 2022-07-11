import {Platform} from 'react-native';
import {customAxios} from './customAxios';

type imageData = {
  uri: string;
  type: string;
  name: string;
};
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

export const postReview = async (data: {storeId: number; rate: number; content: string}) => {
  const response = await customAxios().post('https://bobpossible.shop/api/v1/reviews/me', data);
  return response.data.result;
};

export const postReviewImages = async (imageList: imageData[], reviewId: number) => {
  var formdata = new FormData();
  imageList.map((image) => {
    let photo;
    Platform.OS === 'ios'
      ? (photo = {
          uri: image.uri.replace('file://', ''),
          type: 'image/jpg',
          name: 'image',
        })
      : (photo = {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'image',
        });
    formdata.append('reviewImage', photo);
  });
  // const response = await fetch('https://bobpossible.shop/api/v1/reviews/me/images/1', {
  //   method: 'POST',
  //   headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'},
  //   body: formdata,
  // });
  const response = await customAxios().post(`/api/v1/reviews/me/images/${reviewId}`, formdata, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response;
};
