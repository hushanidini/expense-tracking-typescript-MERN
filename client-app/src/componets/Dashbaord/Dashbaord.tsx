
import React, {useEffect, useState, Fragment, ChangeEvent  } from 'react';
import axios, {AxiosResponse} from 'axios';
import IExpenses from '../../types/Expenses.type';
import { ResponsivePie } from '@nivo/pie';
// import { VictoryPie } from "victory-pie";

const Dashbaord: React.FC = () => {
    // You can also use IExpenses[] as a type argument
    const [expensListByType, setExpensListByType] = useState<IExpenses[]>([]);
    const [currentPresentage, setCurrentPresentage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        // Use [] as a second argument in useEffect for not rendering each time
        fetchGroupByAmout();
    }, [currentPresentage]);

    const fetchGroupByAmout = () => {
        axios.get<IExpenses[]>('http://localhost:2021/api/v1/expense/current-month-expense-type')
        .then((response: AxiosResponse) => {
            console.log('Response', response.data);
            setExpensListByType(response?.data?.data);
            setCurrentPresentage(response?.data?.currentMaxLimitPresentage);
            response?.data.data ? setIsLoading(false): setIsLoading(true);
        });
      }

      console.log('expensListByType', expensListByType);

    
      const dataList:any[] = [];
      expensListByType.forEach(element => {
        return dataList.push({
            'id': element?._id,
            'value': element?.amount,
        });
      });

      console.log('dataList', dataList);
    return (
        <div className="container-fluid ">
           
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Expenses</h5>
                                <div style={{height:400}}>
                                {dataList?.length > 0 && (
                                    <ResponsivePie
                                    data={dataList}
                                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    borderWidth={1}
                                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                                    arcLinkLabelsSkipAngle={10}
                                    arcLinkLabelsTextColor="#333333"
                                    arcLinkLabelsThickness={2}
                                    arcLinkLabelsColor={{ from: "color" }}
                                    arcLabelsSkipAngle={10}
                                    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                                    />
                                )}
                                </div>
                       </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Expenses Percentage</h5>

                                    <h3 className="text-primary">{`${currentPresentage}%`}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default Dashbaord;