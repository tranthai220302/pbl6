import React from 'react'
import styles from './SliderMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faShippingFast, faTicketAlt} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { itemsCustomer, itemsShipper, itemsStore, itemsVoucher } from '../../data';
import { Link } from 'react-router-dom';
export default function SliderMenu({seOpen}) {
    const [isKhachHangOpen, setIsKhachHangOpen] = useState(false);
    const [isCuaHangOpen, setIsCuaHangOpen] = useState(false);
    const [isShipperOpen, setIsShipperOpen] = useState(false);
    const [isVoucherOpen, setIsVoucherOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (index) => {
      setSelectedItem(index);
    };
  return (
    <div className={styles.sidebar_menu}>
        <div className={styles.sidebar_header}>
            <div className={styles.logo}>
                <img className={styles.img_logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OQc61XrE2CMqNfb5-1vJap_bkF5Jzex6_g&usqp=CAU" alt="" />
            </div>
        </div>
    <div className={styles.main_menu}>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsKhachHangOpen(!isKhachHangOpen)}}>
                <FontAwesomeIcon icon={faUser} className={styles.user_icon} />
                <span><Link to = '/admin/customer' className={styles.name_item}>Khách hàng</Link></span>

            </div>
            {isKhachHangOpen && (
                <ul className={styles.require}>
                {itemsCustomer.map((item, index) => (
                    <li
                        className={styles.item_require}
                        key={index}
                        onClick={() => handleItemClick(index)}
                    >
                        <span className={index == selectedItem ? styles.item_require_select : styles.item_require}>{item}</span>
                    </li>
                ))}
            </ul>
            )}
        </div>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsCuaHangOpen(!isCuaHangOpen)}}>
                <FontAwesomeIcon icon={faStore} className={styles.store_icon} />
                <span><Link to = '/admin/store' className={styles.name_item}>Cửa hàng</Link></span>

            </div>
            {isCuaHangOpen && (
                <ul className={styles.require}>
                    {itemsStore.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 3)}
                        >
                            <span className={index + 3 == selectedItem ? styles.item_require_select : styles.item_require}>{item}</span>
                        </li>
                        ))}
                </ul>
            )}
        </div>
        <div className={styles.item} >
            <div className={styles.name} onClick={()=>{setIsShipperOpen(!isShipperOpen)}}>
                <FontAwesomeIcon icon={faShippingFast} className={styles.ship_icon} />
                <span><Link to = '/admin/shipper' className={styles.name_item}>Shipper</Link></span>

            </div>
            {isShipperOpen && (
                <ul className={styles.require}>
                    {itemsShipper.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 7)}
                        >
                            <span className={index + 7 == selectedItem ? styles.item_require_select : styles.item_require}>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsShipperOpen(!isShipperOpen)}}>
                <FontAwesomeIcon icon={faTicketAlt} className={styles.voucher_icon} />
                <span><Link to = '/admin/voucher' className={styles.name_item}>Voucher</Link></span>

            </div>
            {isVoucherOpen && (
                <ul className={styles.require} onClick={()=>{setIsShipperOpen(!isShipperOpen)}}>
                    {itemsVoucher.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 11)}
                        >
                            <span className={index + 11 == selectedItem ? styles.item_require_select : styles.item_require}>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
</div>
  )
}
