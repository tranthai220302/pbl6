import React from 'react'
import styles from './ModalBookFS.module.css'
import { useEffect, useState } from 'react';
import newRequest from '../../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faCheck, faXmark, faBicycle, faTag, faPen, faPenSquare} from '@fortawesome/free-solid-svg-icons';
import ModalInfoBook from '../ModalInfoBook/ModalInfoBook';
export default function ModalBookFS({showExmaple, showCloseExample, idStore, date}) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isPendingConfirm, setIsPendingConfirm] = useState(false)
    const [error, setError] = useState(null);
    const [idBookFS, setIdBookFS] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null); 
    const getData = () =>{
    setIsPending(true)
        newRequest.post(`/book/bookFlas/${idStore}`,{date}, {
            withCredentials: true
        })
        .then((res) => {
            setData(res.data)
            console.log(res.data)
            setIsPending(false);
            setError(false)
        })
        .catch((error) => {
            setError(error.response.data)
            setIsPending(false)
        });
    }
    const handleAddIdBook = (e)=>{
      if(e.target.checked){
        setIdBookFS([...idBookFS, parseInt(e.target.value)])
      }else {
        setIdBookFS(idBookFS.filter((item)=> item !== parseInt(e.target.value)))
      }
    }
    useEffect(()=>{
        getData()
    },[idStore])
    const handleConfirmFS = () =>{
      setIsPendingConfirm(true);
      newRequest.post(`/book/confirmFlashSale/${idStore}`, {id : idBookFS}).then((res)=>{
        toast.success("Xác nhận thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
      });
        getData()
        setIsPendingConfirm(false)
        setIdBookFS([])
      }).catch((error)=>{
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
        setIsPendingConfirm(false)
      })
    }
    const handleCancelFS = () =>{
      setIsPendingConfirm(true);
      newRequest.post(`/book/cancelBookFS/${idStore}`, {id : idBookFS}).then((res)=>{
        toast.success("Từ chối thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
        getData()
        setIsPendingConfirm(false)
        setIdBookFS([ ])
      }).catch((error)=>{
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
        setIsPendingConfirm(false)
      })
    }
    console.log(idBookFS)
    return (
        <>
          <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className={styles.searc_ss}>
                    Danh sách Sách đăng ký FlashSale
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                <div className={styles.table1}>
                  <table>
                  <thead>
                    <tr>
                      <th>Xác nhận</th>
                      <th>Ảnh</th>
                      <th>Name</th>
                      <th>Ngày đăng ký</th>
                      <th>Thời gian đăng ký</th>
                      <th>Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!error && data && data.map((product) => (
                      <tr key={product.id}>
                        {
                            selectedVoucher && (
                                <ModalInfoBook id = {selectedVoucher} show={true} handleClose={()=>{setSelectedVoucher(null)}}/>
                            )
                        }
                        <th><input type="checkbox" name="" id="" value={product.id} onChange={(e)=>{handleAddIdBook(e)}} /></th>
                        <td>
                          <img src={product.Images[0].filename} alt="Avatar" width="50" height="50" />
                        </td>
                        <td>{product.name}</td>
                        <td>{moment(product.dateFlashSale).format("DD-MM-YYYY")}</td>
                        <td>{product.timeFlashSale}</td>
                        <td className={styles.price}>
                           <button onClick={()=>{setSelectedVoucher(product.id)}}>
                           <FontAwesomeIcon icon={faCircleInfo} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  {isPending && (<img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>)}
                  {isPendingConfirm && (<img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>)}
                  {error && (<div className={styles.error}>{error}</div>)}
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{handleConfirmFS()}}>
              Duyệt
            </Button>
            <Button style={{ backgroundColor: 'red' }} variant="secondary" onClick={() => { handleCancelFS() }}>
              Từ chối
            </Button>

          </Modal.Footer>
          </Modal>
        </>
      );
}
