import React, { useState } from 'react'
import styles from './ListBookDetail.module.css'
import loading from '../../assets/img/loading.gif';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
import { useEffect } from 'react';


export default function ListBookDetail({admin, category,price_min,price_max,author, languages, nhaXB, name}) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    // const [category, setCategory] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [datacat, setDatacat] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const navigate = useNavigate();
    useEffect(()=>{
      console.log(category)
      console.log(price_min)
      console.log(price_max)
      console.log(author)
      console.log(languages)
      console.log(nhaXB)
    }, [category])
    const handleBookClick = (id, event) => {
      event.preventDefault();
      navigate(`/productinformation?id=${id}`);
    };


    // const getDataByCategory = ()=>{
    //   setIsPending(true);
    //   newRequest.get(`/book/search?category=${category}`, {
    //   }).then(
    //     (res) => {
    //       setData(res.data)
    //       setIsPending(false);
    //       setError(false)
    //       console.log(res.data)
    //     }
    //   ).catch((error)=>{
    //     setError(error.response.data)
    //     console.log(error)
    //     setIsPending(false)
    //   })
    // }
    // const getDataByPrice = ()=>{
    //   setIsPending(true);
    //   newRequest.get(`/book/search?category=${category}&priceMin=${price_min}&priceMax=${price_max}`, {
    //   }).then(
    //     (res) => {
    //       setData(res.data)
    //       setIsPending(false);
    //       setError(false)
    //       console.log(res.data)
    //       console.log(category)
    //     }
    //   ).catch((error)=>{
    //     setError(error.response.data)
    //     console.log(error.response.data)
    //     setIsPending(false)
    //   })
    // }
    console.log(name)
    const getData = async (page)=>{
      setIsPending(true);
      await newRequest.get(`/book/search?page=${page}&num=12&category=${category}&priceMin=${price_min}&priceMax=${price_max}&author=${author}&languages=${languages}&nhaXB=${nhaXB}&name=${name}`, {
      }).then(
        (res) => {
          setData(res.data.booksByQuery)
          setIsPending(false);
          setNumPage(res.data.numpage)
          setError(false)
          console.log(res.data)
        }
      ).catch((error)=>{
        setError(error.response.data)
        console.log(error)
        setIsPending(false)
      })
    }

    useEffect(()=>{
      getData(1);
  },[price_min,price_max,category,author,languages,nhaXB])
    return(
        
        <div className={styles.background}>
          <div className={styles.booklist}>
          {data && !isPending && !error && data.map((item)=>(
              // <div className={styles.book_item} key={item.id}  onClick={(e) => handleBookClick(item.id, e)} >
              //   <img src={item.Images[0].filename} alt="" />
              //   <div className={styles.line}>
              //     <span>
              //         {item.name}                   
              //     </span>
              //   </div>
              //   <div className={styles.line}>
              //     <b>
              //         {item.price}đ
              //     </b>
              //   </div>
              //   <button>
              //     <span>Thêm vào giỏ hàng</span>
              //   </button>
              // </div>
              <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id} onClick={(e) => handleBookClick(item.id, e)}>
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
              <span style={{
                backgroundColor : '#f1b1b0',
                borderRadius : '10px',
                display : 'flex',
                alignItems: 'center',
                justifyContent : 'center',
                fontSize: '13px',
                color: 'white',
                marginTop : '5px'
              }}>Đã bán {item.purchases}</span>
              <button>
                Mua ngay
              </button>
            </div>
            ))}
            {
              error && !isPending && (
                <div style={{display: 'flex', margin : 'auto', marginTop : '30%', flexDirection: 'column', alignItems : 'center', color : 'red'}}>
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-product-8316266-6632286.png" height={200}alt="" />
                  <span style={{fontStyle : 'italic'}}>Không tìm thấy sản phẩm</span>
                </div>
              )
            }
            {isPending && (
                <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto', marginTop : '30%'}}/>
            )}
          </div>
            <div className={styles.num_page}>
                      {numPage && numPage > 1 && [...Array(numPage)].map((_, index) => (
                          <span key={index + 1} onClick={()=>{getData(index+1)}}>{index + 1}</span>
                      ))}
            </div>
        </div>
    )

}