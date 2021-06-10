import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { IDataSource } from '../interfaces';
import { TalentContractModel } from '../model/talent-contract.model';
import { CrudRepository, IModelFactory } from './crud.repository';

@injectable()
export class TalentContractRepository extends CrudRepository {
    constructor(@inject(TYPES.MongodbClient) dbClient: IDataSource, @inject(TYPES.TalentContractModel) modelFactory: TalentContractModel) {
        super(dbClient, modelFactory);
    }
}
