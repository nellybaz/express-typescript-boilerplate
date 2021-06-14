import dotenv from 'dotenv';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { WalletModel } from '../../model';
import { WalletRepository } from '../../repository/wallet.repository';
import { WalletService } from '../../services';
import {ObjectId} from 'mongodb'
import { expect } from 'chai';

dotenv.config();

describe('Wallet', () => {
    it('credits user', async () => {
        const walletService = new WalletService(new WalletRepository(new MongoDBDataSource(), new WalletModel()));
        const userId = new ObjectId().toHexString();
        let wallet = await walletService.init(userId)
        await walletService.credit({ userId: wallet.userId, amount: 100 });
        wallet = await walletService.fetch(userId)
        expect(wallet.amount).to.eq(100)
    });
});
