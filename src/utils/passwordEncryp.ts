import bcrypt from 'bcryptjs';

const hash = async (pw: string) => {
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(pw, salt);
	return hashedPassword;
};

const correctPassword = async (candidatePassword: string, hashedPassword: string) => {
	const comparePassword = await bcrypt.compare(candidatePassword, hashedPassword);
	return comparePassword;
};

export { hash, correctPassword };
