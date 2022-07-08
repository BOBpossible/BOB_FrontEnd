import axios, {AxiosInstance} from 'axios';

export const customAxios = (token?: string, params?: {}): AxiosInstance => {
  console.log(params);
  if (token === undefined) {
    return axios.create({
      baseURL: 'https://bobpossible.shop',
    });
  } else {
    return axios.create({
      baseURL: 'https://bobpossible.shop',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
