import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IDataSource } from "../interfaces";
import { CrudRepository } from "./crud.repository";


@injectable()
export class UserRepositry extends CrudRepository {
    constructor(@inject(TYPES.MongodbClient) dbClient: IDataSource) {
        super(dbClient);
    }
}