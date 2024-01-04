import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './ModalFullOrder.module.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import newRequest from '../../../../../ults/NewRequest';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faCheck, faXmark, faBicycle, faTag, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import ModalTypeOrder from '../ModalTypeOrder';
export default function ModalFullOrder({id,showExmaple, showCloseExample, idState}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPage, setNumPage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectProductUpdate, setSelectProductUpdate] = useState(null)
  const [selectProduct, setSelectProduct] = useState(null)
  const [isLoadingDele, setIsLoadingDele] = useState(null)
  const getData = (page) => {
    let url = `/order/store/${id}?page=${page}&idState=${idState}`
    setIsLoading(true)
    newRequest.get(url, {
      withCredentials: true
    })
    .then((res) => {
      setData(res.data.orders)
      setNumPage(res.data.numPage)
      setIsLoading(false);
      setError(false)
    })
    .catch((error) => {
      setError(error.response.data)
      setIsLoading(false)
    });
  };

  const handleDeleteClickOrder = (id) =>{
    const confirmed = window.confirm('Bạn có muốn xoá đơn hàng này không ?');
  
    if (confirmed) {
        setIsLoadingDele(true);
        newRequest.delete(`/order/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
            toast.success('Xoá thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            getData(1)
            setIsLoadingDele(false);
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsLoadingDele(false);
        });
    }
  }
  const submit = (item) => {
    handleDeleteClickOrder(item.id)
    setOpen(false);
  };

  const click = (item) => {
    setSelectProduct(item)
    setOpen(false);
  };

//   const clickUp = (item) => {
//     setSelectProductUpdate(item)
//     setOpen(false);
//   };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

    useEffect(() => {
        getData(1);
    }, [id]);
    return (
        <>
          <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className={styles.searc_ss}>
                    <div>
                        Danh sách đơn hàng
                    </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.body}>
            <div className={styles.background}>
                {selectProduct && (
                            <ModalTypeOrder modalShow={true} setModalShow={()=>{setSelectProduct(null)}} id = {selectProduct} isDetail = {true} />
                )}
              {isLoading && !isLoadingDele && (
                    <img src="https://cdn.dribbble.com/users/1580738/screenshots/8211345/media/825dcf86d50bef97fe4ce72f733f511f.gif" alt="" height={200} width={200} style={{display: 'flex', justifyContent : 'center', margin : 'auto', marginTop : '20%'}}/>
                )}
                {isLoadingDele && (
                    <img src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto', position : 'absolute', zIndex : '999', left : '40%', top : '50%'}}/>
                )}
                <div className={styles.booklist}>
                {error  && (
                    <div>Không có đơn hàng</div>
                )}
                {data && !error && !isLoading && data.length > 0  && data.map((item, index)=>(
                    <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id} style={{marginBottom : '50px', position : 'relative'}}>
                    <div style={{position : 'absolute', right : '5px'}}>
                      <FontAwesomeIcon icon={faInfoCircle} style={{color : 'gray'}} onClick={() => handleEdit(index)}/>
                      {editIndex === index && open && (
                          <div className={styles.editBlock}>
                            <ul>
                                <li onClick={()=>{submit(item)}}>Xoá</li>
                                <li onClick={()=>{click(item)}}>Xem chi tiết</li>
                            </ul>
                          </div>
                        )}
                    </div>
                    <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/1356/1356593.png" style={{height : '190px', width : '100%'}} alt='' />
                    </div>
                    <div style={{display : 'flex', flexDirection: 'column'}}>
                    <table>
                        <tr>
                            <td style={{display : 'flex', alignItems : 'center'}}>
                                <span style={{fontWeight :'600', fontSize : '15px'}}>Khách hàng</span>
                            </td>
                            <td style={{fontSize : '15px'}}>
                                {item.customer.firstName} {item.customer.lastName}
                            </td>
                        </tr>
                        <tr style={{marginTop : '-5px'}}>
                            <td style={{display : 'flex', alignItems : 'center'}}>
                                <span style={{fontWeight :'600', fontSize : '15px'}}>Thanh toán</span>
                            </td>
                            <td>
                                {item.isPayment ? (
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqHzy0ldCEL5HHRmQE3FVHW-J5p2VMW8yDbw&usqp=CAU" alt="" height={20} style={{borderRadius : '50%'}}/>
                                ) : (
                                    <img src="https://i.pngimg.me/thumb/f/720/m2H7Z5b1A0m2K9N4.jpg" alt="" height={20} style={{borderRadius : '50%'}} />
                                )}
                            </td>
                        </tr>
                    </table>

                    </div>
                  </div>
                    ))}
                </div>
                </div>
                <div className={styles.num_page}>
                    {numPage !== 0 && numPage && !error && !isLoading && numPage > 1 && [...Array(numPage)].map((_, index) => (
                        <span key={index + 1} onClick={()=>{getData(index+1)}}>{index + 1}</span>
                    ))}
                </div>
            </Modal.Body>
          </Modal>
        </>
      );
}
