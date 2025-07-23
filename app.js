import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import router from './routes/app.routes.js';
import auth_router from './routes/auth.routes.js';
import redirect_router from './routes/redirect.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

dotenv.config();

const app = express();

app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}))
app.use(router)
app.use(auth_router)
app.use(redirect_router)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening at port ${process.env.PORT}`);
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection:', reason);
  });
  process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
  });
  