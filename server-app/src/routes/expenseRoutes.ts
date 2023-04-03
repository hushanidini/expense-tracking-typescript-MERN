import express from 'express';
import controller from '../controllers/expensesCtrl';

const router = express.Router();

router.post('/create',  controller.createExpense);
router.get('/get/:expenseId', controller.readExpenseById);
router.get('/', controller.listAll);
router.get('/filter/:start_date/:end_date', controller.getExpenseBBySelectedDate);
router.get('/search/:key', controller.searchExpense);
router.patch('/update/:expenseId', controller.updateExpense);
router.delete('/delete/:expenseId', controller.deleteExpense);
router.get('/current-month-total', controller.getCurrentMonthTotalAmount); //get current month total
router.get('/current-month-expense-type', controller.getExpenseAmountGroupByType);

export default router;