export interface IInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IInfoSend extends IInfo {
  companyName: string;
  streetAddress: string;
  additionalInfo: string;
}
