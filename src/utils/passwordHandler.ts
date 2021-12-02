import bcrypt from 'bcryptjs';

const hashPassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(pw, salt);
  return hashedPassword;
};

const comparePassword = async (candidatePassword: string, hashedPassword: string): Promise<boolean> => {
  const comparedPassword = await bcrypt.compare(candidatePassword, hashedPassword);
  return comparedPassword;
};

export { hashPassword, comparePassword };
