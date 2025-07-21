import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import router from './routes/app.routes.js';

dotenv.config();

const app = express();

app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening at port ${process.env.PORT}`);
})