import React, { useState } from 'react'
import styles from './ListBookDetail.module.css'
import loading from '../../assets/img/loading.gif';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
import { useEffect } from 'react';

export default function ListBookDetail({admin, category,price_min,price_max,author, languages, nhaXB}) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    // const [category, setCategory] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [datacat, setDatacat] = useState([]);
    useEffect(()=>{
      console.log(category)
      console.log(price_min)
      console.log(price_max)
      console.log(author)
      console.log(languages)
      console.log(nhaXB)
    }, [category])

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
    const getData = ()=>{
      setIsPending(true);
      newRequest.get(`/book/search?category=${category}&priceMin=${price_min}&priceMax=${price_max}&author=${author}&languages=${languages}&nhaXB=${nhaXB}`, {
      }).then(
        (res) => {
          setData(res.data)
          setIsPending(false);
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
      getData();
  },[price_min,price_max,category,author,languages,nhaXB])
    return(
        
        <div className={styles.ListBookDetail}>
          <div>
          {data && !error && data.map((item)=>(
              <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id}>
                <img src={item.Images[0].filename} alt="" />
                <div className={styles.line}>
                  <span>
                      {item.name}                   
                  </span>
                  <b>
                      {item.price}đ
                  </b>
                </div>
                <button>
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>
            ))}
            {
              error && (
                <div>{error}</div>
              )
            }
            {isPending && (
              //<img src={loading} alt="loading..." />
              <div>
                <img className={styles.loading} src={loading}></img>
              </div>
            )}
          </div>
        </div>
    )

}