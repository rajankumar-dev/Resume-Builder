import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from './config/db.js';
import userRoutes from './routers/userRoutes.js';

import resumeRoutes from './routers/resumeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors())

//connect DB 
connectDb()

//Middleware
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/resumes', resumeRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Cache-Control', 'no-cache');
    }  
}));

//route
app.get('/', (req, res) => {
    res.send('Api working')
    // console.log(process.env.MONGO_URL);

})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})