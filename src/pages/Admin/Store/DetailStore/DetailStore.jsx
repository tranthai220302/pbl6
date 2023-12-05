
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './DetailStore.module.css'
import newRequest from '../../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faEnvelope, faWarehouse, faMobilePhone, faUser} from '@fortawesome/free-solid-svg-icons';
function DoanhThu({show, handleClose, store}) {
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
                        <img src="https://cdn.pixabay.com/photo/2022/12/08/19/23/book-store-7643976_640.jpg" alt="" />
                    </div>
                    <div className={style.nameStore}>Cửa hàng của Thái</div>
                    <div className={style.descStore}>
                    Những lý do bạn nên yêu một người thích đọc sách :3333
Bạn cho rằng sách là nhàm chán, và yêu người thích đọc sách cũng sẽ rất nhàm chán. Hoàn toàn không như bạn nghĩ đâu nhé! Sách là kiến thức, và yêu người thích đọc sách bạn sẽ có tất cả.
Nếu bạn vẫn đang trên hành trình tìm kiếm một nửa để lấp đầy khoảng trống trong trái tim mình, hằng ngày vẫn ngồi một mình tại những quán cà phê nhỏ, hãy thử ngắm nhìn một ai đó đang chăm chú vào quyển sách trên tay. Bạn thấy gì không? Một nét thu hút, sự đắm say và cả những khoảnh khắc lãng mạn. Hoặc bạn vẫn ngây ngô hỏi vì sao phải chọn nửa kia là người thích đọc sách? Dưới đây là những lý do giải đáp thắc mắc cho bạn.
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DoanhThu;