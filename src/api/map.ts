import {customAxios} from './customAxios';

export const getStoreList = async (userId?: number) => {
  const response = await customAxios().get(`/api/v1/map/stores/${userId}`);
  return response.data.result;
};

export const getSuggestion = async (searchText: string) => {
  const response = await customAxios().get('/api/v1/search/suggestion', {
    params: {keyword: searchText},
  });
  return response.data.result;
};

export const getSearchKeyword = async (searchText: string, userId: number) => {
  const response = await customAxios().get(`/api/v1/search/${userId}`, {
    params: {keyword: searchText},
  });
  return response.data.result;
};

export const getSearchCategory = async (userId: number, categoryId: number) => {
  const response = await customAxios().get(`/api/v1/search/tag/${userId}/${categoryId}`);
  return response.data.result;
};
export const getCategories = async () => {
  const response = await customAxios().get('/api/v1/categories');
  return response.data.result;
};
