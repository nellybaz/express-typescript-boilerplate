import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';

const ModelSchema = new Schema(
    {
        contractId: { type: Schema.Types.ObjectId, ref: modelNames.talentContract, required: true },
        stripeSessionId: { type: String, required: true },
        isPaid: { type: Boolean, required: true }
    },
    { timestamps: true }
);

@injectable()
export class StripeSessionIdContractIdModel implements IModelFactory {
    model() {
        return mongoose.model(modelNames.stripeSessionIdContractId, ModelSchema);
    }
}
