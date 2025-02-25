/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/

import { Router } from "express";
import catchError from "../services/error.handle.js";

import { __dirname } from '../env.js'
import {resolve} from 'path'
import { readFileSync, writeFileSync } from "fs";
import webPush from "../services/webPush.js";

const router = Router();



router.post('/subscribe', function (req, res) {
    try {
        let ip = req.ip || res.socket.remoteAddress;
        let subcription = req.body;
        let workers = JSON.parse(readFileSync(resolve(__dirname, './serviceWorker.json'), 'utf8'));
        workers = workers.filter(function (element) {
            if (element.ip !== ip) return element; 
        });
        workers.push({ ip, ...subcription, isAdmin: true });
        writeFileSync(resolve(__dirname, './serviceWorker.json') , JSON.stringify(workers));
        return res.sendStatus(200);
    } catch (error) {
        catchError(res, error)
    }
});

export default router;