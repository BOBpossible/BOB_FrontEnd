import {customAxios} from './customAxios';

export const getStoreList = async (userId?: number) => {
  const response = await customAxios().get(`/api/v1/map/stores/${userId}`);
  return response.data.result;
};

export const postSuggestion = async (searchText: string) => {
  const response = await customAxios().post('/api/v1/search/suggestion', null, {
    params: {keyword: searchText},
  });
  return response.data.result;
};
