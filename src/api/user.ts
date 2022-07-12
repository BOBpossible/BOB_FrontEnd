import {customAxios} from './customAxios';

export const getUserInfo = async () => {
  const {data} = await customAxios().get('/api/v1/users/me');
  return data.result;
};
