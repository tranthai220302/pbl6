import React, { useEffect, useState } from 'react'
import styles from './SidebarHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faClipboardList, faBagShopping, faShop, faSignal, faBolt, faL} from '@fortawesome/free-solid-svg-icons';
import { set } from 'date-fns';

// export default function SideBar({ setOpen }) {

export default function SideBar({setSubMenu,setOpen,managebook,setManageBook,manageorder,setManageOrder,managestore,setManageStore,analysis,setAnalysis,setAll,setStateId1,setStateId6,setStateId7}) {
    const handleManageBook = (managebook) => {
        setManageBook(managebook)
    }
    const handleManageOrder = (manageorder) => {
        setManageOrder(manageorder)
        setOpen(0);    }
    const handleManageStore = (managestore) => {
        setManageStore(managestore)
        setOpen(1);
    }
    const handleAnalysis = (analysis) => {
        setAnalysis(analysis)
    }
    const handleAll = (all) => {
        setAll(all)
    }
    // StateId1 : trạng thái chờ xác nhận
    const handleStateId1 = (StateId1) => {
        setStateId1(StateId1)
    }
    // StateId6 : trạng thái đơn hủy
    const handleStateId6 = (StateId6) => {
        setStateId6(StateId6)
    }
    // StateId7 : trạng thái Thả hàng/hoàn tiền
    const handleStateId7 = (StateId7) => {
        setStateId7(StateId7)
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
                    <li onClick={() => {setOpen(0);handleItemClick('item1')}}>
                        <FontAwesomeIcon icon={faClipboardList}/>
                        <span onClick={() => {handleManageOrder(true);handleManageBook(false);handleAnalysis(false);handleManageStore(false)}}>Quản lý đơn hàng</span>
                    </li>
                    {isOpen.item1 && (
                        <div className={styles.item_child}>
                            <p onClick={() => {setOpen(0);handleAll(true);handleStateId1('');handleStateId6('');handleStateId7('')}}>Tất cả</p>
                            <p onClick={() => {setOpen(0);handleStateId1(true);handleAll('');handleStateId6('');handleStateId7('')}}>Chờ xác nhận</p>
                            <p onClick={() => {setOpen(0);handleStateId6(true);handleAll('');handleStateId7('');handleStateId1('')}}>Đơn hủy</p>
                            <p onClick={() => {setOpen(0);handleStateId7(true);handleAll('');handleStateId1('');handleStateId6('')}}>Trả hàng/hoàn tiền</p>
                        </div>
                    )}
                    <li onClick={() => {setOpen(0);handleItemClick('item2')}}>
                        <FontAwesomeIcon icon={faBagShopping}/>
                        <span onClick={() => {handleManageBook(true);handleManageStore(false);handleManageOrder(false);handleAnalysis(false)}}>Quản lý sản phẩm</span>
                    </li>
                    <li onClick={() => handleItemClick('item3') }>
                        <FontAwesomeIcon icon={faShop}/>
                        <span>Quản lý cửa hàng</span>
                    </li>
                    {isOpen.item3 && (
                        <div className={styles.item_child}>
                            <p onClick={() => {setOpen(1);setSubMenu("Thông tin cửa hàng")}}>Thông tin cửa hàng</p>
                            <p onClick={() => {setOpen(1);setSubMenu("Đánh giá cửa hàng")}}>Đánh giá cửa hàng</p>
                            <p onClick={() => {setOpen(1);setSubMenu("Mã giảm giá của cửa hàng")}}>Mã giảm giá của cửa hàng</p>
                        </div>
                    )}
                    <li onClick={() => {setOpen(2)}}>
                        <FontAwesomeIcon icon={faBolt}/>
                        <span>Quản lý FlashSale</span>
                    </li>
                    <li onClick={() => setOpen(0)}>
                        <FontAwesomeIcon icon={faSignal}/>
                        <span onClick={() => {handleAnalysis(true);handleManageBook(false);handleManageStore(false);handleManageOrder(false)}}>Dữ liệu</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}