/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ
InshaAllah, By his marcy I will Gain Success
*/
import { createRequire } from 'module';
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url'


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const require = createRequire(import.meta.url);
export const morganCommand ='dev';