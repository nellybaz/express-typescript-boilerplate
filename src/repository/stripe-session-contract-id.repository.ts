import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { StripeSessionIdContractIdModel } from '../model';
import { CrudRepository } from './crud.repository';

@injectable()
export class StripeSessionIdContractIdRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('stripeSessionIdContractIdModel') modelFactory: StripeSessionIdContractIdModel) {
        super(dbClient, modelFactory);
    }
}
