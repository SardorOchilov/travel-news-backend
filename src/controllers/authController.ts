// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserByUsername } from '../models/userModel';

dotenv.config();

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user) return res.status(400).send('Cannot find user');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });

    res.json({ token });
};
