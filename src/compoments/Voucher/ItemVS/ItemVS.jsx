import React, { useEffect, useState } from 'react'
import styles from './ItemVS.module.css';
import { format, parseISO } from 'date-fns';
import newRequest from '../../../ults/NewRequest';
import { toast } from 'react-toastify';
export default function ItemVS({ voucher, is}) {
    const [errr, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const handleBookVoucher = async(id) =>{
        setIsPending(true);
        newRequest.post(`/voucherItem/bookVoucher/${id}`, {
        }).then(
          (res) => {
            toast.success("Sưu tầm thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false);
            setError(false)
          }
        ).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setError(error.response.data)
            setIsPending(false)
        })
    }
    const currentDate = new Date();
  return (
    <div className={styles.container} style={is ? {marginTop : '20px'} : {}}>
      {
        currentDate > new Date(voucher.expiryDate) && (
          <div className={styles.expired}>Hết hạn</div>
        )
      }
        {!is && (
          <div className={styles.cricle1}></div>
        )}
        <div className={styles.voucherInfo}>
            <div className={styles.name}>
                <img src="https://cdn-icons-png.flaticon.com/512/2575/2575369.png" alt="" height={50}/>
            </div>
            <p className={styles.discount}>{voucher.discountValue}{voucher.discountType === 'amount' ? "đ" : "%"}</p>
            <p className={styles.conditions}>Đơn hàng từ {voucher.codition}đ đến ngày {format(parseISO(voucher.expiryDate), 'dd/MM/yyyy')}</p>
            {
              !is && (
                <div className={styles.st} onClick={()=>{handleBookVoucher(voucher.id)}}>Sưu tầm</div>
              )
            }
        </div>
        {!is && (
          <div className={styles.cricle3}></div>
        )}
    </div>
  );
}