import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { TalentContractModel } from '../model/talent-contract.model';
import { CrudRepository } from './crud.repository';

@injectable()
export class TalentContractRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('talentContractModel') modelFactory: TalentContractModel) {
        super(dbClient, modelFactory);
    }

    // async getContractWithOwnerDetails(contractId: string) {
    //     await this.dataBaseClient().connect()
    //     const model = this.modelObject()
    //     const response = await model.findById(contractId).populate('owner')
    //     await this.dataBaseClient().disconnect();
    //     return response;
    // }
}
