import { Container } from "inversify";
import { CrudRepository, SampleRepository } from './repository';
import TYPES from '../config/types';
import { SampleService, UserServivce } from './services';
import { MongoDBDataSource } from './datasources/mongodb.datasource';
import { InputModifierService, InvoiceRepository, InvoiceService } from "./controllers";
import { UserRepositry } from "./repository/user.repository";


const container = new Container();

container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<SampleRepository>(TYPES.SampleRepository).to(SampleRepository);
container.bind<SampleService>(TYPES.SampleService).to(SampleService);
container.bind<MongoDBDataSource>(TYPES.MongodbClient).to(MongoDBDataSource);
container.bind<InputModifierService>(TYPES.InputModifier).to(InputModifierService);
container.bind<InvoiceService>(TYPES.InvoiceService).to(InvoiceService);
container.bind<InvoiceRepository>(TYPES.InvoiceRepository).to(InvoiceRepository);
container.bind<UserRepositry>(TYPES.UserRepositry).to(UserRepositry);
container.bind<UserServivce>(TYPES.UserServivce).to(UserServivce);


export {container}