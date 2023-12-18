import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './ModalFreeShip.module.css'
import { useEffect, useState } from 'react';
import newRequest from '../../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import ModalUpdate from '../../../../compoments/ModalUpdate/ModalUpdate';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faCheck, faXmark, faBicycle, faTag} from '@fortawesome/free-solid-svg-icons';
import AddVoucher from '../AddVoucher/AddVoucher';
export default function ModalFreeShip({showExmaple, showCloseExample, id, isVoucher}) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);
    const [selectedVoucher, setSelectedVoucher] = useState(null); 
    const [name, setName1] = useState(null);
    const getData = (name) =>{
        setIsPending(true)
        if(isVoucher){
            newRequest.get(`/voucherItem/list/${id}?type=freeship&isExpire=true&name=${name}`, {
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
    }
    const handelDelete = (id)=>{
        const confirmed = window.confirm('Bạn có muốn xoá sẩn phẩm này không ?');
  
        if (confirmed) {
            newRequest.delete(`/voucherItem/delete/${id}`, {
              withCredentials: true
            })
            .then((res) => {
                getData('')
                toast.success("Xoá voucher thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000, 
                  });
            })
            .catch((error) => {
              setError(error.response.data);
              console.log(error)
              setIsPending(false);
            });
        }
    }
    useEffect(()=>{
        getData('');
    },[id])
    const handleSearchVoucher = () =>{
      getData(name)
    }
    return (
        <>
          <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className={styles.searc_ss}>
                    <div>
                        {isVoucher && (<div>Danh sách voucher FreeShipp</div>)}
                        {isVoucher && (
                            <input 
                                type="text" 
                                placeholder='Nhập tên voucher' 
                                className={styles.search} 
                                onKeyPress={handleSearchVoucher}
                                onChange={(e) => setName1(e.target.value)}
                            />
                        )}
                    </div>
                    <div className={styles.add}><AddVoucher id = {id} getData = {getData} idVoucher={2}/></div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
                {isVoucher && (
                <div className={styles.table1}>
                  <table>
                  <thead>
                    <tr>
                      <th>Ảnh</th>
                      <th>Name</th>
                      <th>Loại<nav></nav></th>
                      <th>Điều kiện</th>
                      <th>Giảm giá</th>
                      <th>Số lượng</th>
                      <th>Ngày hết hạn</th>
                      <th>Thông tin</th>
                      <th>Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!error && data && data.map((product) => (
                      <tr key={product.id}>
                        {selectedVoucher && (
                          <ModalUpdate voucher={selectedVoucher} showUpdate={true} handleCloseUpdate={() => setSelectedVoucher(null)} getData={getData} />
                        )}
                        <td>
                          <img src='https://img.meta.com.vn/Data/image/2020/10/29/freeship-la-gi-4.jpg' alt="Avatar" width="50" height="50" />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.discountType}</td>
                        <td className={styles.price}>{`Đơn hàng có giá trị >`} {product.codition}đ</td>
                        {product.discountType === 'amount' ? (
                          <td>{product.discountValue}đ</td>
                        ):(
                          <td>{product.discountValue}%</td>
                        )}
                        <td>{product.quantity}</td>
                        <td>{moment(product.expiryDate).format("DD-MM-YYYY")}</td>
                        <td>
                          <button>
                          <FontAwesomeIcon icon={faTrash} className={styles.user_icon}
                            onClick={()=>{handelDelete(product.id)}}
                            />
                          </button>
                        </td>
                        <td>
                          <button>
                          <FontAwesomeIcon icon={faPenToSquare} className={styles.user_icon} 
                                onClick={()=>{
                                setSelectedVoucher(product)
                                }} 
                          />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  {isPending && (
                    <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                  )}
                  {error && (<div className={styles.error}>{error}</div>)}
                </div>
              )}
            </Modal.Body>
          </Modal>
        </>
      );
}
