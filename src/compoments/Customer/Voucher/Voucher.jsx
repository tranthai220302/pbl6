import React, { useState, useEffect } from 'react'
import styles from './Voucher.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStore, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ItemVS from '../../Voucher/ItemVS/ItemVS';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ItemFreeShip from '../../VoucherFreeShip/ItemFreeShip/ItemFreeShip';
import { setISODay } from 'date-fns';
export default function Voucher() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isPendingItem, setIsPendingItem] =useState(false)
    const [data, setData] = useState(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
    const getData = (id) =>{
        setIsPending(true)
        newRequest.get(`/voucherItem`, {
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
        getData(1)
      },[])
    return (
        <div className={styles.Voucher}>
            <div className={styles.Voucher_Title}>
                Voucher
            </div>
            <div className={styles.Voucher_Sub_Title} style={isPending ? {} : {borderBottom: '1px solid rgba(78, 165, 139, 0.34)'}}>
                {isPending && (
                    <img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' className={styles.img_load} />
                )}
            </div> 
            <div className={styles.Voucher_Product}>
                {data && data.map((voucher) => {
                    if(voucher.VoucherId == 2){
                        return (
                            <ItemFreeShip voucher={voucher} is = {true}/>
                        )
                    }else{
                        return (
                            <ItemVS voucher={voucher} is ={true}/>
                        )
                    }
                })}      
            </div>
        </div>
    )
}