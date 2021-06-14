import { inject } from 'inversify';
import TYPES from '../../config/types';
import { WalletRepository } from '../repository/wallet.repository';



//TODO: credit and debit should be transactions taking other atomic operations as parameters
export class WalletService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletRepository) {}

    async init(userId: string) {
        return await this._repo.create({ userId, amount: 0 });
    }

    async credit(data: any) {
        try {
            return await this._repo.credit({ userId: data.userId, amount: data.amount });
        } catch (error) {
            return false;
        }
    }

    async fetch(userId: string) {
        return await this._repo.findOne({ userId });
    }
}
