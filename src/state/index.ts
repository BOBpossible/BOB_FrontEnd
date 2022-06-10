import {atom} from 'recoil';

export const userToken = atom({
  key: 'userToken',
  default: '',
});
