//Create Interface type for Registration Form

export type RegisterInterface = {
  overAge14: boolean;
  serviceContract: boolean;
  privacyContract: boolean;
  locationContract: boolean;
  marketingContract: boolean;
  name: string;
  gender: number;
  birthDate: Date | null;
  address: string;
  category: {};
};
