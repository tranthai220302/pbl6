
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './DetailStore.module.css'
import newRequest from '../../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faEnvelope, faWarehouse, faMobilePhone, faUser} from '@fortawesome/free-solid-svg-icons';
function DetailStore({show, handleClose, store}) {
  console.log(store)
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Doanh thu cửa hàng
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
                            <div className={style.name_item}>{store.firstName} {store.lastName}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faEnvelope} className={style.card_icon} />
                            <div className={style.name_item}>{store.email}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faWarehouse} className={style.card_icon}/>
                            <div className={style.name_item}>{store.address}</div>
                        </div>
                        </div>
                        <div className={style.infor_body}>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faMobilePhone} className={style.card_icon} />
                            <div className={style.name_item}>{store.phone ? `0${store.phone}` : ''}</div>
                        </div>
                        <div className={style.infor_item}>
                            <FontAwesomeIcon icon={faUser} className={style.card_icon} />
                            <div className={style.name_item}>23 tuổi</div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={style.store}>
                <div className={style.title}>Thông tin cửa hàng</div>
                    <div className={style.avatart}>
                        <img src={store.DetailStore.avatar} alt="" height={400} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}/>
                    </div>
                    <div className={style.nameStore}>{store.DetailStore.nameStore}</div>
                    <div className={style.descStore}>
                    {store.DetailStore.descStore}
                    </div>
                    <div className={style.descStore}>
                    Địa điểm : {store.DetailStore.address}
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailStore;