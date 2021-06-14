import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        caller: { type: String, enum: ['contract', 'transfer'], default: 'contract', required: true }
    },
    { timestamps: true }
);

@injectable()
export class WalletHistoryModel implements IModelFactory {
    model() {
        return mongoose.model(modelNames.walletHistory, schema);
    }
}
