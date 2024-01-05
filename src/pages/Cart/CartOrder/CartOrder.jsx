import React, { useEffect, useState } from 'react';
import styles from './CartOrder.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPenToSquare, faTicket, faTrash, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import newRequest from '../../../ults/NewRequest';
import { useQuantity } from '../../../Context/QuantityProvider';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function CartOrder() {
    const {arrIdBook, updateArrIdBook, arrQuantity, updateArrQuantity, priceTotal, updatePriceTotal, address, updateAddress} = useQuantity();
    console.log(arrQuantity)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [book, setBook] = useState(null);
    const [priceInfor, setPriceInfor] = useState([]);
    const [priceShip, setPriceShip] = useState(null)
    const [priceFreeShip, setPriceFreeShip] = useState(null)
    const [priceFreeVoucher, setPriceFreeVoucher] = useState(null)
    const [priceUm, setPriceUm] = useState(0)
    const [idBook, setIdBook] = useState([])
    const [idVoucher, setIdVoucher] = useState([]);
    const [total, setTotal] = useState([])
    const [isLoadingPrice, setIsLoadingPrice] = useState(false)
    const [isOnline, setIsOnline] = useState(null)
    const [isOffline, setIsOffline] = useState(null)
    const [addressValue, setAddressValue] = useState(currentUser.address)
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const navigate = useNavigate()
    const getBook = async (arrIdBook) =>{
        if(Array.isArray(arrIdBook)){
          setIsLoading(true);
          await newRequest.post(`/cart/arr`,{
              id : arrIdBook
          }).then((res)=>{
              console.log(res)
              setBook(res.data);
              setIsLoading(false);
              setError(false);
          }).catch((error)=>{
              setError(error.response.data);
              setIsLoading(false)
          })
        }
      }
    console.log(currentUser)
    const getVoucher_Ship = async(book)=>{
        let data = [];
        let p =0;
        let id = [];
        let pShip = [];
        let pFShip = [];
        let pFVoucher = [];
        let idV = [];
        let t = []
        setIsLoadingPrice(true)
        for(let i = 0; i < book.length; i++){
            await newRequest.post(`/order/detailOrder/${book[i].Book.id}`,{
                id : arrIdBook,
                addressCus : "105 Tôn Đản, Đà Nẵng",
                total:book[i].Book.price * (1 - book[i].Book.percentDiscount)*arrQuantity[i]
            }).then((res)=>{
                data.push({
                    priceShip: res.data.priceShip,
                    priceFreeShip: res.data.priceFS.price_free,
                    priceVoucher: res.data.priceVS.price_free,
                })
                if(res.data.priceFS.voucher){
                    idV.push(res.data.priceFS.voucher.id)
                }
                if(res.data.priceVS.voucher){
                    idV.push(res.data.priceVS.voucher.id)
                }
                t.push(book[i].Book.price * (1 - book[i].Book.percentDiscount)*arrQuantity[i] + res.data.priceShip - res.data.priceFS.price_free - res.data.priceVS.price_free)
                id.push(book[i].Book.id)
                pShip.push(res.data.priceShip)
                pFShip.push(res.data.priceFS.price_free)
                pFVoucher.push(res.data.priceVS.price_free)
                p += res.data.priceShip - res.data.priceFS.price_free - res.data.priceVS.price_free;

            }).catch((error)=>{
                setError(error.response.data);
                setIsLoading(false)
            })
        }
        setPriceInfor(data)
        setPriceUm(p);
        setIdBook(id);
        setIdVoucher(idV)
        setPriceFreeShip(pFShip);
        setPriceShip(pShip);
        setPriceFreeVoucher(pFVoucher)
        setTotal(t)
        setIsLoadingPrice(false)
    }
    console.log(priceInfor)
    useEffect(()=>{
      console.log(arrIdBook)
      if(arrIdBook){
        getBook(arrIdBook);
        console.log('load')
        console.log(arrQuantity)
      }
    },[])
    useEffect(()=>{
        if(book){
          getVoucher_Ship(book);
        }
    },[book])
    const hanldeOrder = ()=>{
      if(!isOnline && !isOffline){
        toast.error('Vui lòng chọn phương thức thanh toán', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
      }
      if(isOffline){
        setIsLoadingOrder(true)
        newRequest.post(`/order/orderCart`,{
          idBook,
          quantity : arrQuantity,
          addressCus : addressValue,
          priceShip,
          priceFreeShip,
          priceFreeVoucher,
          total,
          idVoucher,
          idCart : arrIdBook,
      }).then((res)=>{
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
          });
          setIsLoadingOrder(false)
          localStorage.removeItem('arrQuantity');
          localStorage.removeItem('arrIdBook');
          localStorage.removeItem('address');
          localStorage.removeItem('books');
          localStorage.removeItem('quantity');
          localStorage.removeItem('priceTotal');
          navigate('/orderSuccess/thankOrder')
      }).catch((error)=>{
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
      })
      }else if(isOnline){

      }
    }
    const shipTotal = (priceShip)=>{
      let total = 0;
      priceShip.map((item)=>{
        total += item
      })
      return total;
    }
    return(
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
                    <td><input type="text" placeholder='Nhập số điện thoại' defaultValue={currentUser.phone} 
                      style={{
                        border: 'none',
                        outline : 'none'
                      }}
                    /> </td>
                  </tr>
                  <tr>
                    <th>Địa chỉ</th>
                    <td><input type="text" placeholder='Nhập địa chỉ' defaultValue={currentUser.address}
                      style={{
                        border: 'none',
                        outline : 'none'
                      }}
                      onChange={(e)=>{setAddressValue(e.target.value)}}
                    />
                    </td>
                  </tr>
                </table>
              </div>
              <div className={styles.product_cart}>
                <div className={styles.title} style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Đơn hàng</span>
                  <span>                          {
                    isLoadingPrice && (
                      <img src='https://i.pinimg.com/originals/1f/5e/bc/1f5ebcca067967286be57593fa6ac084.gif' height={50}/>
                    )
                    }
                  </span>
                </div>
                <div className={styles.product_cart_content}>
                  <table>
                      {isLoading && (
                          <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                      )}
                      {book && book.map((item, i)=>(
                        
                        <tr className={styles.item} key={item.id}>
                            {priceInfor && priceInfor.length > 0 && (
                                <div className={styles.priceShip}>
                                    <div style={{display : 'flex', flexDirection : 'column', gap : '10px'}}>
                                    <div className={styles.iconShip}>
                                        <FontAwesomeIcon icon={faTruckFast} style={{color : '#0094b6'}}/>
                                        <span className={styles.priceS} style={{fontSize : '12px', fontStyle: 'italic'}}>{priceInfor[i].priceShip}đ</span>
                                    </div>
                                    <div className={styles.iconShip}>
                                        <FontAwesomeIcon icon={faTicket} style={{color : '#0094b6'}}/>
                                        <span className={styles.priceS}style={{fontSize : '12px', fontStyle: 'italic', color : 'red'}}>-{priceInfor[i].priceVoucher}đ</span>
                                    </div>
                                    <div className={styles.iconShip}>
                                        <FontAwesomeIcon icon={faTruckFast} style={{color : '#0094b6'}}/>
                                        <span className={styles.priceS}style={{fontSize : '12px', fontStyle: 'italic', color : 'red'}}>-{priceInfor[i].priceFreeShip}đ</span>
                                    </div>
                                    </div>
                                </div>
                            )}
                            <td>
                                <img src={item.Book.Images[0].filename} alt="" />
                            </td>
                            <td className={styles.product_name}>
                                <span>{item.Book.name}</span>
                            </td>
                            <td>
                                {item.Book.percentDiscount > 0 ? (
                                <div className={styles.product_price}>
                                    <b>
                                    {(
                                        item.Book.price *
                                        (1 - item.Book.percentDiscount)
                                    ).toFixed(0)}
                                    đ
                                    </b>
                                    <span className={styles.old_price}>
                                    {item.Book.price}đ
                                    </span>
                                    <span className={styles.percentDiscount}>
                                    {item.Book.percentDiscount * 100}%
                                    </span>
                                </div>
                                ) : (
                                <div>
                                    <b>{item.Book.price}đ</b>
                                </div>
                                )}
                            </td>
                            <td>
                                Số lượng : {arrQuantity[i]}
                            </td>
                            </tr>
                      ))}
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
                      <input type="radio" id="1" name="thanhtoan" 
                        onClick={()=>{
                          setIsOffline(true)
                          setIsOnline(false)
                        }}
                      />
                      <label htmlFor="1">Thanh toán khi nhận hàng</label>
                      <br></br>
                      <input type="radio" id="2" name="thanhtoan" 
                      onClick={()=>{
                        setIsOffline(false)
                        setIsOnline(true)
                      }}
                      />
                      <label htmlFor="2">Thanh toán online</label>
                    </form>
                    <div className={styles.total}>
                      <span>Thành tiền</span>
                      <table>
                        <tr>
                          <th>Tổng số tiền sản phẩm: </th>
                          <td>{priceTotal ? priceTotal : '...'}đ</td>
                        </tr>
                        <tr>
                          <th>Tiền vận chuyển: </th>
                          <td>{priceShip ? shipTotal(priceShip) : '...'}đ</td>
                        </tr>
                        {
                          priceFreeShip && shipTotal(priceFreeShip) > 0 && (
                          <tr>
                            <th>Miễn phí vận chuyển: </th>
                            <td style={{color:'red '}}>-{priceFreeShip ? shipTotal(priceFreeShip) : '...'}đ</td>
                          </tr>
                          )
                        }
                        {
                          priceFreeVoucher && shipTotal(priceFreeVoucher) > 0 && (
                            <tr>
                              <th>Mã giảm giá: </th>
                              <td style={{color:'red '}}>-{priceFreeVoucher ? shipTotal(priceFreeVoucher) : '...'}đ</td>
                            </tr>
                          )
                        }
                        <tr>
                          <th>Tổng số tiền thanh toán: </th>
                          <td>{priceTotal && priceShip && priceFreeShip && priceFreeVoucher ? (parseInt(priceTotal) + parseInt(shipTotal(priceShip)) - parseInt(shipTotal(priceFreeShip)) - parseInt(shipTotal(priceFreeVoucher))) : '...'}đ</td>
                        </tr>
                        {/* {isPendingPrice && (
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
                        )} */}
                      </table>
                    </div>
                    <div className={styles.btn}>
                      <button onClick={()=>{hanldeOrder()}}>Đặt hàng</button>
                    </div>
                    {/* {isPendingOrder && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={380} />)} */}
                  </div>
                </div>
                {isLoadingOrder && (
                  <img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={405} />
                )}
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
        {/* <Chat /> */}
      </div>
    )
}
