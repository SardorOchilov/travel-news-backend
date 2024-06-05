// src/models/userModel.ts

import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool(); // Use connection settings from .env

export interface User {
    id?: number;
    username: string;
    password: string;
    isAdmin: boolean;
}

export const createUser = async (user: User): Promise<User> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *',
        [user.username, hashedPassword, user.isAdmin]
    );
    return result.rows[0];
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
};
