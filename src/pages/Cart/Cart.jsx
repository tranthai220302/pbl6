import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    return (
        <div className={styles.cart}>
            <div className={styles.left}>
                <div className={styles.customer_info}>
                    <div className={styles.title}>
                        <span>Thông tin giao hàng</span>
                    </div>
                    <table>
                        <colgroup>
                            <col width="20%"/>
                            <col />
                        </colgroup>
                        <tr>
                            <th>Tên người nhận</th>
                            <td>Trương Thị Khánh Linh</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>0384616499</td>
                        </tr>
                        <tr>
                            <th>Địa chỉ</th>
                            <td>K16/06 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.product_cart}>
                    <div className={styles.title}>
                        <span>
                            Sản phẩm
                        </span>
                    </div>
                    <div className={styles.product_cart_content}>
                        <div className={styles.item}>
                            <input className={styles.checkbox} type="checkbox" />
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                            <div className={styles.product_name}>
                                <span>Thay Đổi Cuộc Sống Với Nhân Số Học</span>
                            </div>
                            <div className={styles.product_price}>
                                <span className={styles.new_price}>
                                    63.000đ
                                </span>
                                <span className={styles.old_price}>90.000đ</span>
                            </div>
                            <input className={styles.count} type="number" name="" id="" />
                            <div>
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.pay}>
                    <div className={styles.title}>
                        <span>Đặt hàng</span>
                    </div>
                    <div className={styles.pay_content}>
                        <div>
                            <span>
                                Chọn phương thức thanh toán
                            </span>
                            <form action="">
                                <input type="radio" id='1' name='thanhtoan'/>
                                <label htmlFor="1">Thanh toán khi nhận hàng</label><br></br>
                                <input type="radio" id='2' name='thanhtoan'/>
                                <label htmlFor="2">Thanh toán online</label>
                            </form>
                            <div className={styles.voucher}>
                                <span>Voucher</span>
                                <div className={styles.voucher_content}>
                                    <input type="text" placeholder='Nhập mã giảm giá' />
                                    <button>Nhập</button>
                                </div>
                            </div>
                            <div className={styles.total}>
                                <span>Thành tiền</span>
                                <table>
                                    <tr>
                                        <th>Tổng số tiền sản phẩm: </th>
                                        <td>180.000đ</td>
                                    </tr>
                                    <tr>
                                        <th>Tiền ship: </th>
                                        <td>30.000đ</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng: </th>
                                        <td>210.000đ</td>
                                    </tr>
                                </table>
                            </div>
                            <div className={styles.btn}>
                                <button>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}