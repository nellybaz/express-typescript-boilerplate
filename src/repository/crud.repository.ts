import mongoose, { Model, Schema } from 'mongoose';
import { IDataSource, IRepository, RepositoryParameter } from '../interfaces';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import TYPES from '../../config/types';
import { provide } from 'inversify-binding-decorators';
import { inject, injectable } from 'inversify';
// import { SampleSchema } from './sample.repository';

const SampleSchema = new Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

@injectable()
// implements IRepository
export class CrudRepository {
    constructor(@inject(TYPES.MongodbClient) private dbClient: IDataSource) {}

    async create(data: Object) {
        try {
            await this.dbClient.connect();
            const res = await mongoose.model('Sample', SampleSchema).create(data);
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
            const res = await mongoose.model('Sample', SampleSchema).findOne(data);
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
            const res = await mongoose.model('Sample', SampleSchema).findById(id);
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
            const res = await mongoose.model('Sample', SampleSchema).find(data!);
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
            const res = await mongoose.model('Sample', SampleSchema).updateOne(filter, data);
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
            const res = await mongoose.model('Sample', SampleSchema).updateMany(filter, data);
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
            const res = await mongoose.model('Sample', SampleSchema).deleteOne(data);
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
            const res = await mongoose.model('Sample', SampleSchema).deleteMany(data);
            this.dbClient.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.dbClient.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async modelObject() {
        return mongoose.model('Sample', SampleSchema);
    }
}
