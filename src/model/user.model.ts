import { injectable } from "inversify";
import { IModelFactory } from "../repository";
import mongoose, { Schema } from 'mongoose'

const SampleSchema = new Schema(
    {
        email: { type: String, required: true },
        passwordHash: { type: String, required: true }
    },
    { timestamps: true }
);

@injectable()
export class UserModel implements IModelFactory {
    model() {
        
        return mongoose.model('User', SampleSchema);
    }
}
