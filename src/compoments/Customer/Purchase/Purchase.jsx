import React, { useState, useEffect } from 'react'
import styles from './Purchase.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStore, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
export default function Purchase() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isPendingDelete, setIsPendingDelete] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [idState, setIdState] = useState(1);
    const submit = (id) => {
        confirmAlert({
          title: 'Xác nhận xoá',
          message: `Bạn có chắc muốn xoá đơn hàng này không?`,
          buttons: [
            {
              label: 'Có',
              onClick: () => handleDelte(id)
            },
            {
              label: 'Không',
              onClick: () => console.log('Click Không')
            }
          ]
        });
      };
    const handleDelte = (id) =>{
        setIsPendingDelete(true);
        newRequest.delete(`/order/delete/${id}`).then((res)=>{
            toast.success('Xoá thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            fetchPurchases(0);
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPendingDelete(false)
        })
    }
    const handleFilterChange = (id) => {
        setIdState(id);
        fetchPurchases(id)
    };
    const navigate = useNavigate()
    const fetchPurchases = async (id) => {
        if(id==0){
            setIsPending(true);
            try {
            const res = await newRequest.get(`/order/customer?state=1`); // Replace with your API endpoint
            console.log(res)
            setData(res.data);
            setIsPending(false);
            setError(null);
            } catch (error) {
            setError(error.response.data);
            setIsPending(false);
            }
        }else{
            setIsPending(true);
            try {
            const res = await newRequest.get(`/order/customer?state=${id}`); // Replace with your API endpoint
            console.log(res)
            setData(res.data);
            setIsPending(false);
            setError(null);
            } catch (error) {
            setError(error.response.data);
            setIsPending(false)
            }
        }
    };

    useEffect(() => {
        fetchPurchases(0);
    }, []); // Fetch data on component mount, you might want to adjust this based on your needs

    const filteredPurchases = selectedFilter === 'all' ? data : data.filter(purchase => purchase.status === selectedFilter);

    return (
        <div className={styles.Purchase}>
            <div className={styles.Purchase_Title}>
                Đơn mua
            </div>
            <div className={styles.Purchase_Sub_Title} style={isPending ? {} : {borderBottom: '1px solid rgba(78, 165, 139, 0.34)'}}>
                <ul>
                    <li onClick={() => handleFilterChange(1)}>
                        Chờ xác nhận
                    </li>
                    <li onClick={() => handleFilterChange(2)}>
                        Đang giao cho vận chuyển
                    </li>
                    <li onClick={() => handleFilterChange(3)}>
                        Đang vận chuyển
                    </li>
                    <li onClick={() => handleFilterChange(4)}>
                        Hoàn thành
                    </li>
                    <li onClick={() => handleFilterChange(5)}>
                        Giao hàng không thành công
                    </li>
                    <li onClick={() => handleFilterChange(6)}>
                        Đã hủy
                    </li>
                    <li onClick={() => handleFilterChange(7)}>
                        Trả hàng/Hoàn tiền
                    </li>
                </ul>
                {isPending && (
                <img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' className={styles.img_load} />
                )}
            </div>
            <div className={styles.Purchase_Product}>
                {filteredPurchases && !isPending && !error && filteredPurchases.map((purchase, index) => (
                    <div className={styles.Purchase_Product_Item}>
                        <table>
                            <colgroup>
                                <col width='10%'/>
                                <col width='50%'/>
                                <col width='16%'/>
                                <col />
                            </colgroup>
                            <td>
                                <img src={purchase.Book.Images[0].filename} alt="" />
                            </td>
                            <td>
                                <div className={styles.Store}>
                                    <span className={styles.Store_name}>
                                        {purchase.Product_name}
                                    </span>
                                    <button onClick={()=>{navigate(`/viewstore/${purchase.store.id}`)}}>
                                        <FontAwesomeIcon icon={faStore}/>
                                        <span>{purchase.store.DetailStore.nameStore}</span>
                                    </button>
                                </div>
                                <span className={styles.Product_name}>
                                    {purchase?.Book?.name}
                                </span>
                                <div className={styles.Product_count}>
                                    <span>
                                        Số lượng: 
                                    </span>
                                    <span> {purchase.quantity}</span>
                                </div>
                                <div className={styles.time}>
                                    <span>Ngày đặt hàng:</span>
                                    <span className={styles.price} style={{color : 'gray'}}> {moment(purchase.createdAt).format("HH:mm DD-MM-YYYY")}</span>
                                </div>
                            </td>
                            <td className={styles.price}>
                                <div className={styles.new_price}>
                                    {purchase.total_price}đ
                                </div>
                            </td>
                            <td>
                                <span className={styles.status}>{purchase.State.status}</span>
                            </td>
                            {
                                idState == 1 &&(
                                    <td style={{cursor: 'pointer', color : 'red', fontSize : '13px'}}  onClick={()=>{submit(purchase.id)}}>Huỷ Đơn</td>
                                )
                            }
                            {
                                idState == 2 &&(
                                    <td style={{cursor: 'pointer', color : 'red', fontSize : '13px'}} onClick={()=>{submit(purchase.id)}}>Huỷ Đơn</td>
                                )
                            }
                        </table>
                        {error && (
                            <div>Không có đơn hàng</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}