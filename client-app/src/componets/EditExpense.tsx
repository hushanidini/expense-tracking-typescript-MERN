import { useState, useEffect } from "react";
import IExpenses  from '../types/Expenses.type';
import axios, {AxiosResponse} from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EditExpense:  React.FC = () => {
    const { id }= useParams();
    let navigate = useNavigate();

    const [currentExpense, setCurrentExpense] = useState<IExpenses>();
  
    const getExpenseById = (id: string) => {
        axios.get<IExpenses>(`http://localhost:2021/api/v1/expense/get/${id}`)
        .then((response: AxiosResponse) => {
            if(response.data){
                setCurrentExpense(response.data.data);
                toast.success('Successfully updated.');
            }
           
        })
        .catch(function (error) {
            console.log(error);
          });
  
      }

    useEffect(() => {
        if (id)
        getExpenseById(id);
      }, [id]);
 console.log('currentExpense', currentExpense)
      const [description, setDescription] = useState<string>();
      const [type, setType] = useState<string>("");
      const [amount, setAmount] = useState<number>(0);
      const [expenseDate, setExpenseDate] = useState(moment().startOf('day').toDate());
      

      const onSubmitBtnClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = {
          description: description,
          amount: amount,
          date: expenseDate,
          type: type  
        };
     
        if(type === ''){
            toast.error('Pls select type.');
        }

        axios.patch<IExpenses>(`http://localhost:2021/api/v1/expense/update/${id}`, data)
        .then((response: AxiosResponse) => {
            if(response.data){
                toast.success('Successfully created.');
                navigate('/expenses')
            }
           
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }

       
    return(
    <div className="container-fluid row">
        <div className="col-md-12">
            <h4>Edit Expense</h4>

            {currentExpense ?
            (<form className="row g-3"  onSubmit={onSubmitBtnClickHandler}>
                <div className="col-md-6">
                    <label className="form-label">Amount</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Rs</span>
                        <input type="number" className="form-control" id="amount" value={currentExpense.amount} maxLength={10000} 
                    onChange={(e: any)=>setAmount(e.target.value)}  required/>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Type</label>
                    <select id="type" className="form-select" onChange={(e: any)=>setType(e.target.value)}>
                        <option value={""}>Choose..</option>
                        <option value={"Food"}>Food</option>
                        <option value={"Travelling"}>Travelling</option>
                        <option value={"Movies"}>Movies</option>
                        <option value={"Online Subscriptions"}>Online Subscriptions</option>
                    </select>
                </div>
               
                <div className="col-12">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Description" value={currentExpense.description} onChange={(e: any)=>setDescription(e.target.value)}  required />
                </div>
                <div className="col-6">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" placeholder="Date" 
                     onChange={(e: any)=>setExpenseDate(e.target.value)} min="2023-01-01" max="2024-12-31" 
                      required />
                </div>
               
                <div className="col-12">
                    <button type="submit" className="btn btn-outline-secondary btn-sm">Add Expense</button>
                </div>
                </form>)
                : (
                    <div>Please click expense</div>
                )}
        </div>
    </div>
    )
}

export default EditExpense;