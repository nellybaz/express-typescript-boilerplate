import { inject, injectable, named } from "inversify";
import TYPES from "../../config/types";
import { MongoDBDataSource } from "../datasources/mongodb.datasource";
import { IDataSource } from "../interfaces";
import { UserModel } from "../model";
import { CrudRepository, IModelFactory } from "./crud.repository";


@injectable()
export class UserRepositry extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('userModel') modelFactory: IModelFactory) {
        super(dbClient, modelFactory);
    }
} 