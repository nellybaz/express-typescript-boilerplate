import { injectable } from "inversify";
import { IModelFactory } from "../repository";
import mongoose, { Schema } from 'mongoose'


@injectable()
export class UserModel implements IModelFactory {
    model() {
        const SampleSchema = new Schema(
            {
                email: { type: String, required: true },
                password: { type: String, required: true }
            },
            { timestamps: true }
        );
        return mongoose.model('Userr', SampleSchema);
    }
}
