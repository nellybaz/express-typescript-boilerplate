import { UserRepository } from '../repository';

export class UserService {
    _repo: UserRepository;
    constructor(repository: UserRepository) {
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
