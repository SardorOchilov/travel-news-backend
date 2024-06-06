// src/routes/newsRoutes.ts

import { Router } from 'express';
import { addNews, getAllNewsItems, getNewsItemById, updateNewsItem, removeNewsItem } from '../controllers/newsController';
import upload from '../middleware/fileUpload';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - shortDescription
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the news
 *         title:
 *           type: string
 *           description: The title of the news
 *         description:
 *           type: string
 *           description: The full description of the news
 *         shortDescription:
 *           type: string
 *           description: The short description of the news
 *         image:
 *           type: string
 *           description: The image URL of the news
 *         links:
 *           type: array
 *           items:
 *             type: string
 *           description: Links related to the news
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the news was created
 *         views:
 *           type: integer
 *           description: The number of views the news has received
 *         likes:
 *           type: integer
 *           description: The number of likes the news has received
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Add a new news item
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Created
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticateToken, isAdmin, upload.single('image'), addNews);

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news items
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.get('/', getAllNewsItems);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get a news item by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the news item
 *     responses:
 *       200:
 *         description: The news item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News item not found
 */
router.get('/:id', getNewsItemById);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update a news item
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the news item to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated news item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: News item not found
 */
router.put('/:id', authenticateToken, isAdmin, upload.single('image'), updateNewsItem);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete a news item
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the news item to delete
 *     responses:
 *       200:
 *         description: The news item was deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: News item not found
 */
router.delete('/:id', authenticateToken, isAdmin, removeNewsItem);

export default router;
