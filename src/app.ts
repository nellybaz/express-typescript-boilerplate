import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import logging from '../config/logging';
import config from '../config';

import SampleController from './controller/sample.controller'

const NAMESPACE = 'Server';
const app:Application = express();
const port = 8000;


/** Log the request */
app.use((req:Request, res:Response, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/** Rules of our API */
app.use((req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    return next();
});


app.get("/", (_: Request, res: Response) => {
  res.send(`Online on ${new Date()}`)
})

app.use('/api/sample', SampleController);

/** Error handling */
app.use((_:Request, res:Response, __:NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


app.listen(port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));