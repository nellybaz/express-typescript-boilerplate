import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const DB_URL = (process.env.NODE_ENV == 'test' ? process.env.DB_URL_TEST: process.env.DB_URL) || 'mongodb://localhost:27017/mydb';
const JWT_SECRET = process.env.JWT_SECRET || 'secretkeyHereForDev'
const SENDGRID_KEY = process.env.SENDGRID_API_KEY || '';
const STRIPE_KEY = (process.env.NODE_ENV == 'test' ? process.env.STRIPE_KEY_TEST : process.env.STRIPE_KEY) || '';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    dbUrl: DB_URL,
    jwtSecret: JWT_SECRET,
    sendGridKey: SENDGRID_KEY,
    stripeKey:STRIPE_KEY
};

const config = {
    server: SERVER
};

export default config;
