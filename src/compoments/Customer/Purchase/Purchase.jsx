import React, { useState, useEffect } from 'react'
import styles from './Purchase.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStore, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest'

export default function Purchase() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [idState, setIdState] = useState(null);
    const handleFilterChange = (id) => {
        setIdState(id);
        fetchPurchases(id)
    };

    const fetchPurchases = async (id) => {
        if(id==0){
            setIsPending(true);
            try {
            const res = await newRequest.get(`/order/customer`); // Replace with your API endpoint
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
            <div className={styles.Purchase_Sub_Title}>
                <ul>
                    <li onClick={() => handleFilterChange(0)}>
                        Tất cả
                    </li>
                    <li onClick={() => handleFilterChange(1)}>
                        Chờ xác nhận
                    </li>
                    <li onClick={() => handleFilterChange(2)}>
                        Đang giao cho vận chuyển
                    </li>
                    <li onClick={() => handleFilterChange(3)}>
                        Đang vận chuyển
                    </li>
                    <li>
                        Chờ giao hàng
                    </li>
                    <li>
                        Hoàn thành
                    </li>
                    <li>
                        Đã hủy
                    </li>
                    <li>
                        Trả hàng/Hoàn tiền
                    </li>
                </ul>
            </div>
            <div className={styles.Purchase_Product}>
                {filteredPurchases && filteredPurchases.map((purchase, index) => (
                    <div className={styles.Purchase_Product_Item}>
                        <table>
                            <colgroup>
                                <col width='10%'/>
                                <col width='50%'/>
                                <col width='16%'/>
                                <col />
                            </colgroup>
                            <td>
                                <img src="https://img.cand.com.vn/resize/800x800/NewFiles/Images/2023/05/13/bac_ho-1683976113500.jpg" alt="" />
                            </td>
                            <td>
                                <div className={styles.Store}>
                                    <span className={styles.Store_name}>
                                        {purchase.Product_name}
                                    </span>
                                    <button>
                                        <FontAwesomeIcon icon={faMessage}/>
                                        <span>Chat</span>
                                    </button>
                                    <button>
                                        <FontAwesomeIcon icon={faStore}/>
                                        <span>Xem Store</span>
                                    </button>
                                </div>
                                <span className={styles.Product_name}>
                                    {purchase.Book.name}
                                </span>
                                <div className={styles.Product_count}>
                                    <span>
                                        Số lượng: 
                                    </span>
                                    <span>{purchase.quantity}</span>
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
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}