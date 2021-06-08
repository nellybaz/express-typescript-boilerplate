import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { CrudRepository } from './crud.repository';

export const SampleSchema = new Schema({
    email: String,
    passwordHash: String,
    dateCreated: Date,
    dateUpdate: Date
});

export class SampleRepository extends CrudRepository {

    constructor() {
      super({schema: SampleSchema, modelName:'User'});
    }

}
