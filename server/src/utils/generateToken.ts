import jwt from "jsonwebtoken";

export const generateToken = (id: string, username: string) => {
  return jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );
};
