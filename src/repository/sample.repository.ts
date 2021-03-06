import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import mongoose from 'mongoose';
import TYPES from '../../config/types';
import { IDataSource, RepositoryParameter } from '../interfaces';
const Schema = mongoose.Schema;
import { CrudRepository } from './crud.repository';

export const SampleSchema = new Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});


@injectable()
export class SampleRepository extends CrudRepository {
    constructor(@inject(TYPES.MongodbClient) dbClient: IDataSource) {
        super(dbClient);
    }

    async complexQuery() {
        await (await this.modelObject()).findByIdAndUpdate();
    }
}
  