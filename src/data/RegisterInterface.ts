//Create Interface type for Registration Form

export type RegisterInterface = {
  overAge14: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  locationInfo: boolean;
  marketing: boolean;
  name: string;
  gender: string;
  birthDate: string;
  addressDetail: string;
  addressStreet: string;
  category: {};
};
