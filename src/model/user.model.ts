import { injectable } from "inversify";
import { IModelFactory } from "../repository";
import mongoose, { Schema } from 'mongoose'
import modelNames from "../../config/model-names";

const SampleSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true }
    },
    { timestamps: true }
);

@injectable()
export class UserModel implements IModelFactory {
    model() {
        
        return mongoose.model(modelNames.user, SampleSchema);
    }
}
