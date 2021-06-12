import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { StripePaymentService } from '../../services';
import { IStripeSessionIdContractIdData } from '../../interfaces/stripe-contract-id.interface';
import { StripeSessionIdContractIdRepository } from '../../repository/stripe-session-contract-id.repository';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { StripeSessionIdContractIdModel, TalentContractModel, TalentProfileModel } from '../../model';
import { TalentContractRepository } from '../../repository/talent-contract.repository';
import { TalentProfileRepository } from '../../repository';
dotenv.config();

describe('Stripe payment service', () => {
    let service: StripePaymentService;
    let repo: StripeSessionIdContractIdRepository;
    let contractRepo: TalentContractRepository;
    let talentProfileRepo: TalentContractRepository;
    beforeEach(() => {
        contractRepo = new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel());
        repo = new StripeSessionIdContractIdRepository(new MongoDBDataSource(), new StripeSessionIdContractIdModel());
        talentProfileRepo = new TalentProfileRepository(new MongoDBDataSource(), new TalentProfileModel());
        service = new StripePaymentService(repo, contractRepo, talentProfileRepo);
    });

    describe('Stripe SessionId with ContractId', () => {
        it('creates contract and stripe session id', async () => {
            try {
                const data: IStripeSessionIdContractIdData = {
                    contractId: '60c3759fe5b92623acf969bb',
                    stripeSessionId: 'sessionId',
                    isPaid: false
                };
                const created = await service.storeStripeSessionIdWithContractId(data);
                expect(created).to.eq(true);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });
        it('throws error on failed record creation', async () => {
            try {
                repo.create = (data: Object) => Promise.reject({});
                const data: IStripeSessionIdContractIdData = {
                    contractId: 'contractId',
                    stripeSessionId: 'sessionId',
                    isPaid: false
                };
                await service.storeStripeSessionIdWithContractId(data);
                expect(false).to.eq(true);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('creates sesssion ', () => {
        it('creates session correctly', async () => {
            const profile = await talentProfileRepo.create({
                user: '60c3759fe5b92623acf969bb',
                firstName: 'Nelson',
                lastName: 'Bassey',
                country: 'Nigeria'
            });

            const contract = await contractRepo.create({
                owner: profile._id,
                contractName: 'contract19',
                description: 'desc for description 19',
                amount: 10,
                currency: '$',
                payerEmail: 'nellybaz10@gmail.com',
                emailSent: true,
                isPaid: false,
                dueDate: new Date()
            });

            const response = await service.createSession({ contractId: contract._id });
            expect(response).to.have.property('message');
            expect(response).to.have.property('message').to.equal('session created successfully');
        });
    });
});
