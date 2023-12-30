import React from 'react'
import styles from './VoucherFreeShipItem.module.css'
import { useEffect, useState } from 'react';
import newRequest from '../../ults/NewRequest';
import ItemFreeShip from './ItemFreeShip/ItemFreeShip';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function VoucherFreeShipItem({id, setIsPending}) {
  const [error, setError] = useState(null);
  const [isPendingItem, setIsPendingItem] =useState(false)
  const [data, setData] = useState(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const getData = () =>{
    setIsPending(true)
      newRequest.get(`/voucherItem/list/${id}?type=freeship&isExpire=true`, {
        withCredentials: true
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
        setIsPending(false);
        setError(false)
      })
      .catch((error) => {
        setError(error.response.data)
        setIsPending(false)
      });     
  }
  useEffect(()=>{
    getData()
  },[id])
  return (
    <Slider {...settings} className={styles.containercc}>
        {data && data.map((voucher) => (
          <ItemFreeShip voucher={voucher} />
        ))}
    </Slider>
  );
}
