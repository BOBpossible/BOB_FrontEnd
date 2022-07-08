import {customAxios} from './customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  const accesstoken = await AsyncStorage.getItem('accessToken');
  return accesstoken;
};

const getRefreshToken = async () => {
  const refreshtoken = await AsyncStorage.getItem('refreshToken');
  return refreshtoken;
};

export const postToken = async () => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  console.log('엑세스 토큰: ', accessToken);
  console.log('리프레시 토큰: ', refreshToken);
  try {
    const response = await customAxios().post('/auth/token', null, {
      params: {accessToken: accessToken, refreshToken: refreshToken},
    });
    console.log('리프레시 토큰 응답: ', response);
    await AsyncStorage.multiSet([
      ['accessToken', response.data.result.accessToken],
      ['refreshToken', response.data.result.refreshToken],
    ]);
    console.log('리프레시 토큰 성공: ', response);
    return response;
  } catch (error) {
    console.log('토큰 리프레시 갱신 에러: ', error);
  }
};

//유저가 앱을 킬때 스플래시화면에서 token이 asyncStorage에 있다면 회원가입 완료 인지 아닌지 확인 해주는 api
export const getRegisterStatus = async () => {
  try {
    const response = await customAxios().get('/api/v1/users/me/register-status');
    return response.data.result.registerStatus;
  } catch (error) {
    console.log('register Status', error);
  }
};
