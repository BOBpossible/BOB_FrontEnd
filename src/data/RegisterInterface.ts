//Create Interface type for Registration Form
enum gender {
  'male' = 0,
  'female',
  'null',
}

export type RegisterInterface = {
  overAge14: boolean;
  serviceContract: boolean;
  privacyContract: boolean;
  locationContract: boolean;
  marketingContract: boolean;
  name: string;
  gender: gender;
  birthDate: Date;
  address: string;
  category: number[];
};
