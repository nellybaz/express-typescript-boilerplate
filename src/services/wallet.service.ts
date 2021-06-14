import { inject } from 'inversify';
import TYPES from '../../config/types';
import { WalletRepository } from '../repository';
import { WalletHistoryService } from './wallet-history.service';

//TODO: credit and debit should be transactions taking other atomic operations as parameters
export class WalletService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletRepository, @inject(TYPES.WalletHistoryService) private _walletHistoryService: WalletHistoryService) {}

    async init(userId: string) {
        return await this._repo.create({ userId, amount: 0 });
    }

    async credit(data: any) {
        try {
            const amount = parseInt(data.amount.toString());
            const history = await this._walletHistoryService.create({ userId: data.userId, amount, caller: 'contract', type: 'credit' });
            if (history) return await this._repo.credit({ userId: data.userId, amount: amount });
            return {
                error: 'Could not credit user'
            };
        } catch (error) {
            return false;
        }
    }
    async debit(data: any) {
        try {
            const amount = -1 * parseInt(data.amount.toString());
            const history = await this._walletHistoryService.create({ userId: data.userId, amount: Math.abs(amount), caller: 'contract', type: 'debit' });
            if (history) return await this._repo.credit({ userId: data.userId, amount: amount });
            return {
                error: 'Could not credit user'
            };
        } catch (error) {
            return false;
        }
    }

    async fetch(userId: string) {
        return await this._repo.findOne({ userId });
    }
}
