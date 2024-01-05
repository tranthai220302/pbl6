import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './Report.module.css'
import newRequest from '../../../ults/NewRequest';
import { toast } from 'react-toastify';
function Report1({show, handleClose, id}) {
    const [text, setText] = useState(null);
    const handleSend = () =>{
        newRequest.post(`/report/create/${id}`, {
            desc : text
        }).then((res)=>{
            toast.success('Báo cáo thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
        })
    }
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lý dó báo cáo sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <textarea name="" id="" cols="60" rows="5" style={{border : '1px solid gray', outline : 'none'}}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Gửi</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Report1;