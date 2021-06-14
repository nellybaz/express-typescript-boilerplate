import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';


const TalentContractSchema = new Schema(
    {
        amount: { type: Number, required: true },
        payerEmail: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: modelNames.talentProfile },
        dueDate: { type: Date, required: true },
        currency: { type: String, enum: ['$', '₦'], default: '$', required: true },
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
        return mongoose.model(modelNames.talentContract, TalentContractSchema);
    }
}
