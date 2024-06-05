// src/models/newsModel.ts

import { Pool, QueryResult } from 'pg';
import { News } from '../types/news';

const pool = new Pool(); // Use connection settings from .env

export const createNews = async (news: News): Promise<News> => {
    const result: QueryResult<any> = await pool.query(
        'INSERT INTO news (title, description, short_description, image, links, date, views, likes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [news.title, news.description, news.shortDescription, news.image, news.links, news.date, news.views, news.likes]
    );
    return result.rows[0];
};

export const getAllNews = async (): Promise<News[]> => {
    const result: QueryResult<any> = await pool.query('SELECT * FROM news');
    return result.rows;
};

export const getNewsById = async (id: number): Promise<News | null> => {
    const result: QueryResult<any> = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const updateNews = async (id: number, news: News): Promise<News | null> => {
    const result: QueryResult<any> = await pool.query(
        'UPDATE news SET title = $1, description = $2, short_description = $3, image = $4, links = $5, date = $6, views = $7, likes = $8 WHERE id = $9 RETURNING *',
        [news.title, news.description, news.shortDescription, news.image, news.links, news.date, news.views, news.likes, id]
    );
    return result.rows[0] || null;
};

export const deleteNews = async (id: number): Promise<boolean> => {
    const result: QueryResult<any> = await pool.query('DELETE FROM news WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
};
