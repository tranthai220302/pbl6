import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './Report.module.css'
import newRequest from '../../../ults/NewRequest';
import { toast } from 'react-toastify';
function Report1({show, handleClose, id}) {
    const [text, setText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSend = () =>{
        if(text){
            setIsLoading(true)
            newRequest.post(`/report/create/${id}`, {
                desc : text
            }).then((res)=>{
                toast.success('Báo cáo thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000, 
                });
                setIsLoading(false)
            }).catch((error)=>{
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000, 
                });
                setIsLoading(false)
            })
        }
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
            {isLoading && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={450} />)}
            <textarea name="" id="" cols="60" rows="5" style={{border : '1px solid gray', outline : 'none'}} onChange={(e)=>{setText(e.target.value)}}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSend}>Gửi</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Report1;