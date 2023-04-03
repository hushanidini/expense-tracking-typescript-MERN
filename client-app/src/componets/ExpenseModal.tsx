import IExpenses  from '../types/Expenses.type';
import {Modal, Button} from 'react-bootstrap';

type Props = {
    onClose: () => void;
    data: IExpenses;
  };

const ExpenseModal  = (props: Props) => {
    const { onClose, data } = props;
    return(
        <Modal show={data?true: false} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Expense details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row col-md-12'>
                <label>Type : {data?.type}</label>
                <label>amount : {data?.amount}</label>
                <label>Description : {data?.description}</label>
            </div>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"   onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ExpenseModal;