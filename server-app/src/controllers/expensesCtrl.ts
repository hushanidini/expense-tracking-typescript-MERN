import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Expenses from '../models/Expenses';
import moment from 'moment';

/** create expenses */
const createExpense =   async (req: Request, res: Response, next: NextFunction) => {
    const { description, amount, date, type, user } = req.body;
   
    if(amount <= 0 ){
        return res.status(400).json({msg: 'Amount must be positive value'});
    }

    // Set max monthly expense amount (Ex. 10,000.00 )
    let  maxMonthyExpenseAmount: number  = 10000;

        const  currentMonthExpenseAmount =  await Expenses.aggregate(
            [
                { $match: { date: {$gte: moment().startOf('month').toDate(), $lte:  moment().endOf('month').toDate()} } },
                { $group: { _id: null, total_amount: { $sum: "$amount" } } }
            ],
            );
        const monthExpenseAmount = currentMonthExpenseAmount? currentMonthExpenseAmount[0].total_amount: 0;
        
       
        if(amount > maxMonthyExpenseAmount){
            return res.status(400).json({msg: 'Max monthly amount is 10000'});
        }

        if(monthExpenseAmount > maxMonthyExpenseAmount){
            return res.status(400).json({msg: 'Max monthly amount not greater than max monthly limit'});
        }
  

    const expense =  new Expenses({
        _id: new mongoose.Types.ObjectId(),
        description,
        amount,
        date,
        type,
        user: '642884e406d2b6827ee4a534' // give hard code user id untill create login function
    });

    try {
        const expense_res = await expense
            .save();
        return res.status(201).json({   msg: 'created Successfuly',
        data:expense_res });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/** read expense details by id */
const readExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    const expenseId = req.params.expenseId;

    try {
        const expense = await Expenses.findById(expenseId);
        return (expense ? res.status(200).json({  
        data: expense }) : res.status(404).json({ msg: 'not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/** Get all  */
const listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenses = await Expenses.find().sort({createdAt: -1});
        return res.status(200).json({ data:expenses });
    } catch (error) {
        return res.status(500).json({ error });
    }
};


/** Get current month total expense  */
const getCurrentMonthTotalAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentMonthExpenseAmount =  await Expenses.aggregate(
            [
                { $match: { date: {$gte: moment().startOf('month').toDate(), $lte:  moment().endOf('month').toDate()} } },
                { $group: { _id: null, total_amount: { $sum: "$amount" } } }
            ],
          );

          const maxMonthyExpenseAmount = 10000;
          const monthlyExpenseAmount = currentMonthExpenseAmount ? currentMonthExpenseAmount[0].total_amount : 0;
          const monthlyExpensePresentage = (monthlyExpenseAmount/maxMonthyExpenseAmount)*100;
        //   console.log(JSON.stringify(currentMonthExpenseAmount));
        return res.status(200).json({ total_amount:currentMonthExpenseAmount ? currentMonthExpenseAmount[0].total_amount : currentMonthExpenseAmount , 
            currentMaxLimitPresentage: monthlyExpensePresentage});
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/** Type expenses amount */
const getExpenseAmountGroupByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // total amount for all expense
        const currentMonthExpenseAmount =  await Expenses.aggregate(
            [
                { $match: { date: {$gte: moment().startOf('month').toDate(), $lte:  moment().endOf('month').toDate()} } },
                { $group: { _id: null, total_amount: { $sum: "$amount" } } }
            ],
          );

        const maxMonthyExpenseAmount = 10000;
        const totalAmount = currentMonthExpenseAmount ? currentMonthExpenseAmount[0].total_amount : 0 ;
        const monthlyExpensePresentage = (totalAmount/maxMonthyExpenseAmount)*100;
        // total amount group by type
        const currentMonthExpenseAmountByType =  await Expenses.aggregate(
            [
                { $match: { date: {$gte: moment().startOf('month').toDate(), $lte:  moment().endOf('month').toDate()} } },
                { $group: { _id: "$type", amount: { $sum: "$amount" } } }
            ],
          );
        return res.status(200).json({ data: currentMonthExpenseAmountByType , totalAmount: totalAmount, currentMaxLimitPresentage: monthlyExpensePresentage,
            start_date: moment().startOf('month').toDate(), end_date: moment().endOf('month').toDate()});
    } catch (error) {
        return res.status(500).json({ error });
    }
};



/**
 * get expenses by selected start and end date
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const getExpenseBBySelectedDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const selectedStartDate = req.params.start_date;
        const selectedEndDate = req.params.end_date;
        const startDate = selectedStartDate ? moment(selectedStartDate).startOf('day') : moment().startOf('month');
        const endDate = selectedEndDate ? moment(selectedEndDate).endOf('day') : moment().endOf('month');
        
        if(selectedStartDate && selectedEndDate){
            const expenses = await Expenses.find({
                date: {
                  $gte: startDate.toDate(),
                  $lte: endDate.toDate()
                }
              }).sort({createdAt: -1});
              return res.status(200).json({ 
                data:expenses });
        }else{
            const expenses = await Expenses.find({
                date: {
                  $gte: moment().startOf('month').toDate(),
                  $lte: moment().endOf('month').toDate()
                }
              }).sort({createdAt: -1});
            return res.status(200).json({  data:expenses });
        }

      
         
    } catch (error) {
        return res.status(500).json({ error });
    }
};

/**
 * Search expense By type
 */
const searchExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchkey = req.params.key;
            const expenses = await Expenses.find({
                "$or":[
                    {type: {$regex:searchkey}},
                ]
              }).sort({createdAt: -1});

              return res.status(200).json({ 
                data:expenses });
        
        
    } catch (error) {
        return res.status(500).json({ error });
    }
};


/** Update Expense */
const updateExpense =  (req: Request, res: Response, next: NextFunction) => {
    const expenseId = req.params.expenseId;

    return  Expenses.findById(expenseId)
        .then((expense) => {
            if (expense) {
                expense.set(req.body); 

                return  expense
                    .save()
                    .then((expense) => res.status(201).json({ msg: 'updated Successfuly',
                    data: expense }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

/** Delete Expense */
const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    const expenseId = req.params.expenseId;

    try {
        const expense = await Expenses.findByIdAndDelete(expenseId);
        return (expense ? res.status(201).json({ msg: 'Deleted Successfuly',
        data:expense}) : res.status(404).json({ msg: 'not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createExpense, readExpenseById, listAll, getCurrentMonthTotalAmount, getExpenseAmountGroupByType, searchExpense, getExpenseBBySelectedDate, updateExpense, deleteExpense };
