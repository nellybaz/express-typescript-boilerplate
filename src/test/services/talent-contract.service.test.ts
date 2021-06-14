import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { TalentContractService, WalletHistoryService, WalletService } from '../../services';
import { ITalentContractData } from '../../interfaces/talent-contract.interface';
import { TalentContractRepository } from '../../repository/talent-contract.repository';
import { TalentContractModel } from '../../model/talent-contract.model';
import { WalletHistoryRepository, WalletRepository } from '../../repository';
import { WalletHistoryModel, WalletModel } from '../../model';
dotenv.config();

const mongodbDataSource = new MongoDBDataSource();
describe('Talent contract service', () => {
    let service: TalentContractService;
    let walletService: WalletService;

    beforeEach(() => {
        walletService = new WalletService(
            new WalletRepository(mongodbDataSource, new WalletModel()),
            new WalletHistoryService(new WalletHistoryRepository(mongodbDataSource, new WalletHistoryModel()))
        );
        service = new TalentContractService(new TalentContractRepository(mongodbDataSource, new TalentContractModel()), { sendEmail: () => Promise.resolve(true) }, walletService);
    });

    describe('Create', () => {
        it('creates contract for right data', async () => {
            try {
                const data: ITalentContractData = {
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
                const data: ITalentContractData = {
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

    describe('Sends notification to buyer', () => {
        it('fails to send notification when no contract was created', async () => {
            service.contract = null;
            expect(await service.sendNotificationToPayer()).to.eq(false);
        });
        it('send notification when contract was created', async () => {
            service.contract = { key: 'value' };
            expect(await service.sendNotificationToPayer()).to.eq(true);
        });
    });

    it('marks contract when email sent', async () => {
        const repo = new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel());
        try {
            const data = {
                amount: 100,
                contractName: 'name',
                currency: '$',
                description: 'desc',
                userId: '60c3759fe5b92623acf969bb',
                payerEmail: 'email@email.com',
                dueDate: new Date(),
                emailSent: false,
                isPaid: true
            };
            await service.generate(data);
            const contratId = service.contract._id;
            const updatedContract = await repo.findById(contratId);
            expect(updatedContract.emailSent).to.eq(true);
        } catch (error) {
            expect(1).to.eq(2);
        }
    });

    it('returns correct responses when email notification sent to payer', async () => {
        try {
            const data = {
                amount: 100,
                contractName: 'name',
                currency: '$',
                description: 'desc',
                userId: '60c3759fe5b92623acf969bb',
                payerEmail: 'email@email.com',
                dueDate: new Date(),
                emailSent: false,
                isPaid: true
            };
            const resp = await service.generate(data);
            expect(resp.message).to.eq('Contracted created. Email sent 👍🏾');
        } catch (error) {
            expect(1).to.eq(2);
        }
    });
    it('returns correct responses email notification not sent', async () => {
        try {
            const data = {
                amount: 100,
                contractName: 'name',
                currency: '$',
                description: 'desc',
                userId: '60c3759fe5b92623acf969bb',
                payerEmail: 'email@email.com',
                dueDate: new Date(),
                emailSent: false,
                isPaid: true
            };

            service = new TalentContractService(new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel()), { sendEmail: () => Promise.resolve(false) }, walletService);
            const resp = await service.generate(data);
            expect(resp.message).to.eq('Contracted created. Email was not sent to payer. Click on resend email button');
        } catch (error) {
            expect(1).to.eq(2);
        }
    });

    it('marks contract as paid', async () => {
        service = new TalentContractService(new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel()), { sendEmail: () => Promise.resolve(false) }, walletService);
        const data: ITalentContractData = {
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
        await service.createContract(data);
        expect(await service.markContractAsPaid(service.contract._id)).to.eq(true);
    });

    it('process paid contract', async () => {
        service = new TalentContractService(new TalentContractRepository(new MongoDBDataSource(), new TalentContractModel()), { sendEmail: () => Promise.resolve(false) }, walletService);
        const userId = '60c3759fe5b92623acf969bb';

        const contractAmount = 100;
        const data: ITalentContractData = {
            amount: contractAmount,
            contractName: 'newly created',
            currency: '$',
            description: 'desc',
            owner: userId,
            payerEmail: 'email@email.com',
            dueDate: new Date(),
            emailSent: true,
            isPaid: true
        };

        try {
            await walletService.init(userId);
        } catch (error) {}
        let userWallet = await walletService.fetch(userId);
        const currentUserAmount = userWallet.amount;
        await service.createContract(data);
        const contractId = service.contract._id;
        console.log({ contractId });

        const processedPaidContract = await service.processPaidContract({ contractId });
        userWallet = await walletService.fetch(userId);
        expect(processedPaidContract).to.have.property('message').to.eq('Contract payment processed successfully');
        expect(userWallet.amount).to.eq(currentUserAmount + contractAmount);
    });
});
