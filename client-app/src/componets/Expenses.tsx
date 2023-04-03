import React, {useEffect, useState, Fragment, ChangeEvent  } from 'react';
import axios, {AxiosResponse} from 'axios';
import IExpenses from '../types/Expenses.type';
import { Link } from "react-router-dom";
// import ExpensesList from './ExpensesList';
import ExpenseModal from './ExpenseModal';

// You can export the type TExpensesList to use as -
// props type in  `ExpensesList` component
export type TExpensesList = IExpenses[];

const Expenses: React.FC = () => {
       // You can also use IExpenses[] as a type argument
    const [myexpensesList, setMyExpensesList] = useState<TExpensesList>([]);
    const [filterkey, setFilterkey] = useState<string>("");
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IExpenses | null);

    useEffect(() => {
        // Use [] as a second argument in useEffect for not rendering each time
        fetchAllExpense();
    }, [filterkey]);

    const viewExpense = (data: IExpenses) => {
        setDataToShow(data);
        setShowModal(true);
      };
    
   const onCloseModal = () => setShowModal(false);

  
   

    const fetchAllExpense = () => {
        axios.get<TExpensesList>('http://localhost:2021/api/v1/expense')
        .then((response: AxiosResponse) => {
            setMyExpensesList(response.data.data);
            
            response?.data.data ? setIsLoading(false): setIsLoading(true);
        });
  
      }

      const refreshItems = () => {
        fetchAllExpense();
      };

      const deleteExpense = (id: string) => {
        axios.delete<TExpensesList>(`http://localhost:2021/api/v1/expense/delete/${id}`)
        .then((response: AxiosResponse) => {
            refreshItems();
            response?.data.data ? setIsLoading(false): setIsLoading(true);
        });
      }

    
      const findByTypeAndDate = () => {
       
        axios.get<TExpensesList>(`http://localhost:2021/api/v1/expense/search/${filterkey}`)
        .then((response: AxiosResponse) => {
            console.log('search data', response.data.data)
            setMyExpensesList(response.data.data);
            response?.data.data ? setIsLoading(false): setIsLoading(true);
        });
      };



    // console.log(myexpensesList);
    // console.log(isLoading);
    //   console.log('filterkey', filterkey)
    return(
        <Fragment>
            {isLoading  ? (
                <div>Loading .....</div>
            ) : (
                // <ExpensesList items={myexpensesList}  />
                <div className="container-fluid row">
                    <div className="col-md-12">
                        <h4>My Expenses List</h4>

                        <div className="input-group mb-6">
                        <input className="form-control me-2" type="text" value={filterkey} placeholder="Search by type" aria-label="Search"
                               onChange={(e) =>setFilterkey(e.target.value)}
                         />
                         <button className="btn btn-outline-success" type="button"  onClick={()=>findByTypeAndDate()}>Filter</button>
                         <button className="btn btn-outline-secondary" type="button"  onClick={()=>{
                            fetchAllExpense()
                            setFilterkey("")
                            }}>Reset</button>
                        </div>
                        

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
                            myexpensesList?.map(ite => (
                                <tr key={ite?._id}>
                                <td>{ite?.type}</td>
                                <td>{ite?.amount}</td>
                                <td>{ite?.description}</td>
                                <td>
                                    <div className="d-grid gap-2 d-md-block ">
                                        <button type="button" className="btn btn-outline-secondary btn-sm me-md-2" onClick={() => viewExpense(ite)}>View</button>
                                        <Link to={"/expenses/" + ite?._id} className="btn btn-outline-secondary btn-sm me-md-2">Edi</Link>
                                        <button type="button" className="btn btn-outline-danger btn-sm me-md-2" onClick={() => deleteExpense(ite?._id)} >Delete</button>
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
            )}
        </Fragment>
    )
}

export default Expenses;