import {IAddress} from '../data/Common';
import {customAxios} from './customAxios';

export const getAddress = async () => {
  const response = await customAxios().get('/api/v1/users/me/address');
  return response.data;
};

export const patchAddress = async (address: IAddress) => {
  const response = await customAxios().patch('/api/v1/users/me/address', address);
  return response.data;
};
