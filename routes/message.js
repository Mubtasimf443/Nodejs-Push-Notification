/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/

import { Router } from "express";
import catchError from "../services/error.handle.js";
import { require,__dirname, morganCommand } from '../env.js'
import { readFileSync, writeFileSync } from 'fs'
import path from "path";
import morgan from "morgan";
import { createNotification } from "../services/notifications.js";

const router = Router();

router.get('/', function (req, res) {
    try {
        let messages =JSON.parse( readFileSync(path.resolve(__dirname, './message.json'), 'utf8'));
        return res.status(200).json(messages);
    } catch (error) {
        catchError(res, error)
    }
});


router.post('/',async function (req, res) {
    try {
        let message= req.query.message.trim();
        let messages = JSON.parse(readFileSync(path.resolve(__dirname, './message.json'), 'utf8')) || [];
        messages.push({
            name : 'user',
            message
        });
        writeFileSync(path.resolve(__dirname, './message.json'), JSON.stringify(messages));

        let ip = req.ip || res.socket.remoteAddress;
        let workers = JSON.parse(readFileSync(path.resolve(__dirname, './serviceWorker.json'), 'utf8')) || [];
        let worker=  workers.find(function (element) {
            if (element.isAdmin === true) return element;
        });
        if (worker===undefined) {
            return res.sendStatus(500);
        }
        delete worker.ip;
        await createNotification({ title: 'User Message', body: message }, worker , ip);
        return res.sendStatus(201)
    } catch (error) {
        catchError(res, error)
    }
});


export default router;

