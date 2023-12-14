import React, { useEffect, useState } from 'react'
import styles from './HomeDetail.module.css'
import newRequest from '../../../ults/NewRequest'
import { Link, useLocation  } from 'react-router-dom'
import CountdownTimer from '../../../compoments/CountdownTimer/CountdownTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCircleCheck, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function HomeDetail() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);
    const [datafsale, setDatafsale] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get('value');
    
    const getData = ()=>{
        setIsPending(true);
        newRequest.get(`/book`, {
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

    const getFlashSale = async ()=>{
        setIsPending(true);
        await newRequest.get(`/book/flashSale?time=9h-11h`, {
        }).then(
          (res) => {
            setDatafsale(res.data)
            setIsPending(false);
            setError(false)
            console.log(res.data)
          }
        ).catch((error)=>{
          setError(error.response.data)
          setIsPending(false)
        })
    }

    useEffect(()=>{
        getData();
        getFlashSale();
      }, [])

    const sortedData = [...datafsale].sort((a, b) => b.purchases - a.purchases);
    const sortedpercentDiscount = [...sortedData].sort((a, b) => b.percentDiscount - a.percentDiscount);
    const sortedDataHotProduct = [...data].sort((a, b) => b.sales_number - a.sales_number);
    
    return (
        <div className={styles.HomeDetail}>
          <div className={styles.BtnBack}>
            <FontAwesomeIcon icon={faBackward}/>
            <Link className={styles.Back} to={'/'}>Quay lại</Link>
          </div>
          {value === '1' ? (
            <div className={styles.home_item}>
              <div className={styles.title}>
                {/* Cần hoàn thiện: Đến thời gian flashsale nào thì hiện các sản phẩm flashsale của thời gian đó */}
                <span>FLASH SALE |  <CountdownTimer /></span>
              </div>
              <div className={`${styles.content} ${styles.productContainer}`}>
                {/* Hiện tất cả sản phẩm flashsale */}
                {datafsale && sortedpercentDiscount.map((value) => (
                    <div className={`${styles.flashsale_item} ${styles.product}`}>
                      {/* Lấy 1 ảnh đầu tiên */}
                      <img src={value.Images[0].filename} alt='' />
                      <span>{value.name}</span>
                      <b>{(value.price * (1 - value.percentDiscount)).toFixed(0)}đ</b>
                      <div>
                          <span className={styles.old_price}>{value.price}đ</span>
                          <span className={styles.percentDiscount}>{value.percentDiscount*100}%</span>
                      </div>
                      <button>
                        Mua ngay
                      </button>
                    </div>
                ))}
              </div>
            </div>
          ) : value === '2' ? (
            <div className={styles.home_item}>
              <div className={styles.title}>
                <span>SẢN PHẨM BÁN CHẠY</span>
              </div>
              <div className={`${styles.content} ${styles.productContainer}`}>
                  {sortedDataHotProduct.map((item) => (
                    <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id}>
                      <img src={item.Images[0].filename} alt='' />
                      <span>{item.name}</span>
                      {item.percentDiscount > 0 ? (
                        <div>
                          <b>{(item.price * (1 - item.percentDiscount)).toFixed(0)}đ</b>
                          <div>
                            <span className={styles.old_price}>{item.price}đ</span>
                            <span className={styles.percentDiscount}>{item.percentDiscount*100}%</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <b>{item.price}đ</b>
                          <div>
                            <span className={styles.current_price}></span>
                          </div>
                        </div>
                      )}
                      <button>
                        Mua ngay
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <span>Default Title</span>
          )}
        </div>
    )
}