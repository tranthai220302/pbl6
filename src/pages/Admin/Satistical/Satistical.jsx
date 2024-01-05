import React from 'react'
import styles from './Satistical.module.css'
import ApexChart from '../../../compoments/Draw/Draw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faTruckFast, faBook} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Pie from '../../../compoments/Pie/Pie';
import DrawLine from '../../../compoments/DrawLine/DrawLine';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
export default function Satistical() {
  const date = new Date();
  console.log(date.getMonth() + 1)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [data, setData] = useState(null);
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [monthDraw, setMonthDraw] = useState(date.getMonth() + 1);
  const [dataStore, setDataStore] = useState(null)
  const handleKeyPress = (e) =>{
    if (e.key === 'Enter') {
      setMonth(e.target.value)
    }
  }
  const handleKeyPressDraw = (e) =>{
    if (e.key === 'Enter') {
      setMonthDraw(e.target.value)
    }
  }
  return (
    <div className={styles.container}>
      <NavbarAdmin isNoSearch={true}/>
        <div className={styles.content}>
          <div className={styles.draw}>
            <div className={styles.pie}>
            <input type="text" placeholder='Nhập tháng...' onKeyPress={(e) => handleKeyPressDraw(e)} className={styles.input_month}/>
              <Pie admin = {true} month={monthDraw}/>
              <span className={styles.name_draw}>Phần trăm doanh của các cửa hàng</span>
            </div>
            <div className={styles.draw_line}>
              <input type="text" placeholder='Nhập tháng...' onKeyPress={(e) => handleKeyPress(e)} className={styles.input_month}/>
              <ApexChart store={true} month = {month} className = {styles.apchart} setDataStore = {setDataStore} />
              <span className={styles.name_draw}>Những cửa hàng có thu nhập cao trong tháng {month}</span>
            </div>
          </div>
          <div className={styles.store_high}>
            <span className={styles.title}>Danh sách cửa hàng có doanh thu cao trong tháng {month}</span>
            <div className={styles.table1}>
                  <table>
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Delete</th>
                      <th>Xem</th>
                      <th>Update</th>
                      <th>Sản phẩm</th>
                      <th>Đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataStore && dataStore.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <img src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg" alt="Avatar" width="50" height="50" />
                        </td>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.address}</td>
                        <td>0{customer.phone}</td>
                        <td>
                          <button>
                          <FontAwesomeIcon icon={faTrash} className={styles.user_icon}  />
                          </button>
                        </td>
                        <td>
                          <button><FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon} />
                          </button>
                        </td>
                        <td>
                          <button><FontAwesomeIcon icon={faPenToSquare} className={styles.user_icon} 
                          /></button>
                        </td>
                        <td>
                          <button><FontAwesomeIcon icon={faBook} className={styles.user_icon} 

                          /></button>
                        </td>
                        <td>
                          <button><FontAwesomeIcon icon={faTruckFast} className={styles.user_icon} 

                          /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  {!dataStore && (
                    <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                  )}
                  {error && (<div className={styles.error}>{error}</div>)}
              </div>
              <div className={styles.draw_star}>
                <DrawLine run = {true} />  
              </div>
              <div className={styles.draw_book}>
              <ApexChart book={true} />
              </div>
          </div>
        </div>
    </div>
  )
}
