import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const customAxios = (token?: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: 'https://bobpossible.shop',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: {status},
      } = error;
      if (status === 401) {
        const originalRequest = config;
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const AccessToken = await AsyncStorage.getItem('AccessToken');
        // token refresh 요청
        const {data} = await axios.post(
          `https://bobpossible.shop/auth/token`, // token refresh api
          null,
          {params: {accessToken: AccessToken, refreshToken: refreshToken}},
        );
        // 새로운 토큰 저장
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = data;
        await AsyncStorage.multiSet([
          ['accessToken', newAccessToken],
          ['refreshToken', newRefreshToken],
        ]);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
