import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IDataSource } from "../interfaces";
import { CrudRepository, IModelFactory } from "./crud.repository";


@injectable()
export class UserRepositry extends CrudRepository {
    constructor(@inject(TYPES.MongodbClient) dbClient: IDataSource, @inject(TYPES.IModelFactory) modelFactory: IModelFactory) {
        super(dbClient, modelFactory);
    }
} 