import React from 'react'
import styles from './SliderMenu.module.css'
import logo from '../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore, faShippingFast, faTicketAlt, faBolt, faList} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { itemsCustomer, itemsShipper, itemsStore, itemsVoucher } from '../../data';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { itemFlashSale } from '../../data';
import { itemCategory } from '../../data';
export default function SliderMenu({seOpen}) {
    const [isKhachHangOpen, setIsKhachHangOpen] = useState(false);
    const [isCuaHangOpen, setIsCuaHangOpen] = useState(false);
    const [isShipperOpen, setIsShipperOpen] = useState(false);
    const [isVoucherOpen, setIsVoucherOpen] = useState(false);
    const [isFS, setIsFS] = useState(false);
    const [isCate, setIsCate] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate()
    const handleItemClick = (index, item) => {
      console.log(index)
      setSelectedItem(index);
      console.log(item)
      navigate(item.navigate)
    };
  return (
    <div className={styles.sidebar_menu}>
        <div className={styles.sidebar_header}>
            <div className={styles.logo}>
                <Link to = '/admin/home'>
                <img className={styles.img_logo} src={logo} alt="" />
                </Link>
            </div>
        </div>
    <div className={styles.main_menu}>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsKhachHangOpen(!isKhachHangOpen)}}>
                <FontAwesomeIcon icon={faUser} className={styles.user_icon} />
                <span className={styles.name_item}>Khách hàng</span>

            </div>
            {isKhachHangOpen && (
                <ul className={styles.require}>
                {itemsCustomer.map((item, index) => (
                    <li
                        className={styles.item_require}
                        key={index}
                        onClick={() => handleItemClick(index, item)}
                    >
                        <span className={index == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                    </li>
                ))}
            </ul>
            )}
        </div>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsCuaHangOpen(!isCuaHangOpen)}}>
                <FontAwesomeIcon icon={faStore} className={styles.store_icon} />
                <span className={styles.name_item}>Cửa hàng</span>

            </div>
            {isCuaHangOpen && (
                <ul className={styles.require}>
                    {itemsStore.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 3, item)}
                        >
                            <span className={index + 3 == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                        </li>
                        ))}
                </ul>
            )}
        </div>
        <div className={styles.item} >
            <div className={styles.name} onClick={()=>{setIsShipperOpen(!isShipperOpen)}}>
                <FontAwesomeIcon icon={faShippingFast} className={styles.ship_icon} />
                <span className={styles.name_item}>Shipper</span>

            </div>
            {isShipperOpen && (
                <ul className={styles.require}>
                    {itemsShipper.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 7, item)}
                        >
                            <span className={index + 7 == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsVoucherOpen(!isVoucherOpen)}}>
                <FontAwesomeIcon icon={faTicketAlt} className={styles.voucher_icon} />
                <span className={styles.name_item}>Voucher</span>

            </div>
            {isVoucherOpen && (
                <ul className={styles.require}>
                    {itemsVoucher.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 11, item)}
                        >
                            <span className={index + 11 == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>        
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsFS(!isFS)}}>
                <FontAwesomeIcon icon={faBolt} className={styles.voucher_icon} />
                <span className={styles.name_item}>Flash Sale</span>

            </div>
            {isFS && (
                <ul className={styles.require}>
                    {itemFlashSale.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 12, item)}
                        >
                            <span className={index + 12 == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className={styles.item}>
            <div className={styles.name} onClick={()=>{setIsCate(!isCate)}}>
                <FontAwesomeIcon icon={faList} className={styles.voucher_icon} />
                <span className={styles.name_item}>Thể loại</span>

            </div>
            {isCate && (
                <ul className={styles.require}>
                    {itemCategory.map((item, index) => (
                        <li
                            className={styles.item_require}
                            key={index}
                            onClick={() => handleItemClick(index + 13, item)}
                        >
                            <span className={index + 13 == selectedItem ? styles.item_require_select : styles.item_require}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
</div>
  )
}
