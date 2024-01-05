import React, { useState, useEffect } from 'react';
import styles from './FlashSale.module.css';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faReply, faMessage, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function FlashSale() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('daDangKy'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsPending(true);
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const idStore = currentUser?.id; // Bạn cần thay thế tên property thực tế
                const date = new Date(); // Thay thế với ngày bạn muốn sử dụng

                const response = await newRequest.post(`/book/bookFlas/${idStore}`, { date }, { withCredentials: true });
                setData(response.data);
                setIsPending(false);
                setError(null);
            } catch (error) {
                setError(error.response?.data || 'Có lỗi xảy ra');
                setIsPending(false);
            }
        };

        fetchData();
    }, []);

    const renderContent = () => {
        if (selectedTab === 'daDangKy') {
            return (
                <div>
                    {/* Hiển thị danh sách sản phẩm đã đăng ký */}
                    <table>
                        <tr>
                            <th>Thời gian đăng ký</th>
                            <th>Thời gian Flash Sale</th>
                            <th>Tên sách</th>
                            <th>Giá gốc</th>
                            <th>Giá Flash Sale</th>
                            <th>Số lượng</th>
                        </tr>
                        <tr>
                            <td>5:00 ngày 05/01/2024</td>
                            <td>9h-11h ngày 06/01/2024</td>
                            <td>Tôi thấy hoa vàng trên cỏ xanh</td>
                            <td>200000</td>
                            <td>160000</td>
                            <td>20</td>
                        </tr>
                    </table>
                </div>
            );
        } else if (selectedTab === 'choXacNhan') {
            return (
                <div>
                    {/* Hiển thị danh sách đang chờ xác nhận */}
                    <table>
                        <tr>
                            <th>Thời gian gửi yêu cầu</th>
                            <th>Thời gian Flash Sale</th>
                            <th>Tên sách</th>
                            <th>Giá gốc</th>
                            <th>Giá Flash Sale</th>
                            <th>Số lượng</th>
                        </tr>
                        <tr>
                            <td>6:00 ngày 06/01/2024</td>
                            <td>9h-11h ngày 06/01/2024</td>
                            <td>Hai đứa trẻ</td>
                            <td>200000</td>
                            <td>160000</td>
                            <td>20</td>
                        </tr>
                    </table>
                </div>
            );
        } else if (selectedTab === 'dangKy') {
            return (
                <div className={styles.FlashSale_Register}>
                    {/* Hiển thị ô chọn thời gian và button đăng ký */}
                    {/* Ví dụ */}
                    <h6>Flash Sale sẽ diễn ra vào 9:00 - 11:00 hàng ngày</h6>
                    <div className={styles.regis_FlashSale}>
                        <span>Đăng ký ngày Flash Sale</span>
                        <input type="datetime-local" />
                    </div>
                    <button onClick={handleDangKy}>Chọn sách</button>
                </div>
            );
        }
    };

    const handleDangKy = () => {
        // Xử lý đăng ký - gọi API hoặc thực hiện các thao tác cần thiết
        console.log('Đăng ký clicked');
    };

    return (
        <div className={styles.FlashSale}>
            {currentUser ? (
                <div>
                    <div className={styles.FlashSale_Title}>
                        QUẢN LÝ FLASH SALE
                    </div>
                    <div className={styles.FlashSale_childTitle}>
                        <ul>
                            <li onClick={() => setSelectedTab('daDangKy')} className={selectedTab === 'daDangKy' ? styles.selectedTab : ''}>Đã đăng ký Flash Sale</li>
                            <li onClick={() => setSelectedTab('choXacNhan')} className={selectedTab === 'choXacNhan' ? styles.selectedTab : ''}>Đang chờ xác nhận Flash Sale</li>
                            <li onClick={() => setSelectedTab('dangKy')} className={selectedTab === 'dangKy' ? styles.selectedTab : ''}>Đăng ký Flash Sale</li>
                        </ul>
                    </div>
                    <div className={styles.FlashSale_Content}>
                        {renderContent()}
                    </div>
                </div>
            ) : (
                <div className={styles.notlogin}>
                    <span className={styles.Notification}>
                        Bạn cần đăng nhập để truy cập!
                    </span>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            )}
        </div>
    );
}
