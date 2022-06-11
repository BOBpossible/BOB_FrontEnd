import {atom} from 'recoil';

export const userToken = atom({
  key: 'userToken',
  default: '',
});

export const addressStreet = atom({
  key: 'addressStreet',
  default: '',
});
