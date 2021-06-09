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
}
