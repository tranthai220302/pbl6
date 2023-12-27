import React, { useEffect, useState } from 'react'
import styles from './ViewStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPlus, faStore, faStar, faUserCheck,faUsers,faLocationDot} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest'
import Chat from '../../Chat/Chat';
import { useLocation } from 'react-router-dom';
import ListBookDetail from '../../../compoments/ListBookDetail/ListBookDetail';

export default function ViewStore() {
    return (
        <div className={styles.ViewStore}>
            <div className={styles.Store_Inf}>
                <div className={styles.avt_store}>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/411337569_903820174609347_3824711788836504289_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG1ErJ8YgNhXA7371mB0jpqaT6byvwHprRpPpvK_AemtPLWdGGXdfsaBlVvFKk3jmkmdy3gcDCD-6fN0jqwN9yz&_nc_ohc=Cc4Gu1IPk44AX8U_hv6&_nc_ht=scontent.fhan2-3.fna&oh=00_AfA9NKCHPVbhfzuobb-ElJCCIosiRAtxmQHNtI07rjUn6g&oe=6590246A' alt="" />
                </div>
                <div className={styles.Store_Content}>
                    <div className={styles.Store_name}>
                        <span>
                            Linh Store
                        </span>
                    </div>
                    <div className={styles.Store}>
                        <button>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Theo dõi</span>
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faMessage}/>
                            <span >Chat</span>
                        </button>
                    </div>
                </div>
                <div className={styles.Store_Des}>
                    <table>
                        <colgroup>
                            <col/>
                            <col/>
                        </colgroup>
                        <tr>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faStar}/>
                                <span >Đánh giá: 5.0 (10 đánh giá)</span>
                            </td>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faStore}/>
                                <span >Sản phẩm: 150</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faUserCheck}/>
                                <span >Tham gia từ: 11/11/2021</span>
                                
                            </td>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faUsers}/>
                                <span >Người theo dõi: 32</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faLocationDot}/>
                                <span>Địa chỉ: 16/06 Ngô Sĩ Liên - Liên Chiểu - Đà Nẵng</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={styles.Store_Voucher}>
                <h3>Voucher của shop</h3>
                Hiện voucher vào đây dùm i ạ
            </div>
            <div className={styles.Store_Listbook}>
                <h3>Sản phẩm</h3>
                {/* chỉnh bên listbook cho hiện sách của cửa hàng ni nha */}
                <ListBookDetail/>
            </div>
        </div>
    )
}