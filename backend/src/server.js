import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // <==

import { connectDb } from './config/db.js';
import prescriptionsRoutes from './routes/prescriptionsRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: 'http://localhost:5173',
        })
    );
}
app.use(express.json());
app.use(rateLimiter); // Each user is allowed maximum of 100 requests every 15 minutes

// Custom middlewares
// app.use((req, res, next) => {
//     console.log(`Method:${req.method}\nURL:${req.url}`);
//     next();
// });

app.use('/api/prescriptions', prescriptionsRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

    // app.get('*', (req, res) => {
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on PORT:', PORT);
    });
});
