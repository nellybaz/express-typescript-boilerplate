import { inject } from 'inversify';
import TYPES from '../../config/types';
import { WalletHistoryRepository } from '../repository';


export class WalletHistoryService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletHistoryRepository) {}

    async create(data: any) {
        try {
            const amount = -1 * parseInt(data.amount.toString());
            return await this._repo.create({ userId: data.userId, amount: amount, caller:'', type:'' });
        } catch (error) {
            return false;
        }
    }

}
