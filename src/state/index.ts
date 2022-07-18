import {atom} from 'recoil';

export const userToken = atom({
  key: 'userToken',
  default: '',
});

export const openModal = atom({
  key: 'openModal',
  default: false,
});

export const missionPage = atom({
  key: 'missionPage',
  default: true,
});
