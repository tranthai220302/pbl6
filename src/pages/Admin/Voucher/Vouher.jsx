import React, {useState} from 'react'
import styles from './Voucher.module.css'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import newRequest from '../../../ults/NewRequest';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faBook, faTruckFast, faBicycle, faTag} from '@fortawesome/free-solid-svg-icons';
import Example from '../../../compoments/ModalFull/ModalFull';
import ModalFreeShip from './ModalFreeShip/ModalFreeShip';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
export default function Voucher() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [selectVoucher, setSelectVoucher] = useState(null);
  const [selectVoucherFree, setSelectVoucherFree] = useState(null);
  const [name, setName] = useState(null)
  const getData = (name)=>{
    setIsPending(true);
    newRequest.get(`/user/search/2?name=${name}`, {
    }).then(
      (res) => {
        setData(res.data)
        setIsPending(false);
        setError(false)
      }
    ).catch((error)=>{
      setError(error.response.data)
      setIsPending(false)
    })
  }
  useEffect(()=>{
    getData('');
  }, [])
  const handleKeyPress = (e) =>{
    if (e.key === 'Enter') {
      getData(name)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.customer}>
        <NavbarAdmin />
      <div className={styles.content}>
      <div className={styles.list}>
      <div className={styles.table1}>
          <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Xem Voucher cửa hàng</th>
              <th>Xem Voucher Free_Ship</th>
            </tr>
          </thead>
          <tbody>
            {!error && data && data.map((customer) => (
              <tr key={customer.id}>
                {selectVoucher && (
                  <Example showExmaple={true} showCloseExample={()=>setSelectVoucher(null)} id = {selectVoucher.id} isVoucher={true} isOrder={false}/>
                )}
                {selectVoucherFree && (
                  <ModalFreeShip showExmaple={true} showCloseExample={()=>setSelectVoucherFree(null)} id = {selectVoucherFree.id} isVoucher={true}/>
                )}
                <td>
                  <img src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg" alt="Avatar" width="50" height="50" />
                </td>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.address}</td>
                <td>0{customer.phone}</td>
                <td>
                  <button>
                  <FontAwesomeIcon icon={faTag} className={styles.user_icon} onClick={()=>setSelectVoucher(customer)}/>
                  </button>
                </td>
                <td>
                <button>
                  <FontAwesomeIcon icon={faBicycle} className={styles.user_icon} onClick={()=>setSelectVoucherFree(customer)}/>
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
      </div>
      </div>
      </div>
    </div>
  )
}
