import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDb } from './config/db.js';

const app = express();
const PORT = 4000;

app.use(cors())

//connect DB 
connectDb()
//Middleware
app.use(express.json())

//route
app.get('/', (req, res) => {
    res.send('Api working')
    // console.log(process.env.MONGO_URL);

})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})