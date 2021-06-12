import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';

const ModelSchema = new Schema(
    {
        contractId: { type: Schema.Types.ObjectId, ref: 'TalentContract', required: true },
        stripeSessionId: { type: String, required: true },
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
