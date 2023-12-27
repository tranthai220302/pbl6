import React, { useState } from 'react'
import styles from './SidebarHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClipboardList, faBagShopping, faShop, faSignal} from '@fortawesome/free-solid-svg-icons';

export default function SideBar({managebook,setManageBook,manageorder,setManageOrder,managestore,setManageStore,analysis,setAnalysis}) {
    

    const handleManageBook = (managebook) => {
        setManageBook(managebook)
    }
    const handleManageOrder = (manageorder) => {
        setManageOrder(manageorder)
    }
    const handleManageStore = (managestore) => {
        setManageStore(managestore)
    }
    const handleAnalysis = (analysis) => {
        setAnalysis(analysis)
    }

    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <ul>
                    <li >
                        <FontAwesomeIcon icon={faClipboardList}/>
                        <span onClick={() => {handleManageOrder(true);handleManageBook(false);handleAnalysis(false);handleManageStore(false)}}>Quản lý đơn hàng</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBagShopping}/>
                        <span onClick={() => {handleManageBook(true);handleManageStore(false);handleManageOrder(false);handleAnalysis(false)}}>Quản lý sản phẩm</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faShop}/>
                        <span onClick={() =>{ handleManageStore(true);handleManageBook(false);handleManageOrder(false);handleAnalysis(false)}}>Quản lý cửa hàng</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSignal}/>
                        <span onClick={() => {handleAnalysis(true);handleManageBook(false);handleManageStore(false);handleManageOrder(false)}}>Dữ liệu</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}