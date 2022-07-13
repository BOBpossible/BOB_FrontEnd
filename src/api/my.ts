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

//문의하기
export const postQuestions = async (data: {content: string; title: string}) => {
  const response = await customAxios().post('/api/v1/questions', data);
  return response.data;
};
//문의 내역 조회
export const getQuestions = async () => {
  const response = await customAxios().get('/api/v1/questions/me');
  return response.data.result;
};
