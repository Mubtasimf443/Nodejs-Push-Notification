/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/

import express from 'express';
import { __dirname, require } from './env.js'
import msgRouter from './routes/message.js';
import adminRouter from './routes/admin.js';
import adminNoticeRouter from './routes/push.admin.js';
import userNoticeRouter from './routes/push.user.js';
import morgan from 'morgan';

const app = express();
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/message', msgRouter);
app.use('/api/admin', adminRouter);
app.use('/api/notice/admin', adminNoticeRouter);
app.use('/api/notice/user', userNoticeRouter);


app.listen(3000 , function (event) {
    console.log('InshaAllah, By his marcy I will Gain Success')
})