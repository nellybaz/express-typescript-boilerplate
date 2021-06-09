import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;
import { IDataSource, IRepository, RepositoryParameter } from '../interface';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';

export class CrudRepository implements IRepository {
    db: IDataSource;
    model: Model<any, any, any>;

    constructor({ schema, modelName }: RepositoryParameter) {
        this.db = new MongoDBDataSource();
        this.model = mongoose.model(modelName, schema);
    }

    async create(data: Object) {
        try {
            await this.db.connect();
            const res = await this.model.create(data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error creating record');
        }
    }

    async findOne(data: mongoose.FilterQuery<any>) {
        try {
            await this.db.connect();
            const res = await this.model.findOne(data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error finding one record');
        }
    }

    async findById(id: string) {
        try {
            await this.db.connect();
            const res = await this.model.findById(id);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error finding by Id');
        }
    }

    async findAll(data?: mongoose.FilterQuery<any>) {
        try {
            await this.db.connect();
            const res = await this.model.find(data!);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error finding one record');
        }
    }

    async updateOne(filter: mongoose.FilterQuery<any>, data:Object) {
        try {
            await this.db.connect();
            const res = await this.model.updateOne(filter, data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async updateMany(filter: mongoose.FilterQuery<any>, data:Object) {
        try {
            await this.db.connect();
            const res = await this.model.updateMany(filter, data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async deleteOne(data: mongoose.FilterQuery<any>) {
        try {
            await this.db.connect();
            const res = await this.model.deleteOne(data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async deleteMany(data: mongoose.FilterQuery<any>) {
        try {
            await this.db.connect();
            const res = await this.model.deleteMany(data);
            this.db.disconnect().then((_) => {});
            return res;
        } catch (error) {
            this.db.disconnect().then((_) => {});
            throw Error('Error');
        }
    }

    async modelObject() {
        return this.model;
    }
}
