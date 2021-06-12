import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        country: { type: String, required: true }
    },
    { timestamps: true }
);

@injectable()
export class TalentContractModel implements IModelFactory {
    model() {
        return mongoose.model('Talent-Profile', schema);
    }
}
