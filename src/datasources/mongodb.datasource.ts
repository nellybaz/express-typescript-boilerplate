import { IDataSource } from '../interfaces';
import mongoose from 'mongoose';
import config from '../../config';

export class MongoDBDataSource implements IDataSource {
    connect = async () => {
        try {
            return await mongoose.connect(config.server.dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
        } catch (error) {
            throw Error('Error connecting to repository datasource');
        } 
    };
    disconnect = async () => {
        try {
            await mongoose.connection.close();
        } catch (error) {}
    };
}
