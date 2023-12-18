import React, { useState } from 'react'
import styles from './Voucher.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStore, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';

export default function Voucher() {
    return (
        <div className={styles.Voucher}>
            <div className={styles.Voucher_Title}>
                Voucher
            </div>
            <div className={styles.Voucher_Sub_Title}>
                <ul>
                    <li>
                        Tất cả
                    </li>
                    <li>
                        Freeship
                    </li>
                    <li>
                        Shop
                    </li>
                </ul>
            </div>
            <div className={styles.Voucher_Product}>
                <div className={styles.Voucher_Product_Item}>
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
                                    Harumi Store
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
                                Nhật ký trong tù
                            </span>
                            <div className={styles.Product_count}>
                                <span>
                                    Số lượng: 
                                </span>
                                <span>1</span>
                            </div>
                        </td>
                        <td className={styles.price}>
                            <div className={styles.old_price}>
                                150.000đ
                            </div>
                            <div className={styles.new_price}>
                                90.000đ
                            </div>
                        </td>
                        <td>
                            <span className={styles.status}>HOÀN THÀNH</span>
                        </td>
                    </table>
                </div>
            </div>
        </div>
    )
}