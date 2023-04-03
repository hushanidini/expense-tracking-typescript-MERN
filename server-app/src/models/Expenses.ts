import mongoose, { Document, Schema } from 'mongoose';


export interface IExpenses {
    description: string;
    amount: Number;
    date: Date;
    type: string;
    user: string;
}

export interface IExpensesModel extends IExpenses, Document {}

const ExpensesSchema: Schema = new Schema(
    {
        description: { type: String, required: true },
        amount: { type: Number, required: true ,trim: true, maxLength:20},
        date: { type: Date, required: true },
        type: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'Systemusers' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IExpensesModel>('Expenses', ExpensesSchema);