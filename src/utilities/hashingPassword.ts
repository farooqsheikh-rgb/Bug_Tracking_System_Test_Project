import bcrypt from "bcrypt";

const hashingPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export default hashingPassword;
