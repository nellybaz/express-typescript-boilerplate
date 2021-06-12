import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IStripeSessionIdContractIdData } from "../interfaces/stripe-contract-id.interface";
import { StripeSessionIdContractIdRepository } from "../repository/stripe-session-contract-id.repository";

@injectable()
export class StripeSessionIdContractIdService {
    constructor(@inject(TYPES.StripeSessionIdContractIdRepository) private _repo: StripeSessionIdContractIdRepository) {}

    async create(data: IStripeSessionIdContractIdData):Promise<boolean> {
        try {
          return (await this._repo.create(data)) != null;
        } catch (error) {
          console.log(error);
          return false;
        }
    }
}