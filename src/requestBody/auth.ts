export interface Register {
  username: string;
  email: string;
  password: string;
}

export interface RegisterSave {
  otp: string;
}

export interface RequestBodyLogin {
  email: string;
  password: string;
}
