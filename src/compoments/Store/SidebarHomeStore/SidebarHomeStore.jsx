import React, { useState } from 'react'
import styles from './SidebarHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClipboardList, faBagShopping, faShop, faSignal} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faClipboardList}/>
                        <span>Quản lý đơn hàng</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBagShopping}/>
                        <span>Quản lý sản phẩm</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faShop}/>
                        <span>Quản lý cửa hàng</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSignal}/>
                        <span>Dữ liệu</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}