import React, { useState, useEffect } from 'react'
import Chat from '../Chat/Chat'
import styles from './Home.module.css'
import newRequest from '../../ults/NewRequest'
import { Link, useNavigate, useParams } from 'react-router-dom'
import navbar from '../../assets/img/welcom.png'
import CountdownTimer from '../../compoments/CountdownTimer/CountdownTimer';


export default function Home({openChat, setOpenChat}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState([]);
  const [datacat, setDatacat] = useState([]);
  const [datafsale, setDatafsale] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFS, setIsLoadingFS] = useState(false);
  const { value } = useParams();
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
  const Navigate= (Catname)=>{
    navigate(`/booklist?category=${Catname}`)
  }


  const getCategory = async()=>{
    setIsLoading(true);
    await newRequest.get(`/category`, {
    }).then(
      (res) => {
        setDatacat(res.data)
        setIsLoading(false);
        setError(false)
      }
    ).catch((error)=>{
      setError(error.response.data)
      setIsLoading(false)
    })
  }

  const getFlashSale = async ()=>{
    setIsLoadingFS(true);
    await newRequest.get(`/book/flashSale?time=9h-11h`, {
    }).then(
      (res) => {
        setDatafsale(res.data)
        setIsLoadingFS(false);
        setError(false)
        console.log(res.data)
      }
    ).catch((error)=>{
      setError(error.response.data)
      setIsLoadingFS(false)
    })
  }
  useEffect(()=>{
    getData();
    getCategory();
    getFlashSale();
  }, [])
  const sortedData = [...data].sort((a, b) => b.purchases - a.purchases);
  const sortedpercentDiscount = [...datafsale].sort((a, b) => b.percentDiscount - a.percentDiscount);
  const top5Products = sortedData.slice(0, 5);
  const top5percentDiscount = sortedpercentDiscount.slice(0, 5);

  const navigate = useNavigate();

  // Hàm xử lý khi click vào button Xem thêm
  const handleXemThemClick = (value, event) => {
    event.preventDefault();
    navigate(`/home/more?value=${value}`);
  };

  // Hàm xử lý khi click vào sách
  const handleBookClick = (id, event) => {
    event.preventDefault();
    navigate(`/productinformation?id=${id}`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.navbar}>
        <img className={styles.navbar_main_img} src={navbar} alt="" />
        <div className={styles.navbar_child_img}>
          <img src="https://nhomin.com.vn/wp-content/uploads/2020/11/thiet-ke-bo-cuc-cuon-sach.jpeg" alt="" />
          <img src="https://dichvuphotoshop.net/wp-content/uploads/2021/03/thiet-ke-bia-sach.jpg" alt="" />
          <img src="https://freenice.net/wp-content/uploads/2021/03/Hinh-anh-sach-dep-3.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/c2/df/6a/c2df6a73ea2f82848f4ffd5a66e1e839.jpg" alt="" />
        </div>
      </div>
      <div className={`${styles.flashsale} ${styles.home_item}`}>
        <div className={styles.title}>
          {/* Cần hoàn thiện: Đến thời gian flashsale thì bắt đầu đếm ngược đến hết */}
          <span>FLASH SALE |  <CountdownTimer /></span>
        </div>
        <div className={styles.flashsale_content}>
          {/* Hiện 5 sản phẩm có lượt sale cao nhất */}
          {isLoadingFS && (
                <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={100} width={100} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>
          )}
          {datafsale && !isLoadingFS && top5percentDiscount.map((value) => (
            <div onClick={(e) => handleBookClick(value.id, e)} className={`${styles.flashsale_item} ${styles.product}`}>
              {/* Lấy 1 ảnh đầu tiên */}
              <img src={value.Images[0].filename} alt='' />
              <span>{value.name}</span>
              <b>{(value.price * (1 - value.percentDiscount)).toFixed(0)}đ</b>
              <div>
                <span className={styles.old_price}>{value.price}đ</span>
                <span className={styles.percentDiscount}>{value.percentDiscount*100}%</span>
              </div>
              <span>Đã bán: {value.purchases}</span>
            </div>
          ))}
        </div>
        <button className={styles.btn_home_item} onClick={(e) => handleXemThemClick('1', e)}>
          <span>Xem thêm</span>
        </button>
      </div>
      <div className={`${styles.danhmuc} ${styles.home_item}`}>
        <div className={styles.title}>
          <span onClick={()=>setOpenChat(true)}>DANH MỤC SẢN PHẨM</span>
        </div>
        <div className={styles.danhmuc_content}>
          {isLoading && (
                  <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={100} width={100} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>
          )}
          {datacat && !isLoading && datacat.map((value) => (
            <div className={styles.danhmuc_item} onClick={()=>Navigate(value.name)}>
              <img src={value.img} alt="" />
              <span>{value.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.hotproduct} ${styles.home_item}`}>
        <div className={styles.title}>
          <span>SẢN PHẨM BÁN CHẠY</span>
        </div>
        <div className={styles.hotproduct_content}>
          <div className={styles.hotproduct_content_line}>
            {isPending && (
                <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={100} width={100} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>
            )}
            {!isPending && top5Products.map((item) => (
              <div onClick={(e) => handleBookClick(item.id, e)} className={`${styles.hotproduct_item} ${styles.product}`} key={item.id}>
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
                <span>Đã bán: {item.purchases}</span>
                <button>
                  Mua ngay
                </button>
              </div>
            ))}
          </div>  
        </div>
        <button className={styles.btn_home_item} onClick={(e) => handleXemThemClick('2', e)}>
          <span>Xem thêm</span>
        </button>
      </div>
       <Chat />
    </div>
  )
}
