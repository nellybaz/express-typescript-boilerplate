import { inject } from 'inversify';
import TYPES from '../../config/types';
import { WalletHistoryRepository } from '../repository';

export interface IWalletHistory {
    amount: number;
    userId: string;
    caller: string;
    type: string;
}

export class WalletHistoryService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletHistoryRepository) {}

    async create(data: IWalletHistory) {
        try {
            const response = await this._repo.create({ userId: data.userId, amount: data.amount, caller: data.caller, type: data.type });
            return response != undefined;
        } catch (error) {
            return false;
        }
    }
}
