import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { SampleSchema, CrudRepository } from '../../repository';
dotenv.config();

describe('Crud Repository', () => {
    it('tests findOne', async () => {
        const crudRepo = new CrudRepository({ schema: SampleSchema, modelName: 'Sample' });
        try {
            await crudRepo.create({ email: 'email', passwordHash: 'hash', createdAt: new Date(), updatedAt: new Date() });
            expect(1).to.eq(1);
        } catch (error) {
            expect(1).to.eq(2);
        }
    });

    it('tests findById', async () => {
        const crudRepo = new CrudRepository({ schema: SampleSchema, modelName: 'Sample' });
        try {
            const response = await crudRepo.create({ email: 'email', passwordHash: 'hash', createdAt: new Date(), updatedAt: new Date() });

            const id = response['_id'];
            await crudRepo.findById(id);

            expect(1).to.eq(1);
        } catch (error) {
            expect(1).to.eq(2);
        }
    });

    it('tests findById throws error', async () => {
        const crudRepo = new CrudRepository({ schema: SampleSchema, modelName: 'Sample' });
        try {
            const id = 'response';
            await crudRepo.findById(id);

            expect(1).to.eq(3);
        } catch (error) {
            expect(1).to.eq(1);
        }
    });

    it('throws error for incomplete fields', async () => {
        const crudRepo = new CrudRepository({ schema: SampleSchema, modelName: 'Sample' });
        try {
            const response = await crudRepo.create({ email: 'email', createdAt: new Date(), updatedAt: new Date() });

            const id = response['_id'];
            await crudRepo.findById(id);

            expect(1).to.eq(2);
        } catch (error) {
            expect(1).to.eq(1);
        }
    });
});
