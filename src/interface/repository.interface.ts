import {Model} from "mongoose";
import { IDataSource } from "./datasource.interface";

export interface IRepository{
  db:IDataSource,
  model: Model<any,any,any>
}