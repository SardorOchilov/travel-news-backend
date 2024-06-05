import { Router } from 'express';
import { addNews, getAllNewsItems, getNewsItemById, updateNewsItem, removeNewsItem } from '../controllers/newsController';
import upload from '../middleware/fileUpload';
import { isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', isAdmin ,upload.single('image'), addNews); // Apply middleware to addNews route
router.put('/:id',isAdmin, upload.single('image'), updateNewsItem); // Apply middleware to updateNewsItem route

router.get('/', getAllNewsItems);
router.get('/:id', getNewsItemById);
router.delete('/:id',isAdmin, removeNewsItem);

export default router;
