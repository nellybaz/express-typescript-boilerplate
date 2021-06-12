import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';

const ModelSchema = new Schema(
    {
        contractId: { type: String, required: true },
        sessionId: { type: String, required: true },
        isPaid: { type: Boolean, required: true }
    },
    { timestamps: true }
);

@injectable()
export class StripeSessionIdContractIdModel implements IModelFactory {
    model() {
        return mongoose.model('Stripe-SessionId-ContractId', ModelSchema);
    }
}
