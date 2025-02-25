/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/

import webPush from "./webPush.js";

export async function createNotification(playload, subscription, ip ) {
    try {
        let response = await webPush.sendNotification(subscription, JSON.stringify(playload));
        console.error('push Notification is send to : ' + ip);
   
    } catch (error) {
        console.error(error);
        console.error('Failed to send push Notification to :' + ip);
    }
}