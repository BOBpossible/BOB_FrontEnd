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
