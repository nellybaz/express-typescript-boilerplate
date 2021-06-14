import { inject } from 'inversify';
import TYPES from '../../config/types';
import { WalletRepository } from '../repository';
import { WalletHistoryService } from './wallet-history.service';

export interface IWalletData {
    userId: string;
    amount: number;
}

//TODO: credit and debit should be transactions taking other atomic operations as parameters
export class WalletService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletRepository, @inject(TYPES.WalletHistoryService) private _walletHistoryService: WalletHistoryService) {}

    async init(userId: string) {
        return await this._repo.create({ userId, amount: 0 });
    }

    async credit(data: IWalletData) {
        try {
            const amount = parseInt(data.amount.toString());
            const history = await this._walletHistoryService.create({ userId: data.userId, amount, caller: 'contract', type: 'credit' });
            if (history) {
                const record = await this._repo.updateWallet({ userId: data.userId, amount: amount });
                console.log({ record });
                if (!record) throw Error('Could not credit user');
                return record;
            }
        } catch (error) {
            console.log(error);
        }
        throw Error('Could not credit user');
    }
    async debit(data: IWalletData) {
        try {
            const amount = -1 * parseInt(data.amount.toString());
            const history = await this._walletHistoryService.create({ userId: data.userId, amount: Math.abs(amount), caller: 'contract', type: 'debit' });
            if (history) {
                const record = await this._repo.updateWallet({ userId: data.userId, amount: amount });
                console.log({ record });
                if (!record) throw Error('Could not debit user');
                return record;
            }
        } catch (error) {
            console.log(error);
        }
        throw Error('Could not credit user');
    }

    async fetch(userId: string) {
        return await this._repo.findOne({ userId });
    }
}
