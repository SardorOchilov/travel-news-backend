import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerConfig';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import newsRoutes from './routes/newsRoutes';
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
const port = 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
