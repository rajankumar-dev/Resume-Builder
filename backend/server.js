import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();
const PORT = 4000;

app.use(cors())

//connect DB 

//Middleware
app.use(express.json())

//route
app.get('/', (req, res) => {
    res.send('Api working')
})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})