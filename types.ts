export type ContactType = {
  id: string;
  name: string;
  phone: string;
  country: string;
  capital: string;
  time: string;
};

export type PhoneValidation = {
  is_valid: boolean;
  country: string;
};
