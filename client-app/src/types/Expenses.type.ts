export default interface IExpenses {
    _id: string,
    description: string,
    amount: number,
    date: Date,
    type: string,
    user: string,
    createdAt: Date
}