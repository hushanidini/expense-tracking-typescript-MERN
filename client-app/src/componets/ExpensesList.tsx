import React, {useState } from 'react';
import { TExpensesList } from './Expenses';
import IExpenses from '../types/Expenses.type';
import ExpenseModal from './ExpenseModal';

interface ExpensesListProps {
    items: IExpenses[];// Don't have to redeclare the object again
    deleteExpense: (data: IExpenses) => void;
};
const ExpensesList: React.FC<ExpensesListProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IExpenses | null);

    const viewExpense = (data: IExpenses) => {
        setDataToShow(data);
        setShowModal(true);
      };
    
   const onCloseModal = () => setShowModal(false);
    // console.log('props', props);
    // console.log('dataToShow', dataToShow)
    return(
        <div className="container-fluid row">
            <div className="col-md-12">
                <h4>My Expenses List</h4>

                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    props?.items?.map(ite => (
                        <tr key={ite?._id}>
                        <td>{ite?.type}</td>
                        <td>{ite?.amount}</td>
                        <td>{ite?.description}</td>
                        <td>
                            <div className="d-grid gap-2 d-md-block ">
                                <button type="button" className="btn btn-secondary btn-sm me-md-2" onClick={() => viewExpense(ite)}>View</button>
                                <button type="button" className="btn btn-secondary btn-sm me-md-2">Edit</button>
                                <button type="button" className="btn btn-danger btn-sm me-md-2" >Delete</button>
                            </div> 
                                
                        </td>
                        </tr>
                    ))}
                        
                    </tbody>
                </table>

                {showModal && dataToShow !== null && (
                    <ExpenseModal onClose={onCloseModal} data={dataToShow}/>
                )}
            </div>
        </div>
    )
};

export default ExpensesList;