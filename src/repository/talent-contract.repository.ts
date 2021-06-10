import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { IDataSource } from '../interfaces';
import { TalentContractModel } from '../model/talent-contract.model';
import { CrudRepository, IModelFactory } from './crud.repository';

@injectable()
export class TalentContractRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('talentContractModel') modelFactory: TalentContractModel) {
        super(dbClient, modelFactory);
    }
}
