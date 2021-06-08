import mongoose, { Mongoose, Model } from 'mongoose';
const Schema = mongoose.Schema;
import { IDataSource, IRepository, RepositoryParameter } from '../interface';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';


export class CrudRepository implements IRepository {
    db: IDataSource;
    model: Model<any, any, any>;

    constructor({schema, modelName}:RepositoryParameter) {
        this.db = new MongoDBDataSource();
        this.model = mongoose.model(modelName, schema);
    }

    async findOne(data: any) {
        return this.model.findOne(data);
    }

    async updateOne(data: any) {
        return this.model.updateOne(data);
    }

    async modelObject(){
      return this.model;
    }
}
