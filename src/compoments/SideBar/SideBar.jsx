import React, { useState } from 'react'
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    loại sản phẩm
                </div>
                <ul>
                    <li>Giáo khoa - Tham khảo</li>
                    <li>Thiếu nhi</li>
                    <li>Văn học</li>
                    <li>Tâm lý - Kỹ năng sống</li>
                    <li>Khoa học kỹ thuật</li>
                    <li>Văn hóa - Nghệ thuật - Du lịch</li>
                    <li>Kinh tế - Chính trị</li>
                    <li>Âm nhạc - Mỹ thuật - Thời trang</li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    giá
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>0đ - 50,000đ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>50,000đ - 100,000đ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>100,000đ - 200,000đ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>200,000đ - 500,000đ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>500,000đ - 700,000đ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>700,000đ trở lên</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    thương hiệu
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Alphabooks</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Thaihabooks</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>MCbooks</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Megabook</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    nhà cung cấp
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Nhà xuất bản Kim Đồng</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Định Tị</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>NXB Trẻ</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Nhã Nam</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Nhà sách Minh Thắng</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    nơi gia công & sản xuất
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Việt Nam</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Xuất xứ
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Việt Nam</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    độ tuổi
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>0 - 6</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>15 - 18</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>16+</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>18+</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    cấp học
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Mầm non</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Cấp 1</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Cấp 2</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Cấp 3</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Đại học</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    cấp độ/lớp
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 1</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 2</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 3</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 4</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 5</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Lớp 6</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    ngôn ngữ
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Tiếng Anh</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Tiếng Nhật</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Tiếng Hàn</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Tiếng Nga</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Tiếng Pháp</span>
                    </li>
                    <li> 
                        <input type="checkbox" />
                        <span>Song ngữ Anh - Việt</span>
                    </li>
                </ul>
                <div className={styles.btn_more}>
                    <span>Xem thêm</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
        </div>
    )
}