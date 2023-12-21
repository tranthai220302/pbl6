import React, { useEffect, useState } from 'react'
import styles from './ProductInf.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMessage, faStore, faComments, faImage} from '@fortawesome/free-solid-svg-icons';
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
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
    };

    const calculateColor = () => {
        const percentage = (rating / 5) * 100;
        const color = `linear-gradient(90deg, gold ${percentage}%, gray ${percentage}%)`;
        return { background: color };
      };

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
                                <input type="number"  onChange={(e)=>{handleQuantityChange(e)}}/>
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
                    <div className={styles.cmt}>
                        <h3>Đánh giá sản phẩm</h3>
                        <table>
                            <colgroup>
                                <col width='50%' />
                                <col width='50%' />
                            </colgroup>
                            <td>
                                <div className={styles.rate_count}>
                                    <div className={styles.star_count}>5</div>
                                    {/* Đoạn sao này nhớ tô lại màu theo số phía trên nha */}
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleRating(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= rating ? '#4EA58B' : 'gray',
                                            }}
                                            >
                                            &#9733;
                                        </span>
                                    ))}
                                    <div>
                                        <FontAwesomeIcon icon={faComments}/>
                                        <span className={styles.cmt_count}>1 bình luận</span>
                                    </div>
                                </div>
                                <div className={styles.rate_detail}>
                                    <div className={styles.rate_detail_item}>
                                        <div>5 sao</div>
                                        <div className={styles.rate_bar}>
                                            <div
                                            style={{
                                                width: `100%`,
                                                height: `14px`,
                                                borderRadius: `4px`,
                                                //chỉnh lại cái % phía trong theo rating nha, đây đang hiển thị theo cái sao phía trên
                                                background: `linear-gradient(90deg, #4EA58B ${(rating / 5) * 100}%, gray ${(rating / 5) * 100}%)`,
                                            }}
                                            ></div>
                                        </div>
                                        <div>100%</div>
                                    </div>
                                    <div className={styles.rate_detail_item}>
                                        <div>5 sao</div>
                                        <div className={styles.rate_bar}>
                                            <div
                                            style={{
                                                width: `100%`,
                                                height: `14px`,
                                                borderRadius: `4px`,
                                                //chỉnh lại cái % phía trong theo rating nha, đây đang hiển thị theo cái sao phía trên
                                                background: `linear-gradient(90deg, #4EA58B ${(rating / 5) * 100}%, gray ${(rating / 5) * 100}%)`,
                                            }}
                                            ></div>
                                        </div>
                                        <div>100%</div>
                                    </div>
                                </div>
                                <div className={styles.cmt_space}>
                                    <div className={styles.cmt_avt}>
                                        <img src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/411337569_903820174609347_3824711788836504289_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG1ErJ8YgNhXA7371mB0jpqaT6byvwHprRpPpvK_AemtPLWdGGXdfsaBlVvFKk3jmkmdy3gcDCD-6fN0jqwN9yz&_nc_ohc=-I5dA8pHCTAAX_LP2eE&_nc_ht=scontent.fhan14-1.fna&oh=00_AfAYJ8bUbwe4rg0GkTkqOxX945JffUG-Ceoe9ic7iABjsw&oe=658A35AA" alt="" />
                                    </div>
                                    <div className={styles.cmt_content}>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    onClick={() => handleRating(star)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: star <= rating ? '#4EA58B' : 'gray',
                                                    }}
                                                    >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <textarea className={styles.cmt_write} placeholder='Viết bình luận...'/>
                                        <div className={styles.cmt_btn}>
                                            <button className={styles.cmt_btn_send}>
                                                Gửi
                                            </button>
                                            <button>
                                                <FontAwesomeIcon icon={faImage}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={styles.cmt_show}>
                                    <div className={styles.cmt_avt}>
                                        <img src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/411337569_903820174609347_3824711788836504289_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG1ErJ8YgNhXA7371mB0jpqaT6byvwHprRpPpvK_AemtPLWdGGXdfsaBlVvFKk3jmkmdy3gcDCD-6fN0jqwN9yz&_nc_ohc=-I5dA8pHCTAAX_LP2eE&_nc_ht=scontent.fhan14-1.fna&oh=00_AfAYJ8bUbwe4rg0GkTkqOxX945JffUG-Ceoe9ic7iABjsw&oe=658A35AA" alt="" />
                                    </div>
                                    <div className={styles.cmt_show_content}>
                                        <h6>Việt Nam, Trương Thị Khánh Linh</h6>
                                        <span className={styles.cmt_time}>11:11:11, 11/11/1111</span>
                                        {/* Hiển thị số sao đánh giá của người đó */}
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    onClick={() => handleRating(star)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: star <= rating ? '#4EA58B' : 'gray',
                                                    }}
                                                    >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <span>nice nice nice</span>
                                    </div>
                                </div>
                            </td>
                        </table>
                    </div>
                </div>)
                
            }
        </div>
    )
}