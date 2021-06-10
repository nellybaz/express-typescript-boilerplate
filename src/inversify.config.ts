import { Container } from "inversify";
import { CrudRepository, SampleRepository } from './repository';
import TYPES from '../config/types';
import { SampleService } from './services';
import { MongoDBDataSource } from './datasources/mongodb.datasource';
import { InputModifierService } from "./controllers";


const container = new Container();

container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<SampleRepository>(TYPES.SampleRepository).to(SampleRepository);
container.bind<SampleService>(TYPES.SampleService).to(SampleService);
container.bind<MongoDBDataSource>(TYPES.MongodbClient).to(MongoDBDataSource);
container.bind<InputModifierService>(TYPES.InputModifier).to(InputModifierService);

export {container}