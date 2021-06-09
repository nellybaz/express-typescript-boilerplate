import mongoose from "mongoose";
import { CrudRepository } from "./crud.repository";
const { Schema } = mongoose;

export const UserSchema = new Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true });

export class UserRepositry extends CrudRepository {
    constructor() {
        const _schema = UserSchema;
        super({ schema: _schema, modelName: "Users" })
    }
}