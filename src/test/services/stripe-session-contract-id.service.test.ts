import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { StripeSessionIdContractIdService } from '../../services';
import { IStripeSessionIdContractIdData } from '../../interfaces/stripe-contract-id.interface';
import { StripeSessionIdContractIdRepository } from '../../repository/stripe-session-contract-id.repository';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { StripeSessionIdContractIdModel } from '../../model';
dotenv.config();

describe('Talent contract service', () => {
    let service: StripeSessionIdContractIdService;
    let repo: StripeSessionIdContractIdRepository;
    beforeEach(() => {
        repo = new StripeSessionIdContractIdRepository(new MongoDBDataSource(), new StripeSessionIdContractIdModel());
        service = new StripeSessionIdContractIdService(repo);
    });

    describe('Create', () => {
        it('creates contract and stripe session id', async () => {
            try {
                const data: IStripeSessionIdContractIdData = {
                    contractId: 'contractId',
                    stripeSessionId: 'sessionId',
                    isPaid: false
                };
                const created = await service.create(data);
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
                await service.create(data);
                expect(false).to.eq(true);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });
});
