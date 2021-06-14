import { inject } from "inversify";
import TYPES from "../../config/types";
import { WalletRepository } from "../repository/wallet.repository";

export class WalletService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: WalletRepository) {}


    async credit(data:any){
      return false
    }
}