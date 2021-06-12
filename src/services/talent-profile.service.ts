import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { TalentProfileRepository } from "../repository";

@injectable()
export class TalentProfileService {
  constructor(
    @inject(TYPES.TalentProfileRepository) private _repo: TalentProfileRepository
  ){}
    update(data: any) {}

    create(data:any){
      return this._repo.create(data)
    }
}
