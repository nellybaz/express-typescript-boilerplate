import { injectable } from 'inversify';
import { IModelFactory } from '../repository';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, unique: true, required: true, dropDups: true },
        amount: { type: Number, required: true}
    },
    { timestamps: true }
);

@injectable()
export class WalletModel implements IModelFactory {
    model() {
        return mongoose.model(modelNames.wallet, schema);
    }
}
