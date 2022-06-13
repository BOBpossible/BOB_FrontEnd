import {RegisterInterface} from './RegisterInterface';

export const createRegister = (): RegisterInterface => {
  return {
    overAge14: false,
    termsOfService: false,
    privacyPolicy: false,
    locationInfo: false,
    marketing: false,
    name: '',
    gender: 'NULL',
    birthDate: '',
    addressStreet: '',
    addressDetail: '',
    category: {},
  };
};
