import {customAxios} from './customAxios';

//마이페이지 - 유저 정보
export const getUserInfo = async () => {
  const {data} = await customAxios().get('/api/v1/users/me');
  return data.result;
};

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

export const getQuestionDetail = async (questionId: number) => {
  const response = await customAxios().get(`/api/v1/questions/${questionId}`);
  return response.data.result;
};

//포인트 전환
export const postPointsConvert = async (data: {
  accountNumber: number;
  bank: string;
  name: string;
  point: number;
}) => {
  const response = await customAxios().post('/api/v1/points-conversion/me', data);
  return response.data;
};

//회원탈퇴
export const patchQuit = async () => {
  const response = await customAxios().patch('/api/v1/users/me/quit');
  console.log('탈퇴토티퉤퇴텥티퉤퉤토티퉤', response);
  return response.data;
};
