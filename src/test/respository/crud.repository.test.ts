import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { SampleSchema, CrudRepository } from '../../repository';
dotenv.config();

describe('Crud Repository', () => {
    it('returns test findOne', async () => {
      const crudRepo = new CrudRepository({schema:SampleSchema, modelName:'Sample'})
      try {
        await crudRepo.create({ email: 'email', passwordHash: 'hash', createdAt: new Date(), updatedAt: new Date() });
        expect(1).to.eq(1);

      } catch (error) {
        expect(1).to.eq(2);
      }
        
    });
});
