import { Request, Response } from 'express';
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from '../models/newsModel';
import {News} from '../types/news';
import upload from '../middleware/fileUpload';

export const addNews = async (req: Request, res: Response) => {
    const newsData: News = req.body;

    try {
        const newNews = await createNews(newsData);
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getAllNewsItems = async (req: Request, res: Response) => {
    try {
        const newsItems = await getAllNews();
        res.json(newsItems);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getNewsItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const newsItem = await getNewsById(id);
        if (!newsItem) {
            res.status(404).json({ error: 'News item not found' });
        } else {
            res.json(newsItem);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateNewsItem = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const newsData: News = req.body;

    try {
        const updatedNewsItem = await updateNews(id, newsData);
        if (!updatedNewsItem) {
            res.status(404).json({ error: 'News item not found' });
        } else {
            res.json(updatedNewsItem);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const removeNewsItem = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await deleteNews(id);
        if (!deleted) {
            res.status(404).json({ error: 'News item not found' });
        } else {
            res.json({ message: 'News item deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
