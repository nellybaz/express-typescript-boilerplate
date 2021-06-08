import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { CrudRepository } from './crud.repository';

const UserSchema = new Schema({
    email: String,
    passwordHash: String,
    dateCreated: Date,
    dateUpdate: Date
});

export class UserRepository extends CrudRepository {

    constructor() {
      super({schema: UserSchema, modelName:'User'});
    }

}
