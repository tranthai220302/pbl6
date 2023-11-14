import React, {useState} from 'react'
import styles from './requestStore.module.css'
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faCheck} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
export default function RequestStore() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);
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
    const handelConfirm = async (id) =>{
      setIsPending(true);
      newRequest.post(`/user/confirm/${id}`, {
      }).then(
        (res) => {
          console.log(res.data)
          setIsPending(false);
          setError(false)
          getData()
          toast.success("Xác nhận thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
          });
        }
      ).catch((error)=>{
        setError(error.response.data)
        setIsPending(false)
      })
    }
    useEffect(()=>{
      getData()
      }, [])
      useEffect(()=>{
        if(error){
          toast.error("Không tìm thấy yêu càu mở cửa hàng!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000, 
          });
        }
        }, [error])
  return (
    <div className={styles.container}>
    <div className={styles.customer}>
          <div className={styles.navbar}>
            <div className={styles.search}>
              <input type="text"className={styles.search_input}  />
              <FontAwesomeIcon icon={faSearch} className={styles.search_icon}/>
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
                <th>Tên cửa hàng</th>
                <th>Miêu tả cửa hàng</th>
                <th>Ngày gửi yêu cầu</th>
                <th>Xác nhận</th>
            </tr>
            </thead>
            <tbody>
            {!error && data && data?.map((customer) => (
                <tr key={customer.id}>
                <td>{customer.nameStore}</td>
                <td>{customer.descStore}</td>
                <td>{moment(customer.createdAt).format("DD-MM-YYYY")}</td>
                <td>
                    <button>
                    <FontAwesomeIcon icon={faCheck} className={styles.user_icon} onClick={()=>handelConfirm(customer.customer_id)} />
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
