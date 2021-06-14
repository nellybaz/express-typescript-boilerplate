import dotenv from 'dotenv';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { WalletHistoryModel, WalletModel } from '../../model';
import { WalletRepository } from '../../repository/wallet.repository';
import { WalletHistoryService, WalletService } from '../../services';
import { ObjectId } from 'mongodb';
import { expect } from 'chai';
import { WalletHistoryRepository } from '../../repository';

dotenv.config();

const historyService = new WalletHistoryService(new WalletHistoryRepository(new MongoDBDataSource(), new WalletHistoryModel()))
const walletRepo = new WalletRepository(new MongoDBDataSource(), new WalletModel())
describe('Wallet', () => {
    it('credits user', async () => {
        const walletService = new WalletService(walletRepo, historyService);
        const userId = new ObjectId().toHexString();
        let wallet = await walletService.init(userId);
        await walletService.credit({ userId: wallet.userId, amount: 100 });
        wallet = await walletService.fetch(userId);
        expect(wallet.amount).to.eq(100);
    });

    it('debits user', async () => {
        const walletService = new WalletService(walletRepo, historyService);
        const userId = new ObjectId().toHexString();
        let wallet = await walletService.init(userId);
        await walletService.credit({ userId: wallet.userId, amount: 100 });
        await walletService.debit({ userId: wallet.userId, amount: 50 });
        wallet = await walletService.fetch(userId);
        expect(wallet.amount).to.eq(50);
    });
});
