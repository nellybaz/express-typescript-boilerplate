import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { CrudRepository, IModelFactory } from './crud.repository';

@injectable()
export class TalentProfileRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('talentProfileModel') modelFactory: IModelFactory) {
        super(dbClient, modelFactory);
    }
}
