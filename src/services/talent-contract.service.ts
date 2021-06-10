import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { TalentContractRepository } from "../repository/talent-contract.repository";

@injectable()
export class TalentContractService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: TalentContractRepository) {}

    async createContract(data:any){
      try {
        return await this._repo.create({...data, isPaid:false, dueDate: new Date()});
      } catch (error:any) {
        return {
          error: error.message
        }
      }
    }
}