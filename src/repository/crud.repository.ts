import mongoose, { Mongoose, Model } from 'mongoose';
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

    async findOne(data: mongoose.FilterQuery<any>) {
        await this.db.connect()
        const res = await this.model.findOne(data);
        this.db.disconnect().then(_=>{})
        return res
    }

    async findById(id: string) {
        await this.db.connect();
        const res = await this.model.findById(id);;
        this.db.disconnect().then((_) => {});
        return res;
    }

    async updateOne(data: mongoose.FilterQuery<any>) {

      await this.db.connect();
      const res = await this.model.updateOne(data);
      this.db.disconnect().then((_) => {});
      return res;
    }

    async updateMany(data: mongoose.FilterQuery<any>) {
      await this.db.connect();
      const res = await this.model.updateMany(data);
      this.db.disconnect().then((_) => {});
      return res;
    }

    async deleteOne(data: mongoose.FilterQuery<any>) {
      await this.db.connect();
      const res = await this.model.deleteOne(data);
      this.db.disconnect().then((_) => {});
      return res;
    }

    async deleteMany(data: mongoose.FilterQuery<any>) {
      await this.db.connect();
      const res = await this.model.deleteMany(data);
      this.db.disconnect().then((_) => {});
      return res;
    }

    async modelObject() {
        return this.model;
    }
}
