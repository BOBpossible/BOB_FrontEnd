import {atom} from 'recoil';

export const userToken = atom({
  key: 'userToken',
  default: '',
});

export const address = atom({
  key: 'address',
  default: {
    address: '',
    bname: '',
    x: '',
    y: '',
  },
});
