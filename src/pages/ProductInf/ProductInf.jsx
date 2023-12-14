import React, { useEffect, useState } from 'react'
import styles from './ProductInf.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../ults/NewRequest'
import { useLocation } from 'react-router-dom';

export default function ProductInf() {
    const [book, setBook] = useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    
    const fetchData = async () => {
        try {
          console.log('Fetching data for book with id:', id);
          const response = await newRequest.get(`/book/item/${id}`);
          console.log('API response:', response.data);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, [id]);

    return(
        <div>
            {
                book && (<div className={styles.ProductInf}>
                    <div className={styles.product_essential}>
                        <div className={styles.product_essential_media}>
                            <div className={styles.product_view_img}>
                                <div className={styles.product_thumbnail}>
                                    {book.images && book.images.map((image, index) => (
                                        <img key={index} src={image} alt={`Image ${index + 1}`} />
                                    ))}
                                </div>
                                <div className={styles.product_img}>
                                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_essential_detail}>
                            <h1 className={styles.name_product}>{book.name}</h1>
                            <div className={styles.product_view_sa}>
                                <div className={styles.line}>
                                    <div className={`${styles.product_view_sa_supplier} ${styles.col1}`}>
                                        <span>Nhà xuất bản: </span>
                                        <a href="">FIRST NEWS</a>
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
                                <input type="text" placeholder='Chọn địa chỉ nhận hàng'/>
                            </div>
                            <div className={styles.Quantity}>
                                <div className={styles.Quantity_title}>
                                    <span>Số lượng</span>
                                </div>
                                <input type="number" />
                            </div>
                            <div className={styles.product_add_box}>
                                <div className={styles.add_cart}>
                                    <button className={styles.btn}>
                                        <FontAwesomeIcon icon={faCartShopping}/>
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                </div>
                                <div className={styles.buy_product}>
                                    <button className={styles.btn}>Mua ngay</button>
                                </div>
                            </div>
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
                                        <td>NXB Tổng hợp TPHCM</td>
                                    </tr>
                                    <tr>
                                        <th>Năm xuất bản</th>
                                        <td>{book.publication_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngôn ngữ</th>
                                        <td>Tiếng Việt</td>
                                    </tr>
                                    <tr>
                                        <th>Trọng lượng (gram)</th>
                                        <td>420</td>
                                    </tr>
                                    <tr>
                                        <th>Kích thước bao bì</th>
                                        <td>20.5 x 14.5cm</td>
                                    </tr>
                                    <tr>
                                        <th>Số trang</th>
                                        <td>416</td>
                                    </tr>
                                    <tr>
                                        <th>Hình thức</th>
                                        <td>Bìa mềm</td>
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
                </div>)
                
            }
        </div>
    )
}