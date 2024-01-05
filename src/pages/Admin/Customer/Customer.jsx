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
import { Navbar } from 'react-bootstrap';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
export default function Customer() {
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [selectedCustomerUpdate, setSelectedCustomerUpdate] = useState(null); 
  const [name, setName] = useState(null)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [numPage, setNumpage] = useState(null)
  const getData = (name, page)=>{
    setIsPending(true);
    newRequest.get(`/user/search/1?name=${name}&page=${page}`, {
    }).then(
      (res) => {
        setData(res.data.users)
        setNumpage(res.data.numPage);
        setIsPending(false);
        setError(false)
      }
    ).catch((error)=>{
      setError(error.response.data)
      setIsPending(false)
    })
  }
  useEffect(()=>{
    getData('', 1);
  }, [])
  const handleclick = (name) =>{
    getData(name, 1)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleclick(name);
    }
  };
  const submit = (id) => {

    confirmAlert({
      title: 'Xác nhận xoá',
      message: `Bạn có chắc muốn xoá người dùng này không?`,
      buttons: [
        {
          label: 'Có',
          onClick: () => handleDeleteClick(id)
        },
        {
          label: 'Không',
          onClick: () => console.log('Click Không')
        }
      ]
    });
  };
  const handleDeleteClick = (id) => {
        newRequest.delete(`/user/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data);
          toast.success('Xoá thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
        });
          getData('')
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
  };
  
  return (
    <div className={styles.container}>
        <div className={styles.customer}>
          <NavbarAdmin getData={getData}/>
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
                  {!error && !isPending && data && data.map((customer) => (
                    <tr key={customer.id}>
                      {selectedCustomerUpdate && (
                        <ModalUpdate customer={selectedCustomerUpdate} showUpdate={true} handleCloseUpdate={() => setSelectedCustomerUpdate(null)} getData={getData} />
                      )}
                      {selectedCustomer && (
                        <ModalCustomer customer={selectedCustomer} show={true} handleClose={() => setSelectedCustomer(null)} />
                      )}
                      <td>
                        <img src={customer.avatar} alt="Avatar" width="50" height="50" />
                      </td>
                      <td>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.address}</td>
                      <td>0{customer.phone}</td>
                      <td>
                        <button>
                        <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{submit(customer.id)}} />
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
              <div className={styles.num_page}>
                    {numPage && !isPending && numPage > 1 && [...Array(numPage)].map((_, index) => (
                        <span key={index + 1} onClick={()=>{getData('',index+1)}}>{index + 1}</span>
                    ))}
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
