import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import flash from 'connect-flash';
import requestIp from 'request-ip';
import session from 'express-session';

import auth_router from './routes/auth.routes.js';
import router from './routes/app.routes.js';
import redirect_router from './routes/redirect.routes.js';
import {verifyAuthentication} from "./middlewares/verify-auth.middleware.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(verifyAuthentication);
app.use(session({
    secret: 'mySecretKey',
    resave: true, 
    saveUninitialized: false
}))
app.use(flash());
app.use(requestIp.mw());
app.use((req,res,next)=>{
    // This middleware use locals which make its member accessbile in all ejs without passing them.
    res.locals.user = req.user;
    next();
});
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(auth_router);
app.use(redirect_router);

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening at port ${process.env.PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection:', reason);
  });
  process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
  });
  