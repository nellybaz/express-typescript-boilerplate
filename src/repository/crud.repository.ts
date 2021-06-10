import mongoose, { Model, Schema } from 'mongoose';
import { IDataSource} from '../interfaces';
import TYPES from '../../config/types';
import { inject, injectable } from 'inversify';

export interface IModelFactory {
    model: () => Model<any, any, any>;
}


@injectable()
export class CrudRepository {
    constructor(@inject(TYPES.MongodbClient) private dbClient: IDataSource, @inject(TYPES.IModelFactory) private modelFactory: IModelFactory) {}

    async create(data: Object) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().create(data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error creating record');
        }
    }

    async findOne(data: mongoose.FilterQuery<any>) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().findOne(data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error finding one record');
        }
    }

    async findById(id: string) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().findById(id);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error finding by Id');
        }
    }

    async findAll(data?: mongoose.FilterQuery<any>) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().find(data!);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error finding one record');
        }
    }

    async updateOne(filter: mongoose.FilterQuery<any>, data: Object) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().updateOne(filter, data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async updateMany(filter: mongoose.FilterQuery<any>, data: Object) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().updateMany(filter, data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async deleteOne(data: mongoose.FilterQuery<any>) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().deleteOne(data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async deleteMany(data: mongoose.FilterQuery<any>) {
        try {
            await this.dbClient.connect();
            const res = await this.modelFactory.model().deleteMany(data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async modelObject() {
        return this.modelFactory.model();
    }
}
