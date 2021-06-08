import mongoose, { Mongoose, Model } from 'mongoose';
const Schema = mongoose.Schema;
import { ObjectId } from 'mongodb';
import { IDataSource } from '../interface';
import { IRepository } from '../interface/repository.interface';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';

const UserSchema = new Schema({
    email: String,
    passwordHash: String,
    dateCreated: Date,
    dateUpdate: Date
});

export class UserRepository implements IRepository {
    db: IDataSource;
    model: Model<any, any, any>;

    constructor() {
        this.db = new MongoDBDataSource();
        this.model = mongoose.model('User', UserSchema);
    }

    async find(data:any) {
        return this.model.findOne(data)
    }
}
