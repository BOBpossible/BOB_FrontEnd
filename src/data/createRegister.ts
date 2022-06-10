import {RegisterInterface} from './RegisterInterface';

export const createRegister = (): RegisterInterface => {
  return {
    overAge14: false,
    serviceContract: false,
    privacyContract: false,
    locationContract: false,
    marketingContract: false,
    name: '',
    gender: 3,
    birthDate: null,
    address: '',
    category: [],
  };
};
