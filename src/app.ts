import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import logging from '../config/logging';
import config from '../config';
import Routes from './routes';
import { Container, injectable } from 'inversify';
import { InversifyExpressServer, BaseMiddleware } from 'inversify-express-utils';
import './ioc';
import { CrudRepository, SampleRepository } from './repository';
import TYPES from '../config/types';
import { SampleService } from './services';
import { IRepository } from './interfaces';
import { MongoDBDataSource } from './datasources/mongodb.datasource';


const NAMESPACE = 'Server';
const port = 8000;

const container = new Container();

container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<SampleRepository>(TYPES.SampleRepository).to(SampleRepository);
container.bind<SampleService>(TYPES.SampleService).to(SampleService);
container.bind<MongoDBDataSource>(TYPES.MongodbClient).to(MongoDBDataSource);


const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(
        express.urlencoded({
            extended: true
        })
    );
    app.use(express.json()); 
    // app.use(helmet());
});

const app: Application = server.build();

app.use((req:Request, res:Response, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});

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
  res.send(`Server Online on ${new Date()}`)
})

new Routes(app).load();

app.use((_: Request, res: Response, __: NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

app.listen(port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
