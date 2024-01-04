import React, {useState} from 'react'
import styles from './requestStore.module.css'
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faSearch, faBell, faCheck, faCircleInfo, faXmark} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import DetailStoreRequest from './detailStore/DetailStoreRequest';
import ModalCancel from './cancelRequestStore/CancelRequestStore';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
export default function RequestStore() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [detailStore, setDetailStore] = useState(null)
    const [customer1, setCustomer] = useState(null)
    const [show, setShow] = useState(null)
    const submit1 = (item) => {
      confirmAlert({
        title: 'Xác nhận xoá',
        message: `Bạn có chắc muốn xác nhận không?`,
        buttons: [
          {
            label: 'Có',
            onClick: () => handleConfirm(item)
          },
          {
            label: 'Không',
            onClick: () => console.log('Click Không')
          }
        ]
      });
    };
    const getData = ()=>{
        setIsPending(true);
        newRequest.get(`/user/listRequest`, {
        }).then(
          (res) => {
            setData(res.data)
            setIsPending(false);
            setError(false)
            console.log(res.data)
          }
        ).catch((error)=>{
          setError(error.response.data)
          setIsPending(false)
        })
    }
    const handleConfirm = async (id) =>{
      setIsPending(true);
      newRequest.post(`/user/confirm/${id}`, {
      }).then(
        (res) => {
          console.log(res.data)
          setIsPending(false);
          setError(false)
          toast.success("Xác nhận thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
          });
          getData()
        }
      ).catch((error)=>{
        setError(error.response.data)
        setIsPending(false)
      })
    }
    useEffect(()=>{
      getData()
      }, [])
  return (
    <div className={styles.container}>
    <div className={styles.customer}>
      <NavbarAdmin isNoSearch={true}/>
          <div className={styles.content}>
        <div className={styles.list}>
        <div className={styles.table1}>
            <table>
            <thead>
            <tr>
                <th>Tên cửa hàng</th>
                <th>Ngày gửi yêu cầu</th>
                <th>Xem thông tin</th>
                <th>Xác nhận</th>
                <th>Từ chối</th>
            </tr>
            </thead>
            <tbody>
            {!error && data && data?.map((customer) => (
                <tr key={customer.id}>
                {selectedCustomer && (
                  <DetailStoreRequest store={selectedCustomer} show={true} handleClose={() => setSelectedCustomer(null)}/>
                )}
                {
                  show && (
                    <ModalCancel show={show} handleClose={()=>setShow(null)} id={customer1.id} getData = {getData}/>
                  )
                }
                <td>{customer.nameStore}</td>
                <td>{moment(customer.createdAt).format("DD-MM-YYYY")}</td>
                <td>
                  <button>
                      <FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon} onClick={()=>{
                        setSelectedCustomer(customer)
                      }} />
                  </button>
                </td>
                <td>
                    <button>
                    <FontAwesomeIcon icon={faCheck} className={styles.user_icon} onClick={()=>submit1(customer.customer_id)} />
                    </button>
                </td>
                <td>
                  <button>
                      <FontAwesomeIcon icon={faXmark} className={styles.user_icon} onClick={()=>{
                        setShow(true)
                        setCustomer(customer.userStore)
                      }} />
                  </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
            {error && (<div className={styles.error}>{error}</div>)}
            {isPending && (
              <div className={styles.bac_img}> <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' /></div>
        )}
        </div>
        </div>
    </div>
    </div>
    </div>
    
  )
}
