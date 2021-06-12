import { Container } from "inversify";
import { CrudRepository, IModelFactory, SampleRepository, StripeSessionIdContractIdRepository } from './repository';
import TYPES from '../config/types';
import { SampleService, UserServivce, InbuiltEmailService, TalentContractService, StripePaymentService } from './services';
import { MongoDBDataSource } from './datasources/mongodb.datasource';
import { InputModifierService, InvoiceRepository, InvoiceService,  } from './controllers';
import { UserRepositry } from "./repository/user.repository";
import { StripeSessionIdContractIdModel, TalentProfileModel, UserModel } from "./model";
import { TalentContractRepository } from "./repository/talent-contract.repository";
import { TalentContractModel } from "./model/talent-contract.model";
import { IDataSource, IEmailService } from "./interfaces";
import { TalentProfileService } from "./services/talent-profile.service";
import { TalentProfileRepository } from "./repository/talent-profile.repository";


const container = new Container();




/**
 * DATASOURCES
 */
container.bind<IDataSource>(TYPES.IDataSource).to(MongoDBDataSource);


/**
 * SERVICES
 */

container.bind<SampleService>(TYPES.SampleService).to(SampleService);
container.bind<InputModifierService>(TYPES.InputModifierService).to(InputModifierService);
container.bind<InvoiceService>(TYPES.InvoiceService).to(InvoiceService);
container.bind<UserServivce>(TYPES.UserServivce).to(UserServivce);
container.bind<TalentContractService>(TYPES.TalentContractService).to(TalentContractService);
container.bind<IEmailService>(TYPES.IEmailService).to(InbuiltEmailService).whenTargetNamed('inbuiltEmailService');
container.bind<StripePaymentService>(TYPES.StripePaymentService).to(StripePaymentService);
container.bind<TalentProfileService>(TYPES.TalentProfileService).to(TalentProfileService);


/**
 * REPOSITORIES
 */
container.bind<SampleRepository>(TYPES.SampleRepository).to(SampleRepository);
container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<TalentContractRepository>(TYPES.TalentContractRepository).to(TalentContractRepository);
container.bind<UserRepositry>(TYPES.UserRepositry).to(UserRepositry);
container.bind<InvoiceRepository>(TYPES.InvoiceRepository).to(InvoiceRepository);
container.bind<StripeSessionIdContractIdRepository>(TYPES.StripeSessionIdContractIdRepository).to(StripeSessionIdContractIdRepository);
container.bind<TalentProfileRepository>(TYPES.TalentProfileRepository).to(TalentProfileRepository);


/**
 * MODELS
 */
container.bind<IModelFactory>(TYPES.IModelFactory).to(UserModel).whenTargetNamed('userModel');
container.bind<IModelFactory>(TYPES.IModelFactory).to(TalentContractModel).whenTargetNamed('talentContractModel');
container.bind<IModelFactory>(TYPES.IModelFactory).to(StripeSessionIdContractIdModel).whenTargetNamed('stripeSessionIdContractIdModel');
container.bind<IModelFactory>(TYPES.IModelFactory).to(TalentProfileModel).whenTargetNamed('talentProfileModel');





 
export {container}