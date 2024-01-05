import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CancelRequestStore.module.css'
import newRequest from '../../../../ults/NewRequest';
import { toast } from 'react-toastify';
import { faTrash, faEnvelope, faMobilePhone, faWarehouse, faPenToSquare, faCircleInfo, faSearch, faBell, faAlignCenter, faL, faUser} from '@fortawesome/free-solid-svg-icons';
export default function ModalCancel({ show, handleClose, id, getData, isShipper}) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState(null);
    const handleSend = () =>{  
        console.log(message)
        setIsPending(true);
        newRequest.post(`/user/cancleRequestStore/${id}`,{
            message
        }, {
        }).then(
          (res) => {
            setData(res.data)
            setIsPending(false);
            setError(false)
            console.log(res.data)
            handleClose(false)
            getData()
            toast.success("Từ chối thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
          }
        ).catch((error)=>{
          setError(error.response.data)
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
        });
          setIsPending(false)
        })
    }
    const handleSend1 = () =>{  
      console.log("cc")
      console.log(message)
      setIsPending(true);
      newRequest.post(`/user/cancleRequestShipper/${id}`,{
          message
      }, {
      }).then(
        (res) => {
          setData(res.data)
          setIsPending(false);
          setError(false)
          console.log(res.data)
          handleClose(false)
          getData()
          toast.success("Từ chối thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000, 
          });
        }
      ).catch((error)=>{
        setError(error.response.data)
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
      });
        setIsPending(false)
      })
  }
    const [message, setMessage] = useState('')
  return (
    <>
    <Modal 
      show={show} 
      onHide={handleClose} 
      className={styles.modal}
      backdrop={false}

    >
        <Modal.Header closeButton>
          <Modal.Title>Lý do không duyệt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {isPending && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={450} />)}
            <textarea name="" id="" cols="60" rows="5" className={styles.area} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isShipper ? (
                <Button variant="secondary" onClick={handleSend1}>
                Gửi
              </Button>
          ): (
                <Button variant="secondary" onClick={handleSend}>
                  Gửi
                </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
