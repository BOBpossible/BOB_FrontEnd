import {atom} from 'recoil';

export const userToken = atom({
  key: 'userToken',
  default: '',
});

export const photoIndex = atom({
  key: 'photoIndex',
  default: 0,
});

export const missionPage = atom({
  key: 'missionPage',
  default: true,
});

export const history = atom<string[]>({
  key: 'history',
  default: [],
});
