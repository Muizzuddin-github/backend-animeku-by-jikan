const otpGenerator = (num: number = 6): string => {
  let otp: string = "";
  const n: string = "123456789";

  for (let i: number = 0; i < num; i++) {
    const index: number = Math.floor(Math.random() * 6);
    otp += n[index];
  }
  return otp;
};

export default otpGenerator;
