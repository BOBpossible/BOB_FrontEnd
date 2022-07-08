import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem('accessToken');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('refreshToken');
    if (value !== null) {
      console.log(value);
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const customAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: 'https://bobpossible.shop',
  });

  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = await getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      // 요청 시 에러 처리
      return Promise.reject(error);
    },
  );

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
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const originalRequest = config;
        // token refresh 요청
        const {data} = await axios.post(
          'https://bobpossible.shop/auth/token', // token refresh api
          null,
          {params: {accessToken: accessToken, refreshToken: refreshToken}},
        );
        // 새로운 토큰 저장
        console.log('토큰이 만료 되어 토큰 갱신한 데이터: ', data);
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
