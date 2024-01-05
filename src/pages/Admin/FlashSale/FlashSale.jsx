import React, { useEffect, useState } from 'react'
import styles from './FlashSale.module.css'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faBook, faTruckFast, faChartSimple} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import newRequest from '../../../ults/NewRequest';
import ModalBookFS from './ModalBookFS/ModalBookFS';
import DetailStore from '../Store/DetailStore/DetailStore';
export default function FlashSale() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const [seletedBook, setSelectBook] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const getData = ()=>{
    setIsPending(true);
    newRequest.post(`/book/store`, {date: date}, {
    }).then(
      (res) => {
        setData(res.data)
        setIsPending(false);
        setError(false)
        console.log(res.date)
      }
    ).catch((error)=>{
      setError(error.response.data)
      setIsPending(false)
      console.log(error.response.data)
    })
  }
  const handleSearch = async()=>{
    getData();
  }
  console.log(date)
  return (
    <div className={styles.container}>
        <div className={styles.flashSale}>
            <NavbarAdmin flashSale = {true} setDate = {setDate} handleSearch = {handleSearch}/>
            <div className={styles.content}>
            <div className={styles.list}>
              <div className={styles.table1}>
                <table>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Sản phẩm đăng ký FlashSale</th>
                    <th>Xem thông tin</th>
                  </tr>
                </thead>
                <tbody>
                  {!error && data && data.map((customer) => (
                    <tr key={customer.id}>
                      {seletedBook && (
                        <ModalBookFS showExmaple={true} idStore = {seletedBook}  showCloseExample={() => setSelectBook(null)} date= {date}/>
                      )}
                      {selectedStore && (
                        <DetailStore store={selectedStore} show={true} handleClose={() => setSelectedStore(null)} />
                      )}
                      <td>
                        <img src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg" alt="Avatar" width="50" height="50" />
                      </td>
                      <td>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.address}</td>
                      <td>
                        <button onClick={()=>{setSelectBook(customer.id)}}>
                        <FontAwesomeIcon icon={faBook} className={styles.user_icon}  />
                        </button>
                      </td>
                      <td>
                        <button onClick={()=>{setSelectedStore(customer)}}><FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon} />
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
