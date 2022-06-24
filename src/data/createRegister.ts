import {RegisterInterface} from './RegisterInterface';

export const createRegister = (): RegisterInterface => {
  return {
    overAge14: false,
    termsOfService: false,
    privacyPolicy: false,
    locationInfo: false,
    marketing: false,
    name: '',
    gender: '',
    birthDate: '',
    addressStreet: '',
    addressDong: '',
    phone: '',
    x: '',
    y: '',
  };
};
