import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';


const TalentContractSchema = new Schema(
    {
        amount: { type: Number, required: true },
        payerEmail: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        dueDate: { type: Date, required: true },
        currency: { type: String, required: true },
        isPaid: { type: Boolean, required: true },
        contractName: { type: String, required: true },
        description: { type: String, required: true },
        emailSent: { type: Boolean, required: true }
    },
    { timestamps: true }
);


@injectable()
export class TalentContractModel implements IModelFactory {
    model() {
        return mongoose.model('TalentContract', TalentContractSchema);
    }
}
