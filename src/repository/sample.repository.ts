import mongoose from 'mongoose';
import { RepositoryParameter } from '../interface';
const Schema = mongoose.Schema;
import { CrudRepository } from './crud.repository';

export const SampleSchema = new Schema({
    email: String,
    passwordHash: String,
    createdAt: Date,
    updatedAt: Date
});

export class SampleRepository extends CrudRepository {
    constructor({ schema, modelName }: RepositoryParameter) {
        super({ schema, modelName });
    }
}
