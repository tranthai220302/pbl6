import React, { useState, useEffect } from 'react';
import styles from './FlashSale.module.css';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { faPlus, faTrash, faReply, faMessage, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Chat from '../../../pages/Chat/Chat';

export default function FlashSale() {
    const notify = (er, message) => toast[er](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [BookNoFlashSale, setBookNoFlashSale] = useState([]);
    const [BookFlash, setBookFlash] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [BookFlashAndWaitFlas, setBookFlashAndWaitFlas] = useState([]);
    const [error, setError] = useState(null);
    const [showBookForm, setShowBookForm] = useState(false);
    const [selectedTab, setSelectedTab] = useState('daDangKy'); 
    const [Item, setItem] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [invalidDate, setInvalidDate] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (item) => {
        const newSelectedIds = selectedIds.includes(item.id)
            ? selectedIds.filter((id) => id !== item.id)
            : [...selectedIds, item.id];
        setSelectedIds(newSelectedIds);
        console.log(newSelectedIds)
    };

    const [showForm, setShowForm] = useState(false);

    const handlePlusClick = (item) => {
        setItem(item)
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };
  
    const handleDateChange = (event) => {
      const currentDate = new Date();
      const selected = new Date(event.target.value);
  
      if (selected >= currentDate) {
        setSelectedDate(event.target.value);
        setInvalidDate(false);
      } else {
        setSelectedDate('');
        setInvalidDate(true);
      }
    };

    const getBookNoFlashSale= (()=>{
        newRequest
        .get(`/book/bookNoFlas/${currentUser.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Successfully updated voucher item:', res.data);
          setBookNoFlashSale(res.data);
        })
        .catch((error) => {
          console.error('Error updating voucher item:', error);
        });
    })

    const getBookFlashAndWaitFlas= (()=>{
        newRequest.
        post(`/book/bookFlas/${currentUser.id}`,{
            "date" : selectedDate
        }, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Successfully updated voucher item:', res.data);
          setBookFlashAndWaitFlas(res.data);
        })
        .catch((error) => {
          console.error('Error updating voucher item:', error);
          setBookFlashAndWaitFlas([]);
        });
    })

    const getBookFlash= (()=>{
        newRequest.
        post(`/book/bookFlas/${currentUser.id}`,{
            "date" : selectedDate,
            "isFlashSale" : 1
        }, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Successfully updated voucher item:', res.data);
          setBookFlash(res.data);
        })
        .catch((error) => {
          console.error('Error updating voucher item:', error);
          setBookFlashAndWaitFlas([]);
        });
    })

    useEffect(() => {
        getBookNoFlashSale();
        getBookFlashAndWaitFlas();
        getBookFlash();
    }, [selectedDate]);

    useEffect(() => {
        getBookFlash();
    }, []);


    const renderContent = () => {
        if (selectedTab === 'daDangKy') {
            return (
                <div>
                    {/* Hiển thị danh sách sản phẩm đã đăng ký */}
                    <table>
                    <tr>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Giá hiện tại</th>
                                <th>Giảm giá</th>
                            </tr>
                        {BookFlash?.map((item) => {
                                return (
                                    <tr key={item.id}> {/* Don't forget to add a unique key for each element */}
                                        <td>{item.name}</td>
                                        <td>{item.nhaXB}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {item.percentDiscount*100}%
                                        </td>
                                    </tr>
                                );
                        })}

                    </table>
                </div>
            );
        } else if (selectedTab === 'choXacNhan') {
            return (
                <div>
                    {/* Hiển thị danh sách đang chờ xác nhận */}
                    <h6>Flash Sale sẽ diễn ra vào 9:00 - 11:00 hàng ngày</h6>
                    <div className={styles.regis_FlashSale}>
                        <div>
                            <span>Đăng ký Flash Sale ngày</span>
                            <input type="date" value={selectedDate} onChange={handleDateChange}/>
                        </div>
                        {invalidDate && <span className={styles.invalidDate}>Ngày không hợp lệ</span>}
                    </div>
                    <table style={{marginTop: '20px'}}>
                    <tr>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Giá hiện tại</th>
                                <th>Giảm giá</th>
                            </tr>
                        {BookFlashAndWaitFlas?.map((item) => {
                                return (
                                    <tr key={item.id}> {/* Don't forget to add a unique key for each element */}
                                        <td>{item.name}</td>
                                        <td>{item.nhaXB}</td>
                                        <td>{item.price}</td>
                                        <td>
                                        {item.percentDiscount*100}%
                                        </td>
                                    </tr>
                                );
                        })}

                    </table>
                </div>
            );
        } else if (selectedTab === 'dangKy') {
            return (
                <div className={styles.FlashSale_Register}>
                    <h6>Flash Sale sẽ diễn ra vào 9:00 - 11:00 hàng ngày</h6>
                    <div className={styles.regis_FlashSale}>
                        <div>
                            <span>Đăng ký Flash Sale ngày</span>
                            <input type="date" value={selectedDate} onChange={handleDateChange}/>
                        </div>
                        {invalidDate && <span className={styles.invalidDate}>Ngày không hợp lệ</span>}
                    </div>
                    <button onClick={()=>handleDangKy()}>Đăng ký các sách đã chọn</button>
                    <div className={styles.Book_notSelect}>
                        <table style={{marginTop: '20px'}}>
                            <tr>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Giá hiện tại</th>
                                <th>Chọn</th>
                            </tr>
                            {BookNoFlashSale.map((item) => {
                                    return (
                                        <tr key={item.id}> {/* Don't forget to add a unique key for each element */}
                                            <td>{item.name}</td>
                                            <td>{item.nhaXB}</td>
                                            <td>{item.price}</td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(item)}
                                                    checked={selectedIds.includes(item.id)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}


                        </table>
                    </div>
                    {showForm && (
                        <div className={styles.overlay}>
                            <div className={styles.editForm}>
                                <div className={styles.FormTitle}>
                                    <h3>Đăng ký Flash Sale</h3>
                                    <FontAwesomeIcon className={styles.CloseForm} icon={faClose} onClick={handleFormClose} />
                                </div>    
                                <div className={styles.Book_Inf}>
                                    <img className={styles.book_ava} src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/411337569_903820174609347_3824711788836504289_n.jpg?stp=c0.605.1071.1072a_dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeG1ErJ8YgNhXA7371mB0jpqaT6byvwHprRpPpvK_AemtPLWdGGXdfsaBlVvFKk3jmkmdy3gcDCD-6fN0jqwN9yz&_nc_ohc=v2SoLf7u3FMAX9J6pFd&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBTTxvOsTIH4RMlY4Vl_hM8tQiybpQE8rmfqvMWkIjX5Q&oe=659CEFF0" alt="" />
                                    <div className={styles.BookInf_col2}>
                                        <span className={styles.Book_Name}>
                                            {Item.name}
                                        </span>
                                        <span className={styles.book_author}>
                                            {Item.nhaXB}
                                        </span>
                                    </div>
                                    <div className={styles.current_Price}>
                                        <span>{Item.price}</span>
                                    </div>
                                </div>  
                                <div className={styles.FlashSale_Inf}>
                                    <label>Số phần trăm giảm:</label>
                                    <input type="number" name="PercentDiscount" placeholder='Số phần trăm giảm, ví dụ: 20, 50,...' id="" />
                                    <label htmlFor="">Số lượng sản phẩm Flash Sale:</label>
                                    <input type="number" placeholder='Số lượng sản phẩm FlashSale, ví dụ: 1, 2, 3,...' />
                                </div>  
                                <button>Đăng ký</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    };

    const handleDangKy = () => {
        console.log(selectedDate,selectedIds)
        newRequest.
        post(`/book/registerFlashSale/${currentUser.id}`,{
            "id" : selectedIds,
            "date" : selectedDate
        }, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Successfully updated voucher item');
          notify("succuss","Đã thêm thành công")
        })
        .catch((error) => {
          console.error('Error updating voucher item:' ,error);
          notify("error",error.response.data)
        });
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
            <Chat />
        </div>
    );
}
