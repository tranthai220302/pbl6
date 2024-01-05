import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './ModalListBook.module.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import newRequest from '../../../../ults/NewRequest';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ModalInfoBook from '../../FlashSale/ModalInfoBook/ModalInfoBook';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faCheck, faXmark, faBicycle, faTag, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import ModalUpdate from '../../../../compoments/ModalUpdate/ModalUpdate';
export default function ModalListBook({id,showExmaple, showCloseExample, category}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPage, setNumPage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectProductUpdate, setSelectProductUpdate] = useState(null)
  const [selectProduct, setSelectProduct] = useState(null)

  const getData = (page) => {
    const endpoint = !id
      ? `/book/search?page=${page}&category=${category}&num=15`
      : `/book/search?idStore=${id}&page=${page}&category=${category}&num=15`;

    setIsLoading(true);
    newRequest.get(endpoint)
      .then((res) => {
        setData(res.data.booksByQuery);
        setNumPage(res.data.numpage);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
      });
  };

  const handleDelete = (id) =>{
    const confirmed = window.confirm('Bạn có muốn xoá sẩn phẩm này không ?');
  
    if (confirmed) {
        newRequest.delete(`/book/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
          toast.success('Xoá thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
        });
            getData(1)
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  }

  const submit = (item) => {
    handleDelete(item.id);
  };

  const click = (item) => {
    setSelectProduct(item.id)
    setOpen(false);
  };

  const clickUp = (item) => {
    setSelectProductUpdate(item)
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    getData(1);
  }, [category, id]);
    return (
        <>
          <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className={styles.searc_ss}>
                    <div>
                        Danh sách sản phẩm
                    </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
            <div className={styles.background}>
              {isLoading && (
                    <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>
                )}
                <div className={styles.booklist}>
                {error && (
                    <div>Không có sách</div>
                )}
                  {selectProductUpdate && (
                    <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getDataProduct={getData} />
                  )}
                        {
                            selectProduct && (
                                <ModalInfoBook id = {selectProduct} show={true} handleClose={()=>{setSelectProduct(null)}}/>
                            )
                        }
                {data && !error && !isLoading && data.length > 0  && data.map((item, index)=>(
                    <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id} style={{marginBottom : '50px', position : 'relative'}}>
                    <div style={{position : 'absolute'}}>
                      <FontAwesomeIcon icon={faInfoCircle} style={{color : 'gray'}} onClick={() => handleEdit(index)}/>
                      {editIndex === index && open && (
                          <div className={styles.editBlock}>
                            <ul>
                                <li onClick={()=>{clickUp(item)}}>Chỉnh sửa</li>
                                <li onClick={()=>{submit(item)}}>Xoá</li>
                                <li onClick={()=>{click(item)}}>Xem sản phẩm</li>
                            </ul>
                          </div>
                        )}
                    </div>
                    <img src={item.Images[0].filename} alt='' />
                    <span>{item.name}</span>
                    {item.percentDiscount > 0 ? (
                      <div>
                        <b>{(item.price * (1 - item.percentDiscount)).toFixed(0)}đ</b>
                        <div>
                          <span className={styles.old_price}>{item.price}đ</span>
                          <span className={styles.percentDiscount}>{item.percentDiscount*100}%</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <b>{item.price}đ</b>
                        <div>
                          <span className={styles.current_price}></span>
                        </div>
                      </div>
                    )}
                    <span style={{
                      backgroundColor : '#f1b1b0',
                      borderRadius : '10px',
                      display : 'flex',
                      alignItems: 'center',
                      justifyContent : 'center',
                      fontSize: '13px',
                      color: 'white',
                      marginTop : '5px'
                    }}>Đã bán {item.purchases}</span>
                  </div>
                    ))}
                </div>
                </div>
                <div className={styles.num_page}>
                    {numPage && !isLoading && numPage > 1 && [...Array(numPage)].map((_, index) => (
                        <span key={index + 1} onClick={()=>{getData(index+1)}}>{index + 1}</span>
                    ))}
                </div>
            </Modal.Body>
          </Modal>
        </>
      );
}
