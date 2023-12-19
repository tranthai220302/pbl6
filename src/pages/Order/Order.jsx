import React, { useEffect, useState } from 'react';
import styles from './Order.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
import { useQuantity } from '../../Context/QuantityProvider';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Order() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorPrice, setErrorPrice] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [isPendingPrice, setIsPendingPrice] = useState(null);
  const [errorOrder, setErrorOrder] = useState(null)
  const [isPendingOrder, setIsPendingOrder] = useState(false);
  const [price, setPrice] = useState(0);
  const [idVoucher, setIdVoucher] = useState([])
  const [isOnline, setIsOnline] = useState(null)
  const [isOffline, setIsOffline] = useState(null)
  const [priceInfor, setPriceInfor] = useState({
    priceShip : 0,
    priceFreeShip : 0,
    priceVoucher : 0,
    total : 0,
  });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const { id } = useParams();
  const { quantity, updateQuantity, address, updateAdress } = useQuantity();
  const [book, setBook] = useState(null);
  const handleOrder = async (quantity, addressCus, priceShip, priceFreeShip, priceFreeVoucher, total, idVoucher, isOnline) =>{
    try {
        if(isOnline){
            const res = await newRequest.post(`/order/create_payment_url/${id}`,{
                quantity,
                addressCus,
                priceShip,
                priceFreeShip,
                priceFreeVoucher,
                total,
                idVoucher
            });
            window.location.href = res.data;
        }
        if(isOffline){
          setIsPendingOrder(true);
          try {
              const res = await newRequest.post(`/order/create/${id}`,{
                  quantity,
                  addressCus,
                  priceShip,
                  priceFreeShip,
                  priceFreeVoucher,
                  total,
                  idVoucher
              });
              toast.success(res.data.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000, 
                  });
              setIsPendingOrder(false);
              setErrorOrder(false);
              navigate('/')
          } catch (error) {
              toast.error(error.response.data, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000, 
              });
              setErrorOrder(error.response.data);
              setIsPendingOrder(false);
          }
        }
    } catch (error) {
        
    }
  }
  const getPriceShip_Voucher = async (total, addressCus) => {
    setIsPendingPrice(true);
    try {
      const res = await newRequest.post(`/order/detailOrder/${id}`,{
        total,
        addressCus
      });
      setPriceInfor({
        priceShip : res.data.priceShip,
        priceFreeShip : res.data.priceFS.price_free,
        priceVoucher : res.data.priceVS.price_free,
        total : res.data.total
      })
      console.log(res.data)
      const newVoucherId = res.data.priceFS.voucher?.id;
      if (newVoucherId) {
        setIdVoucher(prevIds => [...prevIds, newVoucherId]);
      }
      const newVoucherVSId = res.data.priceVS.voucher?.id;
      if (newVoucherVSId) {
        setIdVoucher(prevIds => [...prevIds, newVoucherVSId]);
      }
      setIsPendingPrice(false);
      setErrorPrice(false);
    } catch (error) {
      setErrorPrice(error.response.data);
      setIsPendingPrice(false);
    }
  }
  const getBook = async (id) =>{
    setIsPending(true);
    try {
      const res = await newRequest.get(`/book/item/${id}`);
      setBook(res.data);
      setIsPending(false);
      setError(false);
    } catch (error) {
      setError(error.response.data);
      setIsPending(false);
    }
  }
  useEffect(()=>{
    getBook(id)
  },[id])
  useEffect(()=>{
    setPrice(quantity*(book?.price*(1 - book?.percentDiscount)).toFixed(0))
  },[quantity, book])
  useEffect(()=>{
    if(price){
        getPriceShip_Voucher(price, address)
    }
  },[price])
  return (
    <div>
      {currentUser ? (
        <div className={styles.cart}>
          <div className={styles.left}>
            <div className={styles.customer_info}>
              <div className={styles.title}>
                <span>Thông tin giao hàng</span>
                <div className={styles.icon_edit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col />
                </colgroup>
                <tr>
                  <th>Tên người nhận</th>
                  <td>{currentUser.firstName + ' ' + currentUser.lastName}</td>
                </tr>
                <tr>
                  <th>Số điện thoại</th>
                  <td>{currentUser.phone}</td>
                </tr>
                <tr>
                  <th>Địa chỉ</th>
                  <td>{address  }</td>
                </tr>
              </table>
            </div>
            <div className={styles.product_cart}>
              <div className={styles.title}>
                <span>Đơn hàng</span>
              </div>
              <div className={styles.product_cart_content}>
                <table>
                    {isPending && (
                        <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                    )}
                    {book && (
                        <tr className={styles.item} key={book.id}>
                            <td>
                                <img src={book.Images[0].filename} alt="" />
                            </td>
                            <td className={styles.product_name}>
                                <span>{book.name}</span>
                            </td>
                            <td>
                                {book.percentDiscount > 0 ? (
                                <div className={styles.product_price}>
                                    <b>
                                    {(
                                        book.price *
                                        (1 - book.percentDiscount)
                                    ).toFixed(0)}
                                    đ
                                    </b>
                                    <span className={styles.old_price}>
                                    {book.price}đ
                                    </span>
                                    <span className={styles.percentDiscount}>
                                    {book.percentDiscount * 100}%
                                    </span>
                                </div>
                                ) : (
                                <div>
                                    <b>{book.price}đ</b>
                                </div>
                                )}
                            </td>
                            <td>
                                Số lượng : {quantity}
                            </td>
                            <td>
                                <div
                                className={styles.icon_trash}
                                >
                                <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                        </tr>
                    )}
                </table>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.pay}>
              <div className={styles.title}>
                <span>Đặt hàng</span>
              </div>
              <div className={styles.pay_content}>
                <div>
                  <span>Chọn phương thức thanh toán</span>
                  <form action="">
                    <input type="radio" id="1" name="thanhtoan" onClick={()=>{
                      setIsOffline(true)
                      setIsOnline(false)
                    }}/>
                    <label htmlFor="1">Thanh toán khi nhận hàng</label>
                    <br></br>
                    <input type="radio" id="2" name="thanhtoan" onClick={()=>{
                      setIsOffline(false)
                      setIsOnline(true)
                    }}/>
                    <label htmlFor="2">Thanh toán online</label>
                  </form>
                  <div className={styles.total}>
                    <span>Thành tiền</span>
                    <table>
                      <tr>
                        <th>Tổng số tiền sản phẩm: </th>
                        <td>{price ? price : '...'}đ</td>
                      </tr>
                      {isPendingPrice && (
                         <img className={styles.img_load} src='https://i.gifer.com/ZKZg.gif' />
                      )}
                      {!isPendingPrice && !errorPrice &&(
                            <tr>
                                <th>Tiền ship: </th>
                                <td>{priceInfor.priceShip}đ</td>
                            </tr>
                      )}
                     {!isPendingPrice && !errorPrice &&(
                            <tr>
                                <th>FreeShip: </th>
                                <td style={{ color: 'red' }}>-{priceInfor.priceFreeShip}đ</td>   
                            </tr>
                      )}
                      {!isPendingPrice && !errorPrice &&(
                            <tr>
                                <th>Voucher giảm giá: </th>
                                <td style={{ color: 'red' }}>-{priceInfor.priceVoucher}đ</td>
                            </tr>
                      )}
                     {!isPendingPrice && !errorPrice &&(
                            <tr>
                                <th>Tổng tiền: </th>
                                <td>{price + priceInfor.priceShip - priceInfor.priceFreeShip - priceInfor.priceVoucher}đ</td>
                            </tr>
                      )}
                    </table>
                  </div>
                  <div className={styles.btn}>
                    <button onClick={()=>{handleOrder(quantity, address, priceInfor.priceShip, priceInfor.priceFreeShip, priceInfor.priceVoucher, priceInfor.total, idVoucher, isOnline)}}>Đặt hàng</button>
                  </div>
                  {isPendingOrder && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={380} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cart_notlogin}>
          <span className={styles.Notification}>
            Bạn cần đăng nhập để truy cập!
          </span>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
    </div>
  );
}
