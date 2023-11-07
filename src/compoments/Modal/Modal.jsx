import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Modal.module.css'
import { faTrash, faEnvelope, faMobilePhone, faWarehouse, faPenToSquare, faCircleInfo, faSearch, faBell, faAlignCenter, faL, faUser} from '@fortawesome/free-solid-svg-icons';
export default function ModalCustomer({customer, show, handleClose, product}) {
  return (
    <>
    <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {customer && (
              <div className={styles.card}>
              <div className={styles.avatar_card}>
                <img className={styles.img_card} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxMWB6zdzX1Yhcbhe3KJQr3zxGsl_ETGi2A&usqp=CAU" alt="" />
                <div className={styles.card_name}>{customer.firstName} {customer.lastName}</div>
              </div>
              <div className={styles.infor}>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.card_icon} />
                    <div className={styles.name_item}>{customer.email}</div>
                  </div>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faWarehouse} className={styles.card_icon}/>
                    <div className={styles.name_item}>{customer.address}</div>
                  </div>
                </div>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faMobilePhone} className={styles.card_icon} />
                    <div className={styles.name_item}>{customer.phone ? `0${customer.phone}` : ''}</div>
                  </div>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faUser} className={styles.card_icon} />
                    <div className={styles.name_item}>23</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {product && (
              <div className={styles.book}>
                <div className={styles.book_image}>
                  <img src={product.Images[0].filename} alt='Avatar' />
                </div>
                <div className={styles.book_info}>
                  <h3 className={styles.book_title}>{product.name}</h3>
                  <p className={styles.book_item}>
                    <div className={styles.book_t}>Nội dung :</div>
                    <span  className={styles.book_content}>{product.desc}</span>
                  </p>
                  <p className={styles.book_item}>
                    <div className={styles.book_t}>Giá :</div>
                    <span className={styles.book_content}>{product.price}đ</span>
                  </p>
                  <p className={styles.book_item}>
                    <div className={styles.book_t}>Số lượng :</div>
                    <span className={styles.book_content}>{product.sales_number}</span>
                  </p>
                  <p className={styles.book_item}>
                    <div className={styles.book_t}>Tác giả :</div>
                    <span className={styles.book_content}>{product.Author.name}</span>
                  </p>
                  <p className={styles.book_item}>
                    <div className={styles.book_t}>Thể loại :</div>
                    <div className={styles.book_content}>
                      {product.Categories.map((item)=>(
                          <span>{item.name} <br></br></span> 
                      ))}
                    </div>
                  </p>
                </div>
              </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}
