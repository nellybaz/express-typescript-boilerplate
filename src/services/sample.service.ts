import { SampleRepository } from '../repository';

export class SampleService {
    _repo: SampleRepository;
    constructor(repository: SampleRepository) {
        this._repo = repository;
    }

    async getAllUsers(){
      try {
        return await this._repo.findAll();
      } catch (error) {
        return [];
      }
    }

    async addSample(data:any){
      // validate data here
      try {
        return await this._repo.create(data)
      } catch (error) {
        
      }
    }

    async complexAction(){
      return this._repo.complexQuery()
    }
}
