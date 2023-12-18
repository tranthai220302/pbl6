
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './DetailStoreRequest.module.css'
import newRequest from '../../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faEnvelope, faWarehouse, faMobilePhone, faUser} from '@fortawesome/free-solid-svg-icons';
function DetailStoreRequest({show, handleClose, store}) {
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Thông tin yêu cầu mở cửa hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
        <div className={style.card}>
                <div className={style.user}>
                  <div className={style.title}>Thông tin người quản lý</div>
                    <div className={style.avatar_card}>
                        <img className={style.img_card} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxMWB6zdzX1Yhcbhe3KJQr3zxGsl_ETGi2A&usqp=CAU" alt="" />
                    </div>
                    <div className={style.infor}>
                        <div className={style.infor_body}>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faUser} className={style.card_icon} />
                            <div className={style.name_item}>{store.userStore.firstName} {store.userStore.lastName}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faEnvelope} className={style.card_icon} />
                            <div className={style.name_item}>{store.userStore.email}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faWarehouse} className={style.card_icon}/>
                            <div className={style.name_item}>{store.userStore.address}</div>
                        </div>
                        </div>
                        <div className={style.infor_body}>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faMobilePhone} className={style.card_icon} />
                            <div className={style.name_item}>{store.userStore.phone ? `0${store.userStore.phone}` : ''}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faUser} className={style.card_icon} />
                            <div className={style.name_item}>{store.userStore.age}</div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={style.store}>
                <div className={style.title}>Thông tin cửa hàng</div>
                    <div className={style.avatart}>
                        <img src={store.avatar} alt="" className={style.avatar_store}/>
                    </div>
                    <div className={style.nameStore}>{store.nameStore}</div>
                    <div className={style.descStore}>
                      {store.descStore}
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailStoreRequest;