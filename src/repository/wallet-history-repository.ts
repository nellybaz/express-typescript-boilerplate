import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { WalletHistoryModel } from '../model';
import { CrudRepository } from './crud.repository';

@injectable()
export class WalletHistoryRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('walletHistoryModel') modelFactory: WalletHistoryModel) {
        super(dbClient, modelFactory);
    }
}
