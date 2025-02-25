/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/

import webPush from 'web-push';

const validKeys = {
    public: 'BKFdIRoN5yiqnbf71deu6ObttAxCQ8FHq8ATUFd9EPH58YwQaSuECSp8FXSQFZUOmN4TpXkqdpbTbvClblQ2Uc4',
    private: 'Taj01PuRj7xLS16SRC-LckXIAgFBZa-0Rl93q9NglSo'
}

webPush.setVapidDetails('mailto:mubtasimf443@gmail.com', validKeys.public, validKeys.private);


export default webPush;