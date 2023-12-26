import React, { useState } from 'react'
import styles from './SidebarHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClipboardList, faBagShopping, faShop, faSignal} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
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
                        <span>Quản lý đơn hàng</span>
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
                        <span>Quản lý sản phẩm</span>
                    </li>
                    {isOpen.item2 && (
                        <div className={styles.item_child}>
                            <p>Tất cả sẩn phẩm</p>
                            <p>Thêm sản phẩm</p>
                            <p>Sản phẩm vi phạm</p>
                        </div>
                    )}
                    <li onClick={() => handleItemClick('item3')}>
                        <FontAwesomeIcon icon={faShop}/>
                        <span>Quản lý cửa hàng</span>
                    </li>
                    {isOpen.item3 && (
                        <div className={styles.item_child}>
                            <p>Thông tin cửa hàng</p>
                            <p>Đánh giá cửa hàng</p>
                            <p>Mã giảm giá của cửa hàng</p>
                        </div>
                    )}
                    <li>
                        <FontAwesomeIcon icon={faSignal}/>
                        <span>Dữ liệu thống kê</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}