
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalDetailShipper.module.css'
import newRequest from '../../../../ults/NewRequest';
import { faAddressCard, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faEnvelope, faWarehouse, faMobilePhone, faUser} from '@fortawesome/free-solid-svg-icons';
function ModalDetailShipper({show, handleClose, store, isShipper}) {
    const [open, setOpen] = useState(null);

  console.log(store)
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Thông tin shipper
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
        <div className={styles.content} style={{ position: 'relative', overflow: 'hidden' }}>
            {open && (
                <div style={{
                    boxShadow : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    backgroundColor : "#DFF4F6",
                    padding : "20px",
                    position : 'absolute',
                    zIndex : '99999',
                }}>
                    <div style={{display: 'flex', justifyContent : 'space-between'}}>
                        <h4>Bằng lái xe</h4>
                        <img src="https://www.satflare.com/XClose.png" height={30} alt="" style={{cursor : 'pointer'}} onClick={()=>{setOpen(false)}}/>
                    </div>
                    <img src={store.image_drivingLience ? store.image_drivingLience : "https://giaypheplaixe.edu.vn/wp-content/uploads/2019/02/giay-phep-lai-xe-a1.jpg"} height={300} width={400} alt="" />
                </div>
            )}
        <div className={styles.avatar}>
        <img src={store.userShipper?.avatar ? store.userShipper?.avatar : "https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg"} alt="" />
            <label htmlFor="fileInput1">
                <FontAwesomeIcon icon={faAddressCard} className={styles.icon} style={{color : 'green'}} onClick={()=>{setOpen(true)}}/>       
            </label>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                    <span>Giấy phép lái xe</span>
                    <input type="text" placeholder='Nhập tài khoản' name = 'username' value={store.drivingLience} />
            </div>
            <div className={styles.item_item}>
                <span>Biển số xe</span>
                <input type="text" placeholder='Nhập mật khẩu' name = 'confirmPassword' value={store.numMobike}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Email</span>
                <input type="email" placeholder='Nhập email' name = 'email' value={store.userShipper.email}/>
            </div>
            <div className={styles.item_item}>
                <span>Địa chỉ</span>
                <input type="text" placeholder='Nhập địa chỉ' name = 'address'value={store.userShipper.address}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Họ</span>
                <input type="text" placeholder='Nhập họ' name = 'firstName' value={store.userShipper.firstName}/>
            </div>
            <div className={styles.item_item}>
                <span>Tên</span>
                <input type="text" placeholder='Nhập tên' name = 'lastName' value={store.userShipper.lastName}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Tuổi</span>
                <input type="text" placeholder='Nhập tuổi' name = 'age' value={store.userShipper.age}/>
            </div>
            <div className={styles.item_item}>
                <span>Số điện thoại</span>
                <input type="text" placeholder='Nhập số điện thoại' name = 'phone' value={store.userShipper.phone}/>
            </div>
        </div>
      </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDetailShipper;