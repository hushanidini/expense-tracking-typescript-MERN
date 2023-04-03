import mongoose, { Document, Schema } from 'mongoose';

export interface ISystemUser {
    name: string;
    username: String;
    email: string;
    password: string;
}

export interface ISystemUserModel extends ISystemUser, Document {}

const SystemUsersSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        username: {type: String, required:true},
        email: { type: String, required: true },
        password: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ISystemUserModel>('Systemusers', SystemUsersSchema);