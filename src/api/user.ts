import {customAxios} from './customAxios';

export const getUserInfo = async () => {
  const {data} = await customAxios().get('/api/v1/users/me');
  return data.result;
};

export const patchUserInfo = async (data: {name: string; email: string}) => {
  const response = await customAxios().patch('/api/v1/users/me', data);
  return response.data;
};

export const getCategoryList = async () => {
  const {data} = await customAxios().get('/api/v1/categories');
  return data.result;
};

export const getUserCategory = async () => {
  const {data} = await customAxios().get('/api/v1/member-categories/me');
  return data.result;
};

export const postAddCategory = async (selectedCategories: number[]) => {
  const categoriesParams = {favorites: selectedCategories.join(',')};
  const response = await customAxios().post('/api/v1/member-categories', null, {
    params: categoriesParams,
  });
  return response.data;
};

export const patchDeleteCategory = async (categoryId: number) => {
  const response = await customAxios().patch(`/api/v1/member-categories/status/${categoryId}`);
  return response.data;
};
