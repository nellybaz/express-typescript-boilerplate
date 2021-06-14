import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { WalletModel } from '../model';
import { CrudRepository } from './crud.repository';

@injectable()
export class WalletRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('walletModel') modelFactory: WalletModel) {
        super(dbClient, modelFactory);
    }
}
