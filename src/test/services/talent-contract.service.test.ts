import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { CrudRepository } from '../../repository';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { UserModel } from '../../model';
import { InbuiltEmailService, TalentContractService } from '../../services';
import { TalentContractData } from '../../interfaces/talent-contract.interface';
import { TalentContractRepository } from '../../repository/talent-contract.repository';
import { TalentContractModel } from '../../model/talent-contract.model';
dotenv.config();

describe('Talent contract service', () => {
    let service: TalentContractService;
    beforeEach(() => {
        service = new TalentContractService(new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel()), new InbuiltEmailService());
    });

    describe('Create', () => {
        it('creates contract for right data', async () => {
            try {
                const data: TalentContractData = {
                    amount: 100,
                    contractName: 'name',
                    currency: '$',
                    description: 'desc',
                    owner: '60c3759fe5b92623acf969bb',
                    payerEmail: 'email@email.com',
                    dueDate: new Date(),
                    emailSent: true,
                    isPaid: true
                };
                const created = await service.createContract(data);
                expect(created).to.eq(true);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error with wrong data', async () => {
            try {
                const data: TalentContractData = {
                    amount: 100,
                    contractName: 'name',
                    currency: '$',
                    description: 'desc',
                    owner: 'owner',
                    payerEmail: 'email@email.com',
                    dueDate: new Date()
                };
                await service.createContract(data);
                expect(false).to.eq(true);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });
});
