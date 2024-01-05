import React, { useEffect, useState } from 'react'
import styles from './Shipper.module.css'
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu'
import ApexChart from '../../../compoments/Draw/Draw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faBook, faTruckFast, faChartSimple} from '@fortawesome/free-solid-svg-icons';
import ModalCustomer from '../../../compoments/Modal/Modal';
import ModalUpdate from '../../../compoments/ModalUpdate/ModalUpdate';
import newRequest from '../../../ults/NewRequest';
import Example from '../../../compoments/ModalFull/ModalFull';
import DoanhThu from '../Store/DoanhThu/DoanhThu';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ModalListBook from '../Category/ModalListBook/ModalListBook';
import ModalTypeOrder from '../Store/ModalTypeOrder/ModalTypeOrder';
import DetailStore from '../Store/DetailStore/DetailStore';
import ModalDetailShipper from './ModalDetailShipper/ModalDetailShipper';
export default function Shipper() {
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedCustomerUpdate, setSelectedCustomerUpdate] = useState(null); 
  const [name, setName] = useState(null)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [selectOrder, setSelectOrder] = useState(null);
  const [selectDT, setSelectDT] = useState(null);
  const getData = (name, page)=>{
    setIsPending(true);
    newRequest.get(`/user/listShipper`, {
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
    getData('', 1);
  }, [])
  const handleclick = (name) =>{
    getData(name)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleclick(name);
    }
  };
  const submit = (id) => {

    confirmAlert({
      title: 'Xác nhận xoá',
      message: `Bạn có chắc muốn xoá shipper này không?`,
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
          getData('', 1)
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
          <NavbarAdmin getData={getData} isNoSearch={true}/>
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
                    <th>Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody>
                  {!error && data && data.map((customer) => (
                    <tr key={customer.id}>
                      {selectedCustomer && (
                        <ModalDetailShipper store={selectedCustomer} show={true} handleClose={() => setSelectedCustomer(null)} />
                      )}
                      <td>
                        <img src={customer?.userShipper?.avatar ? customer?.userShipper?.avatar : "https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg"} alt="Avatar" width="50" height="50" />
                      </td>
                      <td>{customer?.userShipper?.firstName} {customer?.userShipper?.lastName}</td>
                      <td>{customer?.userShipper?.address}</td>
                      <td>0{customer?.userShipper?.phone}</td>
                      <td>
                        <button>
                        <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{submit(customer?.userShipper?.id)}} />
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
          </div>
        </div>
    </div>
  )
}
