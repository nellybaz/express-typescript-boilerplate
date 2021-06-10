import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';


export interface ITalentModel{
                amount: { type: Number, required: true },
                payerEmail: { type: Number, required: true },
                owner: { type: ObjectId, required: true },
                dueDate: { type: Date, required: true },
                currency: { type: String, required: true },
                isPaid: { type: Boolean, required: true },
                contractName: { type: String, required: true },
                description: { type: String, required: true }
            }
@injectable()
export class TalentContractModel implements IModelFactory {
    model() {
        // -amount - payerEmail - owner[userId] - dueDate - currency - isPaid - createdAt - name - description;

        const TalentContractSchema = new Schema(
            {
                amount: { type: Number, required: true },
                payerEmail: { type: Number, required: true },
                owner: { type: ObjectId, required: true },
                dueDate: { type: Date, required: true },
                currency: { type: String, required: true },
                isPaid: { type: Boolean, required: true },
                contractName: { type: String, required: true },
                description: { type: String, required: true }
            },
            { timestamps: true }
        );
        return mongoose.model('TalentContract', TalentContractSchema);
    }
}
