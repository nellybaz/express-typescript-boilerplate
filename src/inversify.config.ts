import { Container } from "inversify";
import { CrudRepository, IModelFactory, SampleRepository } from './repository';
import TYPES from '../config/types';
import { SampleService, UserServivce } from './services';
import { MongoDBDataSource } from './datasources/mongodb.datasource';
import { InputModifierService, InvoiceRepository, InvoiceService } from "./controllers";
import { UserRepositry } from "./repository/user.repository";
import { UserModel } from "./model";
import { TalentContractRepository } from "./repository/talent-contract.repository";
import { TalentContractService } from "./services/talent-contract.service";
import { TalentContractModel } from "./model/talent-contract.model";
import { IDataSource } from "./interfaces";


const container = new Container();

container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<SampleRepository>(TYPES.SampleRepository).to(SampleRepository);
container.bind<SampleService>(TYPES.SampleService).to(SampleService);
container.bind<IDataSource>(TYPES.IDataSource).to(MongoDBDataSource);
container.bind<InputModifierService>(TYPES.InputModifierService).to(InputModifierService);
container.bind<InvoiceService>(TYPES.InvoiceService).to(InvoiceService);
container.bind<InvoiceRepository>(TYPES.InvoiceRepository).to(InvoiceRepository);
container.bind<UserRepositry>(TYPES.UserRepositry).to(UserRepositry);
container.bind<UserServivce>(TYPES.UserServivce).to(UserServivce);
container.bind<IModelFactory>(TYPES.IModelFactory).to(UserModel).whenTargetNamed('userModel');

container.bind<TalentContractRepository>(TYPES.TalentContractRepository).to(TalentContractRepository);
container.bind<TalentContractService>(TYPES.TalentContractService).to(TalentContractService);
container.bind<IModelFactory>(TYPES.IModelFactory).to(TalentContractModel).whenTargetNamed('talentContractModel');

 
export {container}