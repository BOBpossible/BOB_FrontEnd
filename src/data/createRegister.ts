import {RegisterInterface, gender} from './RegisterInterface';

export const createRegister = (): RegisterInterface => {
  return {
    overAge14: false,
    serviceContract: false,
    privacyContract: false,
    locationContract: false,
    marketingContract: false,
    name: '',
    gender: gender.notSelected,
    birthDate: null,
    address: '',
    category: [],
  };
};
