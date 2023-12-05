import React, { useState } from 'react'
import styles from './Collab.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleCheck, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Collab() {
    const [isStoreFormVisible, setStoreFormVisibility] = useState(false);

    const showStoreForm = () => {
      setStoreFormVisibility(true);
    };

    const hideStoreForm = () => {
        setStoreFormVisibility(false);
    }

    const [isRegistered, setRegistered] = useState(false);

    const handleRegistration = () => {
      // Thực hiện các bước đăng ký ở đây
      // Ví dụ: Gọi API đăng ký, xử lý form, vv.
  
      // Sau khi đăng ký thành công, hiển thị thông báo
      setRegistered(true);
  
      // Tạm thời ẩn thông báo sau 3 giây (có thể điều chỉnh theo nhu cầu)
      setTimeout(() => {
        setRegistered(false);
      }, 3000);
    };

    return (
        <div className={styles.Collab}>
            <div className={styles.Collab_Title}>
                Hợp tác với Harumi
            </div>
            <table className={styles.Collab_Content}>
                <colgroup>
                    <col width='50%'/>
                    <col width='50%'/>
                </colgroup>
                <td>
                    <th>Điều khoản hợp tác với tư cách người bán:</th>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr className={styles.btn}>
                        <button onClick={showStoreForm}>Đăng ký người bán</button>
                    </tr>
                </td>
                <td>
                    <th>Điều khoản hợp tác với tư cách là shipper:</th>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr>
                        <span>
                            - Đây là điều khoản nè
                        </span>
                    </tr>
                    <tr className={styles.btn}>
                        <button>Đăng ký shipper</button>
                    </tr>
                </td>
            </table>
            {/* Hiển thị form edit khi trạng thái là true */}
            {isStoreFormVisible && (
                <div className={styles.overlay}>
                    <div className={styles.registerStoreForm}>
                        <div className= {styles.btnClose_space}>
                            <FontAwesomeIcon className={styles.btnClose_icon} icon={faXmark} onClick={hideStoreForm}/>
                        </div>
                        <h3>Đăng ký trở thành người bán</h3>
                        <label htmlFor="">Tên cửa hàng: </label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Địa chỉ lấy hàng: </label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Email: </label>
                        <input type="email" name="" id="" />
                        <label htmlFor="editName">Số điện thoại: </label>
                        <input type="text" id="" name="" />
                        <button onClick={handleRegistration}>
                            <Link to="/store/home" target='_blank'>Đăng ký</Link>
                        </button>
                    </div>
                </div>
            )}
            {isRegistered && (
                <div className={styles.success_message}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                    <p className={styles.message}>Đăng ký thành công!</p>
                </div>
            )}
        </div>
    )
}