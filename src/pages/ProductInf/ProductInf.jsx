import React, { useState } from 'react'
import styles from './ProductInf.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
export default function ProductInf() {
    return(
        <div className={styles.ProductInf}>
            <div className={styles.product_essential}>
                <div className={styles.product_essential_media}>
                    <div className={styles.product_view_img}>
                        <div className={styles.product_thumbnail}>
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                        </div>
                        <div className={styles.product_img}>
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwoxFWLL03uShvAkvXTe6rTZTC1yqIzxReaxoPkYqsQnsgTY2n" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.product_essential_detail}>
                    <h1 className={styles.name_product}>Thay đổi cuộc sống với thần số học</h1>
                    <div className={styles.product_view_sa}>
                        <div className={styles.line}>
                            <div className={`${styles.product_view_sa_supplier} ${styles.col1}`}>
                                <span>Nhà cung cấp: </span>
                                <a href="">FIRST NEWS</a>
                            </div>
                            <div className={styles.product_view_sa_sub}>
                                <span>Tác giả: </span>
                                <span>Lê Đỗ Quỳnh Hương</span>
                            </div>
                        </div>
                        <div className={styles.line}>
                            <div className={`${styles.product_view_sa_sub} ${styles.col1}`}>
                                <span>Nhà xuất bản: </span>
                                <span>NXB Tổng hợp TPHCM</span>
                            </div>
                            <div className={styles.product_view_sa_sub}>
                                <span>Hình thức bìa: </span>
                                <span>Bìa mềm</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.product_price}>
                        <span className={styles.new_price}>
                            63.000đ
                        </span>
                        <div>
                            <span className={styles.old_price}>90.000đ</span>
                            <span className={styles.discount_price}>-20%</span>
                        </div>
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
                                <th>Mã hàng</th>
                                <td>8935086853634</td>
                            </tr>
                            <tr>
                                <th>Tên nhà cung cấp</th>
                                <td>FIRST NEWS</td>
                            </tr>
                            <tr>
                                <th>Tác giả</th>
                                <td>Lê Đỗ Quỳnh Hương</td>
                            </tr>
                            <tr>
                                <th>NXB</th>
                                <td>NXB Tổng hợp TPHCM</td>
                            </tr>
                            <tr>
                                <th>Năm xuất bản</th>
                                <td>2020</td>
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
                    Bộ mô hình 12 con sâu đồ chơi nhựa dài 7cm nhiều màu

                    ✔️ Chất liệu: Nhựa mềm
                    ✔️ Kích thước trung bình: 7 cm
                    ✔️ Màu sắc: Nhiều màu như trong hình
                    ✔️ Trọng lượng đóng gói: 250 gram

                    Bộ đồ chơi là sản phẩm dành cho bé từ 3 tuổi trở lên, bộ đồ chơi gồm 12 loài sâu phổ biến xung quanh đời sống hàng ngày của chúng ta:
                    ----------------------------------------
                    LỢI ÍCH CỦA ĐỒ CHƠI:
                    ✔️ Các loài côn trùng được tái hiện một cách sống động và chân thực với nhiều màu sắc, nhưng vẫn giữ được nét đặc trưng để các bé có thể nhận biết và phân biệt. 
                    ✔️ Sử dụng mô hình thực tế là một phương pháp hiệu quả để dạy trẻ, giúp trẻ dễ dàng khám phá và học hỏi hơn.
                    ✔️ Bé sẽ dễ dàng hóa thân vào các nhân vật và kể những câu chuyện theo cách rất riêng.
                    ✔️ Hữu ích với các bé ở thành phố, ít có cơ hội tiếp xúc thực tế với các loài côn trùng xung quanh.

                    Nhanh tay MUA HÀNG để sở hữu bộ đồ chơi này và cùng con vui chơi, học tập ba mẹ nhé!
                    #dochoi #mohinh #Animal #dongvat #sothu #mohinhcontrung #contrungdochoi #Safari #New4all #AnimalWorld #dochoichobe #dochoicontrung #consau
                </p>
            </div>
        </div>
    )
}