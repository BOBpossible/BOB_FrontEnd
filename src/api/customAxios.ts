import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = AsyncStorage.getItem('userToken');

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'https://bobpossible.shop/api/v1/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
