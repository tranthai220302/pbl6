import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import newRequest from '../../ults/NewRequest';
import { useQuantity } from '../../Context/QuantityProvider';
import { useLocation } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [totalPrice, setTotalPrice] = useState("");
  const location = useLocation();
  const [priceShip, setPriceShip] = useState(0);
  const { id } = location.state || "";
  const {arrIdBook, updateArrIdBook, arrQuantity, updateArrQuantity, priceTotal, updatePriceTotal} = useQuantity();
  const navigate = useNavigate();
  const fetchData = async () => {
    setIsPending(true);
    try {
      console.log(id)
      const res = await newRequest.get('/cart');
      setData(res.data);
      if (id) {
        console.log("s",id)
        const bookToSelect = res.data.find((book) => book.BookId === parseInt(id, 10));
        console.log(bookToSelect)
        if (bookToSelect) {
          handleCheckboxChange(bookToSelect.id);
        }
      }
      setIsPending(false);
      setError(false);
    } catch (error) {
      setError(error.response.data);
      setIsPending(false);
    }
  };
  

  const DeleteCart = async (id) => {
    setIsPending(true);
    try {
      await newRequest.delete(`/cart/delete/${id}`);
      setIsPending(false);
      setError(false);
      fetchData();
    } catch (error) {
      setError(error.response.data);
      setIsPending(false);
    }
  };

  const updateCart = async (id, count) => {
    setIsPending(true);
    try {
      await newRequest.put(`/cart/update/${id}`, { quantity: count });
      setIsPending(false);
      setError(false);
    } catch (error) {
      setError(error.response.data);
      setIsPending(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const total = calculateTotalPrice();
    console.log('Total Price:', total);
  }, [selectedItems, data, quantity]);

  const handleCheckboxChange = async(id, q) => {
    const isSelected = selectedItems.includes(id);
    calculateTotalPrice();
  
    if (!isSelected) {
      setSelectedItems([...selectedItems, id]);
      setQuantity([...quantity, q]);
    } else {
      const updatedItems = selectedItems.filter((itemId) => itemId !== id);
      const updatedQuantity = quantity.filter((itemQ, index) => index !== selectedItems.indexOf(id));
      setSelectedItems(updatedItems);
      setQuantity(updatedQuantity);
    }
  };
  const calculateTotalPrice = () => {
    const selectedProducts = data.filter((product) =>
      selectedItems.includes(product.id)
    );
    let total = 0;
    selectedProducts.map((item, i)=>{
      total += item.Book.price * (1 - item.Book.percentDiscount)*quantity[i]
    })
    setPrice(total.toFixed(0));
    return total;
  };

  const handleCountChange = (id, newCount) => {
    const updatedQuantity = quantity.map((itemQ, index) => {
      if (selectedItems.includes(id) && selectedItems.indexOf(id) === index) {
        return parseInt(newCount, 10);
      }
      return itemQ;
    });
  
    setQuantity(updatedQuantity);
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  };
  const handleOrder = ()=>{
    updateArrIdBook(selectedItems)
    updateArrQuantity(quantity)
    updatePriceTotal(price)
    navigate('/orderCart')
  }
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
                  <td>{currentUser.address}</td>
                </tr>
              </table>
            </div>
            <div className={styles.product_cart}>
              <div className={styles.title}>
                <span>Giỏ hàng</span>
              </div>
              <div className={styles.product_cart_content}>
                <table>
                  {data.map((value) => (
                    <tr className={styles.item} key={value.id}>
                      <td>
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(value.id, value.quantity)}
                          checked={selectedItems.includes(value.id)}
                        />
                      </td>
                      <td>
                        <img src={value.Book.Images[0].filename} alt="" />
                      </td>
                      <td className={styles.product_name}>
                        <span>{value.Book.name}</span>
                      </td>
                      <td>
                        {value.Book.percentDiscount > 0 ? (
                          <div className={styles.product_price}>
                            <b>
                              {(
                                value.Book.price *
                                (1 - value.Book.percentDiscount)
                              ).toFixed(0)}
                              đ
                            </b>
                            <span className={styles.old_price}>
                              {value.Book.price}đ
                            </span>
                            <span className={styles.percentDiscount}>
                              {value.Book.percentDiscount * 100}%
                            </span>
                          </div>
                        ) : (
                          <div>
                            <b>{value.Book.price}đ</b>
                          </div>
                        )}
                      </td>
                      <td>
                        <input
                          className={styles.count}
                          type="number"
                          name=""
                          id=""
                          placeholder={value.quantity}
                          defaultValue={value.quantity}
                          onChange={(e) =>
                            handleCountChange(value.id, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <div
                          className={styles.icon_trash}
                          onClick={() => DeleteCart(value.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
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
                    <input type="radio" id="1" name="thanhtoan" />
                    <label htmlFor="1">Thanh toán khi nhận hàng</label>
                    <br></br>
                    <input type="radio" id="2" name="thanhtoan" />
                    <label htmlFor="2">Thanh toán online</label>
                  </form>
                  <div className={styles.total}>
                    <span>Thành tiền</span>
                    <table>
                      <tr>
                        <th>Tổng số tiền sản phẩm: </th>
                        <td>{price}đ</td>
                      </tr>
                    </table>
                  </div>
                  <div className={styles.btn}>
                    <button onClick={()=>handleOrder()}>Đặt hàng</button>
                  </div>
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
      <Chat />
    </div>
  );
}
