import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
    interface Request {
        user?: {
            id: number;
            username: string;
            isAdmin: boolean;
        };
    }
}

export interface CustomJwtPayload extends JwtPayload {
    id: number;
    username: string;
    isAdmin: boolean;
}
