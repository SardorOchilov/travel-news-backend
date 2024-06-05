// src/controllers/userController.ts

import { Request, Response } from 'express';
import { createUser, getUserById } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
    const { username, password, isAdmin } = req.body;

    try {
        const newUser = await createUser({ username, password, isAdmin });
        res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.user!.id);
        res.json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
