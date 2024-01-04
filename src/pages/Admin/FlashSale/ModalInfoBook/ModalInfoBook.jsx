import React, { useEffect, useState } from 'react'
import newRequest from '../../../../ults/NewRequest';
import { faL } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalInforBook.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function ModalInfoBook({id, show, handleClose}) {
  console.log(id)
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getBook = ()=>{
        setIsLoading(true)
        newRequest.get(`/book/item/${id}`).then((res)=>{
            setBook(res.data);
            console.log(res.data)
            setIsLoading(false);
            setError(false)
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.response.data)
        })
    }
    useEffect(()=>{
        getBook()
    },[])
    return (
        <>
          <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin của sách</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoading && (<img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>)}
            {book && (
                <div className={styles.container}>
                <div className={styles.left}>
                <div className={styles.item}>
                      <span className={styles.name_item}>Name</span>
                      <input type="text" value={book.name} className={styles.input_item} placeholder='Nhập name sách' name='name'  required/>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Nội dung</span>
                      <textarea name="desc" id="" cols="30" rows="13"  className={styles.input_item} value={book.desc}></textarea>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Thể loại</span>
                      <div style={{display: 'flex', gap : '20px'}}>{book.Categories.map((item)=>(
                        <span>{item.name}</span>
                      ))}</div>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Tác giả</span>
                      <input type="text" value={book.Author.name} className={styles.input_item} placeholder='Nhập name sách' name='name'  required/>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Giá</span>
                      <input type="text" className={styles.input_item} placeholder='Nhập giá sách' name='price' value={book.price + "đ"}  required/>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Phần trăm giảm giá </span>
                      <input type="text" className={styles.input_item} placeholder='Nhập phần trăm giảm giá (%)' name='percentDiscount' value={book.percentDiscount}  required/>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Ảnh</span>
                      <div style={{display :'flex', gap : '10px'}}>
                        <div style={{display :'flex', gap : '10px'}}>{book.Images.map((item, i)=>{
                          if(i < 2) return (
                            <img src={item.filename} alt="" style={{height : '53px'}}/>
                          )
                        })}</div>
                        {
                          book.Images.length > 2 && (
                            <div style={{position: 'relative'}}>
                              <img src="https://img.freepik.com/free-vector/abstract-background-with-dark-square-pattern_1048-1391.jpg" alt="" height={53}/>
                              <span style={{position :'absolute', color : 'white', fontWeight : '500', left : '10px', top : '15px'}}>+{book.Images.length - 2}</span>
                            </div>
                          )
                        }
                      </div>
                  </div>
                  <div className={styles.item}>
                      <span className={styles.name_item}>Nhà xuất bản</span>
                      <input type="text" className={styles.input_item} placeholder='Nhập nhà xuất bản' name='nhaXB' value={book.nhaXB}  required/>
                  </div>
                  <div className={styles.solieu}>
                    <div className={styles.solieu_left}>
                      <div className={styles.item_sl}>
                          <span className={styles.name_item}>Số lượng</span>
                          <input type="text" className={styles.input_item} placeholder='Nhập số lượng' name= 'sales_number' value={book.sales_number}  required/>
                      </div>
                      <div className={styles.item_sl}>
                        <span className={styles.name_item}>Năm xuất bản</span>
                        <input type="text" className={styles.input_item} placeholder='Nhập năm xuất bản' name='publication_date' value={book.publication_date}  required/>
                      </div>
                      <div className={styles.item_sl}>
                        <span className={styles.name_item}>Ngôn ngữ</span>
                        <input type="text" className={styles.input_item} placeholder='Nhập năm xuất bản' name='publication_date' value={book.languages}  required/>
                      </div>
                    </div>
                    <div className={styles.solieu_right}>
                    <div className={styles.item_sl}>
                      <span className={styles.name_item}>Khối lượng</span>
                      <input type="text" className={styles.input_item} placeholder='Nhập khối lượng (gam)' name='weight' value={book.weight}  required/>
                    </div>
                    <div className={styles.item_sl}>
                      <span className={styles.name_item}>Kích thước</span>
                      <input type="text" className={styles.input_item} placeholder='Nhập kích thước (hxw) (cm)' name='size' value={book.size}  required/>
                    </div>
                    <div className={styles.item_sl}>
                      <span className={styles.name_item}>Số trang</span>
                      <input type="text" className={styles.input_item} placeholder='Nhập số trang' name='numPage' value={book.numPage}  required/>
                    </div>
                    </div>
                  </div>
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
      );
}
