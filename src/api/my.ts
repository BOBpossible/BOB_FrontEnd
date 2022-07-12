import {customAxios} from './customAxios';

// 마이페이지 - 알림 설정 조회
export const getNotifications = async () => {
  const response = await customAxios().get('/api/v1/users/me/notification');
  return response.data.result;
};

//마이페이지 - 알림 설정 수정
export const patchNotifications = async (data: {
  event: boolean;
  review: boolean;
  question: boolean;
}) => {
  const response = await customAxios().patch('/api/v1/users/me/notification', data);
  return response.data;
};
