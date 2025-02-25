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


router.post('/', function (req, res) {
    try {
        let message= req.query.message.trim();
        let messages = JSON.parse(readFileSync(path.resolve(__dirname, './message.json'), 'utf8')) || [];
        messages.push({
            name : 'admin',
            message
        });
        writeFileSync(path.resolve(__dirname, './message.json'), JSON.stringify(messages));
        let workers = JSON.parse(readFileSync(path.resolve(__dirname, 'serviceWorker.json'), 'utf-8')) || [];
        for (let i = 0; i < workers.length; i++) {
            const worker = workers[i];
            let ip =worker.ip;
            delete worker.ip;
            (worker.isAdmin === true) && (delete worker.isAdmin);
            let playload={
                title :'Admin Message',
                body : message,
            }
            createNotification(playload, worker, ip)
        }
        return res.sendStatus(201);
    } catch (error) {
        catchError(res, error)
    }
});


export default router;

