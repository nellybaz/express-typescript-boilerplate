import mongoose from 'mongoose'

export interface RepositoryParameter {
    schema: mongoose.Schema;
    modelName: string;
}
