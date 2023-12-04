import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalFull.module.css'
import { useEffect } from 'react';
import newRequest from '../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalCustomer from '../Modal/Modal';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import Voucher from '../../pages/Admin/Voucher/Vouher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddVoucher from '../../pages/Admin/Voucher/AddVoucher/AddVoucher';
import moment from 'moment';
import AddBook from '../../pages/Admin/Store/AddBook/AddBook';
function Example({showExmaple, showCloseExample, id, isOrder, isVoucher}) {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [selectProduct, setSelectProduct] = useState(null);
  const [selectProductUpdate, setSelectProductUpdate] = useState(null)
  const [selectedVoucher, setSelectedVoucher] = useState(null); 
  const [nameVoucher, setNamVoucher] = useState('');
  const getData = (name) =>{
    let url;
    if(isOrder){
      url = `/order/store/${id}`
      setIsPending(true)
      newRequest.get(url, {
        withCredentials: true
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
        setIsPending(false);
        setError(false)
      })
      .catch((error) => {
        setError(error.response.data)
        setIsPending(false)
      });
    }else if(!isOrder && !isVoucher){
      url = `/book/store/${id}?name=${name}`
      setIsPending(true)
      newRequest.get(url, {
        withCredentials: true
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
        setIsPending(false);
        setError(false)
      })
      .catch((error) => {
        setError(error.response.data)
        setIsPending(false)
      });
    } else if(isVoucher){
      setIsPending(true)
        newRequest.get(`/voucherItem/${id}?name=${nameVoucher}`, {
          withCredentials: true
        })
        .then((res) => {
          setData(res.data)
          console.log(res.data)
          setIsPending(false);
          setError(false)
        })
        .catch((error) => {
          setError(error.response.data)
          setIsPending(false)
        });
      }
  }

  const handleDeleteClick = (id) =>{
    const confirmed = window.confirm('Bạn có muốn xoá sẩn phẩm này không ?');
  
    if (confirmed) {
        newRequest.delete(`/book/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
            getData('')
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
    }
  }
  const handleDeleteClickVoucher = (id) =>{
    const confirmed = window.confirm('Bạn có muốn voucher này này không ?');
  
    if (confirmed) {
        newRequest.delete(`/voucherItem/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
            getData('')
            toast.success("Xoá voucher thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000, 
            });
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
    }
  }
  const handleDeleteClickOrder = (id) =>{
    const confirmed = window.confirm('Bạn có muốn xoá đơn hàng này không ?');
  
    if (confirmed) {
        newRequest.delete(`/order/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
            getData('')
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getData(name);
    }
  };
  useEffect(()=>{
    getData('');
  },[])
  const handleKeyPressVoucher = ()=>{
    getData('')
  }
  return (
    <>
      <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isVoucher && (
                <div className={styles.searc_ss}>
                <div>
                    {isVoucher && (<div>Danh sách voucher của cửa hàng</div>)}
                    {isVoucher && (
                        <input 
                            type="text" 
                            placeholder='Nhập tên voucher' 
                            className={styles.search} 
                            onKeyPress={handleKeyPressVoucher}
                            onChange={(e) =>{setNamVoucher(e.target.value)}}
                        />
                    )}
                </div>
                <div className={styles.add}><AddVoucher id = {id} getData = {getData} idVoucher={1}/></div>
            </div>
            )}
            {!isOrder && !isVoucher && (
                <input 
                    type="text" 
                    placeholder='Nhập tên sách' 
                    className={styles.search} 
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>{setName(e.target.value)}}
                />
            )}
            {isOrder && (<div>Danh sách đơn hàng</div>)}
            {!isOrder && !isVoucher && <AddBook id = {id} getData={getData} />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          {!isOrder && !isVoucher && (
            <div className={styles.table1}>
            <table>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Name</th>
                <th>Nội dung</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Xoá</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {!error && data && data.map((product) => (
                <tr key={product.id}>
                  {selectProduct && (
                    <ModalCustomer customer={null} show={true} handleClose={() => setSelectProduct(null)} product={selectProduct}/>
                  )}
                  {selectProductUpdate && (
                    <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getDataProduct={getData} />
                  )}
                  <td>
                    <img src={product.Images[0]?.filename} alt="Avatar" width="50" height="50" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.desc}</td>
                  <td className={styles.price}>{product.price}đ</td>
                  <td>{product.sales_number}</td>
                  <td>{product.Author?.name}</td>
                  <td>{product.Categories.map((item)=>(
                    <span>{item.name} <br></br></span> 
                  ))}</td>
                  <td>
                    <button>
                    <FontAwesomeIcon  icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClick(product.id)}} />
                    </button>
                  </td>
                  <td>
                    <button><FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon} 
                        onClick={()=>setSelectProductUpdate(product)}
                    />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {isPending && (
              <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
            )}
            {error && (<div className={styles.error}>{error}</div>)}
          </div>
          )}
          {isOrder && (
            <div className={styles.table1}>
              <table>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán<nav></nav></th>
                  <th>Số lượng</th>
                  <th>Ngày đăt hàng</th>
                  <th>Khách hàng</th>
                  <th>Cửa hàng</th>
                  <th>Sản phẩm</th>
                  <th>Trạng thái</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {!error && data && data.map((product) => (
                  <tr key={product.id}>
                    {selectProduct && (
                      <ModalCustomer customer={null} show={true} handleClose={() => setSelectProduct(null)} product={selectProduct}/>
                    )}
                    {selectProductUpdate && (
                      <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getDataProduct={getData} />
                    )}
                    <td>
                      <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' alt="Avatar" width="50" height="50" />
                    </td>
                    <td>{product.total_price}đ</td>
                    {product.isPayment ? (
                      <td><FontAwesomeIcon icon={faCheck} className={styles.check_icon} /></td>
                    ) : ( <td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                    <td className={styles.price}>{product.quantity}</td>
                    <td>{Date(product.createdAt)}</td>
                    <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                    <td>{product.store?.firstName} {product.store?.lastName}</td>
                    <td>{product.Book?.name}</td>
                    <td>{product.State?.status}</td>
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              {isPending && (
                <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
              )}
              {error && (<div className={styles.error}>{error}</div>)}
            </div>
          )}
            {isVoucher && (
            <div className={styles.table1}>
              <table>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Name</th>
                  <th>Loại<nav></nav></th>
                  <th>Điều kiện</th>
                  <th>Giảm giá</th>
                  <th>Số lượng</th>
                  <th>Ngày hết hạn</th>
                  <th>Xoá</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                {!error && data && data.map((product) => (
                  <tr key={product.id}>
                    {selectedVoucher && (
                      <ModalUpdate voucher={selectedVoucher} showUpdate={true} handleCloseUpdate={() => setSelectedVoucher(null)} getData={getData} />
                    )}
                    <td>
                      <img src='https://insacmau.com/wp-content/uploads/2021/06/voucher-la-gi-3.jpg' alt="Avatar" width="50" height="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.discountType}</td>
                    <td className={styles.price}>{`Đơn hàng có giá trị >`} {product.codition}đ</td>
                    {product.discountType === 'amount' ? (
                      <td>{product.discountValue}đ</td>
                    ):(
                      <td>{product.discountValue}%</td>
                    )}
                    <td>{product.quantity}</td>
                    <td>{moment(product.expiryDate).format("DD-MM-YYYY")}</td>
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickVoucher(product.id)}} />
                      </button>
                    </td>
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faPenToSquare} className={styles.user_icon}  
                        onClick={()=>{
                          setSelectedVoucher(product)
                        }}
                      />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              {isPending && (
                <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
              )}
              {error && (<div className={styles.error}>{error}</div>)}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;