import type { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user.id, user.username);

    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log("Failed login operation : ", error);
    res.status(500).json({
      message: "Server side error.",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = generateToken(user.id, user.username);

    return res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.log("Failed login operation : ", error);
    res.status(500).json({
      message: "Server side error.",
    });
  }
};
