import mongoose from 'mongoose';
import { RepositoryParameter } from '../interface';
const Schema = mongoose.Schema;
import { CrudRepository } from './crud.repository';

export const SampleSchema = new Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

export class SampleRepository extends CrudRepository {
    constructor() {
        const _schema = SampleSchema;
        super({ schema: _schema, modelName: 'Sample' });
    }
}
