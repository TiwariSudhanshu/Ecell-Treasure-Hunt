import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

const app = express();

dotenv.config({
    path: './.env'
})

app.use(
    cors()
  );
  


app.listen(process.env.PORT, (req,res)=>{
    console.log(`Server has started on port ${process.env.PORT} `)
})