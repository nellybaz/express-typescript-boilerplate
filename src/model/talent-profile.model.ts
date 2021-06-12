import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: modelNames.user, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        country: { type: String, required: true }
    },
    { timestamps: true }
);

@injectable()
export class TalentProfileModel implements IModelFactory {
    model() {
        return mongoose.model(modelNames.talentProfile, schema);
    }
}
