import React, { useEffect, useState } from 'react'
import styles from './Customer.module.css'
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu'
import ApexChart from '../../../compoments/Draw/Draw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell} from '@fortawesome/free-solid-svg-icons';
import Pie from '../../../compoments/Pie/Pie';
import axios from 'axios';
import ModalCustomer from '../../../compoments/Modal/Modal';
import ModalUpdate from '../../../compoments/ModalUpdate/ModalUpdate';
import newRequest from '../../../ults/NewRequest';
export default function Customer() {
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [selectedCustomerUpdate, setSelectedCustomerUpdate] = useState(null); 
  const [name, setName] = useState(null)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const getData = (name)=>{
    setIsPending(true);
    newRequest.get(`/user/search/1?name=${name}`, {
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
  const handleclick = (name) =>{
    getData(name)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleclick(name);
    }
  };
  const handleDeleteClick = (id) => {
    const confirmed = window.confirm('Bạn có muốn xoá người dùng này không ?');
  
    if (confirmed) {
        newRequest.delete(`/user/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data);
          getData('')
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
    }
  };
  
  return (
    <div className={styles.container}>
        <SliderMenu />
        <div className={styles.customer}>
          <div className={styles.navbar}>
            <div className={styles.search}>
              <input type="text"className={styles.search_input} onChange={(e)=>{setName(e.target.value)}} onKeyPress={handleKeyPress} />
              <FontAwesomeIcon icon={faSearch} className={styles.search_icon} onClick={()=>{handleclick(name)}} />
            </div>
            <div className={styles.user}>
              <FontAwesomeIcon icon={faBell} className={styles.notify_icon} />
              <img className={styles.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHt1mwK4Kb4YVuHYIO5PUWrvcVgbYaW-Sb3g&usqp=CAU" alt="" />
            </div>
          </div>
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
                    <th>Delete</th>
                    <th>Xem</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {!error && data && data.map((customer) => (
                    <tr key={customer.id}>
                      {selectedCustomerUpdate && (
                        <ModalUpdate customer={selectedCustomerUpdate} showUpdate={true} handleCloseUpdate={() => setSelectedCustomerUpdate(null)} getData={getData} />
                      )}
                      {selectedCustomer && (
                        <ModalCustomer customer={selectedCustomer} show={true} handleClose={() => setSelectedCustomer(null)} />
                      )}
                      <td>
                        <img src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg" alt="Avatar" width="50" height="50" />
                      </td>
                      <td>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.address}</td>
                      <td>0{customer.phone}</td>
                      <td>
                        <button>
                        <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClick(customer.id)}} />
                        </button>
                      </td>
                      <td>
                        <button><FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon}
                           onClick={()=>{
                            setSelectedCustomer(customer)}} />
                        </button>
                      </td>
                      <td>
                        <button><FontAwesomeIcon icon={faPenToSquare} className={styles.user_icon} 
                          onClick={()=>{
                            setSelectedCustomerUpdate(customer)
                          }}
                        /></button>
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
            <div className={styles.draw}>
              <div className={styles.draw_line}>
                <ApexChart />
                <span className={styles.title}>Đồ thị biểu diễn số lượng khách hàng đăng ký trong 7 ngày qua</span>
              </div>
              <div className={styles.draw_line}>
                <Pie />
                <span className={styles.title}>Tỉ lệ độ tuổi của khách hàng</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
