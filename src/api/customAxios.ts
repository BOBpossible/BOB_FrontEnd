import axios, {AxiosInstance} from 'axios';

export const customAxios = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: 'https://bobpossible.shop/api/v1/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
