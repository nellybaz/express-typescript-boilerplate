import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { WalletModel } from '../model';
import { CrudRepository } from './crud.repository';

export interface ICreditObject {
    userId: string;
    amount: number;
}
@injectable()
export class WalletRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('walletModel') modelFactory: WalletModel) {
        super(dbClient, modelFactory);
    }

    async credit(data: ICreditObject) {
        try {
            await this.dataBaseClient().connect();
            const response = await this.modelObject().findOneAndUpdate({ userId: data.userId }, { $inc: { amount: data.amount } });
            await this.dataBaseClient().disconnect();
            return response != undefined;
        } catch (error) {
            return false;
        }
    }
}
