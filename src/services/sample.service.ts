import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import TYPES from '../../config/types';
import { CrudRepository, SampleRepository } from '../repository';

@injectable()
export class SampleService {
    constructor(@inject(TYPES.SampleRepository) private _repo: SampleRepository) {}

    async getAllUsers() {
        try {
            return await this._repo.findAll();
        } catch (error) {
            return [];
        }
    }

    async addSample(data: any) {
        try {
            return await this._repo.create(data);
        } catch (error) {}
    }

    async complexAction() {
        return this._repo.complexQuery();
    }
}
