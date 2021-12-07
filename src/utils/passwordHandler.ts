import bcrypt from 'bcryptjs';
import logger from 'config/winston';

const hashPassword = async (pw: string) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(pw, salt);
    return hashedPassword;
  } catch (error) {
    logger.error((error as Error).message);
    return false;
  }
};

const comparePassword = async (candidatePassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    if (await bcrypt.compare(candidatePassword, hashedPassword)) {
      return true;
    }
    return false;
  } catch (error) {
    logger.error((error as Error).message);
    return false;
  }
};

export { hashPassword, comparePassword };
