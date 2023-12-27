import React, { useState } from 'react'
import styles from './SidebarHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faClipboardList, faBagShopping, faShop, faSignal, faBolt} from '@fortawesome/free-solid-svg-icons';

// export default function SideBar({ setOpen }) {

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

    // Sử dụng state để theo dõi trạng thái của từng mục
    const [isOpen, setIsOpen] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
    });

    // Hàm xử lý sự kiện khi một mục được click
    const handleItemClick = (itemName) => {
        // Đảo ngược trạng thái của mục được click
        setIsOpen({
        ...isOpen,
        [itemName]: !isOpen[itemName],
        });
    };
    
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <ul>
                    <li onClick={() => handleItemClick('item1')}>
                        <FontAwesomeIcon icon={faClipboardList}/>
                        <span onClick={() => {handleManageOrder(true);handleManageBook(false);handleAnalysis(false);handleManageStore(false)}}>Quản lý đơn hàng</span>
                    </li>
                    {isOpen.item1 && (
                        <div className={styles.item_child}>
                            <p>Tất cả</p>
                            <p>Chờ xác nhận</p>
                            <p>Đơn hủy</p>
                            <p>Trả hàng/hoàn tiền</p>
                        </div>
                    )}
                    <li onClick={() => handleItemClick('item2')}>
                        <FontAwesomeIcon icon={faBagShopping}/>
                        <span onClick={() => {handleManageBook(true);handleManageStore(false);handleManageOrder(false);handleAnalysis(false)}}>Quản lý sản phẩm</span>
                    </li>
                    {isOpen.item2 && (
                        <div className={styles.item_child}>
                            <p>Tất cả sản phẩm</p>
                            <p>Thêm sản phẩm</p>
                            <p>Sản phẩm vi phạm</p>
                        </div>
                    )}
                    <li onClick={() => handleItemClick('item3')}>
                        <FontAwesomeIcon icon={faShop}/>
                        <span onClick={() =>{ handleManageStore(true);handleManageBook(false);handleManageOrder(false);handleAnalysis(false)}}>Quản lý cửa hàng</span>
                    </li>
                    {isOpen.item3 && (
                        <div className={styles.item_child}>
                            <p onClick={()=>{setOpen(2)}}>Thông tin cửa hàng</p>
                            <p>Đánh giá cửa hàng</p>
                            <p>Mã giảm giá của cửa hàng</p>
                        </div>
                    )}
                    <li>
                        <FontAwesomeIcon icon={faTicket}/>
                        <span>Quản lý Voucher</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBolt}/>
                        <span>Quản lý FlashSale</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faSignal}/>
                        <span onClick={() => {handleAnalysis(true);handleManageBook(false);handleManageStore(false);handleManageOrder(false)}}>Dữ liệu</span>
                        <span>Dữ liệu thống kê</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}