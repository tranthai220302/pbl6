import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalTypeOrder.module.css'
import { useState } from 'react';
import ModalFullOrder from './ModalFullOrder/ModalFullOrder';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faEnvelope, faWarehouse, faMobilePhone, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ModalTypeOrder({modalShow, setModalShow, id, isDetail}){
    console.log(id)
    const [selectOrder, setSelectOrder] = useState(null)
  return (
    <>
    <Modal
      show = {modalShow}
      onHide={setModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={isDetail && (
        {
            backgroundColor : '#1f1f1f',
            opacity: 1
          }
      )}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {
                isDetail ? (
                    <span>Thông tin Order</span>
                ) : (
                    <span>Danh sách trạng thái Order</span>
                )
            }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
            isDetail ? (
                <div className={styles.container}>
                    <div className={styles.user}>
                    <div className={styles.title}>Thông tin người quản lý</div>
                        <div className={styles.avatar_card}>
                            <img className={styles.img_card} src={id.customer.avatar} alt="" />
                        </div>
                        <div className={styles.infor}>
                            <div className={styles.infor_body}>
                            <div className={styles.infor_item}>
                                <FontAwesomeIcon icon={faUser} className={styles.card_icon} />
                                <div className={styles.name_item}>{id.customer.firstName} {id.customer.lastName}</div>
                            </div>
                            <div className={styles.infor_item}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.card_icon} />
                                <div className={styles.name_item}>{id.customer.email}</div>
                            </div>
                            <div className={styles.infor_item}>
                                <FontAwesomeIcon icon={faWarehouse} className={styles.card_icon}/>
                                <div className={styles.name_item}>{id.customer.address}</div>
                            </div>
                            </div>
                            <div className={styles.infor_body}>
                            <div className={styles.infor_item}>
                                <FontAwesomeIcon icon={faMobilePhone} className={styles.card_icon} />
                                <div className={styles.name_item}>{id.customer.phone ? `0${id.customer.phone}` : ''}</div>
                            </div>
                            <div className={styles.infor_item}>
                                <FontAwesomeIcon icon={faUser} className={styles.card_icon} />
                                <div className={styles.name_item}>23 tuổi</div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order}>
                        <div className={styles.title}>Thông tin đơn hàng</div>
                        <table>
                            <tbody>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Mã đơn hàng: </span>
                                </td>
                                <td>
                                    <div>{id.id}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Trạng thái: </span>
                                </td>
                                <td>
                                    <div>{id.State.status}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Địa chỉ giao hàng: </span>
                                </td>
                                <td>
                                    <div>{id.addressCustomer}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Địa chỉ nhận hàng: </span>
                                </td>
                                <td>
                                    <div>{id.addressStore}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Thanh toán :</span>
                                </td>
                                <td>
                                    <div>{id.isPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Tổng tiền: </span>
                                </td>
                                <td>
                                    <div>{id.total_price}</div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <span style={{fontWeight : '600'}}>Cửa hàng :</span>
                                </td>
                                <td>
                                    <div>{id.store.DetailStore.nameStore}</div>
                                </td>
                                </tr>
                            </tbody>
                            </table>

                    </div>
                </div>
            ) : (
                <div className={styles.containerOrder1}>
                {
                    selectOrder && (
                        <ModalFullOrder id={id.id} idState = {selectOrder} showExmaple={true} showCloseExample={()=>{setSelectOrder(null)}} />
                    )
                }
                      <div className={styles.containerOrder}>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(1)}}>
                          <img src="https://cdn.dribbble.com/users/129972/screenshots/2888283/74_03_smile.gif" alt="" />
                          <span>Đang chờ cửa hàng xác nhận</span>
                        </div>  
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(2)}}>
                          <img src="https://cdn.pixabay.com/animation/2022/11/10/13/26/13-26-03-556_512.gif" alt="" />
                          <span>Đang giao cho vận chuyển</span>
                        </div>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(3)}}>
                          <img src="https://media3.giphy.com/media/cmCHuk53AiTmOwBXlw/giphy.gif?cid=790b761134atoweuftdjmcxxx36utqr3pr7zyrjt9lhbb0st&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
                          <span>Đang vận chuyển</span>
                        </div>
                      </div>
                      <div className={styles.containerOrder}>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(4)}}>
                          <img src="https://i.pinimg.com/originals/ec/c4/6a/ecc46a7102f43334381641287f94b850.gif" alt="" />
                          <span>Giao hàng thành công</span>
                        </div>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(5)}}>
                          <img src="data:image/png;base64,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" alt="" />
                          <span>Giao hàng không thành công</span>
                        </div>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(6)}}>
                          <img src="https://images.freeimages.com/vhq/images/previews/ca1/cancel-icon-clip-art-90967.png" alt="" />
                          <span>Đã huỷ</span>
                        </div>
                        <div className={styles.itemOrder} onClick={()=>{setSelectOrder(7)}}>
                          <img src="https://cdn-icons-png.flaticon.com/512/1440/1440524.png" alt="" />
                          <span>Trả lại - Hoàn tiền</span>
                        </div> 
                      </div>         
                    </div>
            )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={setModalShow}>Đóng</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
