//Create Interface type for Registration Form
export enum gender {
  'male' = 0,
  'female',
  'null',
  'notSelected',
}

export type RegisterInterface = {
  overAge14: boolean;
  serviceContract: boolean;
  privacyContract: boolean;
  locationContract: boolean;
  marketingContract: boolean;
  name: string;
  gender: gender;
  birthDate: Date | null;
  address: string;
  category: {};
};
