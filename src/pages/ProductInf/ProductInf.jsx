import React, { useEffect, useState } from 'react'
import styles from './ProductInf.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMessage, faStore, faPlus} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../ults/NewRequest'
import { useLocation } from 'react-router-dom';
import { Link, useNavigate} from 'react-router-dom'
import { useQuantity } from '../../Context/QuantityProvider';
import VoucherItem from '../../compoments/Voucher/VoucherItem';
import VoucherFreeShipItem from '../../compoments/VoucherFreeShip/VoucherFreeShipItem';
export default function ProductInf() {
    const [book, setBook] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [idStore, setIdstore] = useState(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const { quantity, updateQuantity, address, updateAddress } = useQuantity();
    const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      updateQuantity(newQuantity);
    };
    const handleAdressChange = (event) => {
        updateAddress(event.target.value);
      };
    const fetchData = async () => {
        try {
          console.log('Fetching data for book with id:', id);
          const response = await newRequest.get(`/book/item/${id}`);
          console.log('API response:', response.data);
          setIdstore(response.data.User.id)
          setBook(response.data);
          setSelectedImage(response.data.Images && response.data.Images[0]);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };
      const navigate = useNavigate();
      const OrderBook = async (id,quantity)=>{
        await newRequest.post(`/cart/create/${id}`,{"quantity": quantity}, {
        }).then(
          (res) => {
            console.log(res.data)
            alert('Đã thêm vào giỏ hàng');
          }
        ).catch((error)=>{
            alert('Lỗi');
        })
      }
      const BuyBook = async  (id,quantity, event) => {
        event.preventDefault();
        await OrderBook(id,quantity);
        navigate(`/cart`, { state: { id } });
      };
      
    useEffect(() => {
        fetchData();
      }, [id]);

      const handleThumbnailHover = (image) => {
        setSelectedImage(image);
      };

    // Đọc thông tin người dùng từ Local Storage
    const storedUserData = localStorage.getItem('user');

    return(
        <div>
            {
                book && (<div className={styles.ProductInf}>
                    <div className={styles.product_essential}>
                        <div className={styles.product_essential_media}>
                            <div className={styles.product_view_img}>
                                <div className={styles.product_thumbnail}>
                                    {book.Images && book.Images.map((image, index) => (
                                        <img className={styles.img_thumb} key={index} src={image.filename} alt={`Image ${index + 1}`} onMouseOver={() => handleThumbnailHover(image)}/>
                                    ))}
                                </div>
                                <div className={styles.product_img}>
                                    <img src={selectedImage.filename} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_essential_detail}>
                            <h1 className={styles.name_product}>{book.name}</h1>
                            <div className={styles.product_view_sa}>
                                <div className={styles.line}>
                                    <div className={`${styles.product_view_sa_supplier} ${styles.col1}`}>
                                        <span>Nhà xuất bản: </span>
                                        <a href="">{book.nhaXB}</a>
                                    </div>
                                    <div className={styles.product_view_sa_sub}>
                                        <span>Tác giả: </span>
                                        <span>{book.Author.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.product_price}>
                            {book.percentDiscount > 0 ? (
                                <div>
                                    <span className={styles.new_price}>
                                        {(book.price * (1 - book.percentDiscount)).toFixed(0)}đ
                                    </span>
                                    <div>
                                    <span className={styles.old_price}>{book.price}đ</span>
                                    <span className={styles.discount_price}>{book.percentDiscount*100}%</span>
                                    </div>
                                </div>
                                ) : (
                                <div>
                                    <b className={styles.new_price}>{book.price}đ</b>
                                    <div>
                                    <span className={styles.current_price}></span>
                                    </div>
                                </div>
                                )}
                            </div>
                            <div className={styles.address}>
                                <div className={styles.address_title}>
                                    <span>Địa chỉ nhận hàng</span>  
                                </div>
                                <input type="text" placeholder='Chọn địa chỉ nhận hàng' onChange={(e)=>{handleAdressChange(e)}} />
                            </div>
                            <div className={styles.Quantity}>
                                <div className={styles.Quantity_title}>
                                    <span>Số lượng</span>
                                </div>
                                <input type="number" defaultValue={1} onChange={(e)=>{handleQuantityChange(e)}}/>
                            </div>
                            <div className={styles.product_add_box}>
                                <div className={styles.add_cart}>
                                    <button className={styles.btn} onClick={()=>OrderBook(id,quantity)}>
                                        <FontAwesomeIcon icon={faCartShopping}/>
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                </div>
                                <div className={styles.buy_product}>
                                    <Link to = {`/order/${id}`}>
                                    <button className={styles.btn} >Mua ngay</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Store_Inf}>
                        <div className={styles.avt_store}>
                            <img src={book.User.DetailStore.avatar} alt="" />
                        </div>
                        <div className={styles.Store_Content}>
                            <div className={styles.Store_name}>
                                <span>
                                    {book.User.DetailStore.nameStore}
                                </span>
                            </div>
                            <div className={styles.Store}>
                                <button>
                                    <FontAwesomeIcon icon={faMessage}/>
                                    <span>Chat</span>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faStore}/>
                                    <span>Xem Store</span>
                                </button>
                            </div>
                        </div>
                        <div className={styles.Store_Des}>
                            <table>
                                <colgroup>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <tr>
                                    <td>Đánh giá: 149</td>
                                    <td>Sản phẩm: 150</td>
                                </tr>
                                <tr>
                                    <td>Tham gia từ: 11/11/2021</td>
                                    <td>Người theo dõi: 32</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={styles.product_view_info}>
                        <h3 className={styles.info_title}>
                            Thông tin sản phẩm
                        </h3>
                        <div className={styles.info_content}>
                            <table>
                                <colgroup>
                                    <col width='25%' />
                                    <col />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>Tác giả</th>
                                        <td>{book.Author.name}</td>
                                    </tr>
                                    <tr>
                                        <th>NXB</th>
                                        <td>{book.nhaXB}</td>
                                    </tr>
                                    <tr>
                                        <th>Năm xuất bản</th>
                                        <td>{book.publication_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngôn ngữ</th>
                                        <td>{book.languages}</td>
                                    </tr>
                                    <tr>
                                        <th>Trọng lượng (gram)</th>
                                        <td>{book.weight}</td>
                                    </tr>
                                    <tr>
                                        <th>Kích thước bao bì</th>
                                        <td>{book.size}</td>
                                    </tr>
                                    <tr>
                                        <th>Số trang</th>
                                        <td>{book.numPage}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.product_description}>
                        <h3>Mô tả sản phẩm</h3>
                        <p>
                            {book.desc}
                        </p>
                    </div>
                    {idStore && (
                        <div className={styles.voucher}>
                            <h3>Miễn phí vận chuyển</h3>
                            <VoucherFreeShipItem id = {idStore} />
                        </div>
                    )}
                    {idStore && (
                        <div className={styles.voucher}>
                            <h3>Mã giảm giá sách</h3>
                            <VoucherItem id = {idStore} />
                        </div>
                    )}
                </div>)
                
            }
        </div>
    )
}