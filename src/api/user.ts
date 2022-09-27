import {customAxios} from './customAxios';

export const getUserInfo = async () => {
  const {data} = await customAxios().get('/api/v1/users/me');
  return data.result;
};

export const getCategoryList = async () => {
  const {data} = await customAxios().get('/api/v1/categories');
  return data.result;
};

export const getUserCategory = async () => {
  const {data} = await customAxios().get('/api/v1/member-categories/me');
  return data.result;
};
