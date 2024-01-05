import React, { useEffect, useState } from 'react'
import styles from './ProductInf.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMessage, faStore, faComments, faImage, faTrash, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../ults/NewRequest'
import { useLocation } from 'react-router-dom';
import { Link, useNavigate} from 'react-router-dom'
import { useQuantity } from '../../Context/QuantityProvider';
import VoucherItem from '../../compoments/Voucher/VoucherItem';
import moment from 'moment';
import VoucherFreeShipItem from '../../compoments/VoucherFreeShip/VoucherFreeShipItem';
import Chat from '../Chat/Chat';
import uploadImg from '../../ults/upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Report1 from './Report/Report';
export default function ProductInf({setOpenChat}) {
    const [isPending, setIsPending] = useState(false)
    const [book, setBook] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [idStore, setIdstore] = useState(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errReview, setErrReview] = useState(null);
    const [reviewMessage, setReviewMessage] = useState(null)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isReviewImg, setIsReviewImg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errCmt, setErrCmt] = useState(null)
    const [infor, setInfor] = useState(null)
    const [isReport, setIsReport] = useState(false)
    const [showReport, setShowReport] = useState(false);
    const [isLoadingBook, setIsLoadingBook] = useState(false)
    const [s, setS] = useState(null)
    console.log(idStore)
    const handleRating = (value) => {
        setRating(value);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleCancle = () =>{
        setSelectedImageUrl(null)
      }
    const calculateColor = () => {
        const percentage = (rating / 5) * 100;
        const color = `linear-gradient(90deg, gold ${percentage}%, gray ${percentage}%)`;
        return { background: color };
      };

    const { quantity, updateQuantity, address, updateAddress } = useQuantity();
    const [isChat, setIsChat] = useState(null)
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        updateQuantity(newQuantity);
    };
    const handleAdressChange = (event) => {
        updateAddress(event.target.value);
      };
    const fetchData = async () => {
        try {
            setIsLoadingBook(true)
            newRequest.get(`/book/item/${id}`).then((response)=>{
                setIdstore(response.data.User)
                console.log(response.data)
                setBook(response.data);
                setSelectedImage(response.data.Images && response.data.Images[0]);
                setIsLoadingBook(false)
            }).catch((error)=>{
                setIsLoadingBook(false)
                console.log(error)
            })
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
    const getReview = async(page) =>{
        try {
          const res = await newRequest.get(`/review/${id}?page=${page}`);
          setReview(res.data);
          console.log(res.data)
          setErrReview(false);
        } catch (error) {
          setErrReview(error.response.data);
        }
    }
    const getReviewInfor = async() =>{
        try {
          const res = await newRequest.get(`/review/infor/${id}`);
          setInfor(res.data);
          console.log(res.data)
        } catch (error) {
        }
    }
    useEffect(() => {
        fetchData();
        getReview(1)
        getReviewInfor()
      }, [id]);

    const handleThumbnailHover = (image) => {
    setSelectedImage(image);
    };

    const handleViewStoreClick = (event) => {
        event.preventDefault();
        navigate(`/viewstore`);
      };
    const handleComment = async(message,numstar, img) =>{
        try {
            setIsLoading(true)
            const file = await uploadImg(img);
            newRequest.post(`/review/create/${id}`,{
                desc : message,
                num_star : numstar,
                img: file
            }).then((res)=>{
                setReviewMessage('')
                setSelectedImageUrl(null)
                getReview(1);
                setIsLoading(false)
                setErrCmt(false)
            }).catch((error)=>{
                setReviewMessage('')
                setSelectedImageUrl(null)
                setIsLoading(false)
                setErrCmt(error.response.data)
                console.log(error.response.data)
            })
        } catch (error) {
            
        }
    }
    const handleDeleteCommnet = async(id) =>{
        try {
            newRequest.delete(`/review/delete/${id}`).then((res)=>{
                getReview(1)
                toast.success('Xoá thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  });
            }).catch((error)=>{
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  });
            })
        } catch (error) {
            
        }
    }
    const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
    return(
        <div>
            {isLoadingBook && (
                <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto', marginTop : '10%', marginBottom : '10%'}}/>
            )}
            {
                book && !isLoadingBook && (<div className={styles.ProductInf}>
                    {
                        showReport && (
                            <Report1 show={showReport} handleClose={()=>{setShowReport(false)}} id = {id} />
                        )
                    }
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
                            <div className={styles.name_product} style={{display :'flex', justifyContent : 'space-between', position : 'relative'}}>
                                <h1>{book.name}</h1>
                                <FontAwesomeIcon icon={faInfoCircle} style={{height: '20px', color : 'gray', cursor : 'pointer'}} onClick={()=>{setIsReport(true)}}/>
                                {
                                    isReport && (
                                        <div style={{position : 'absolute', right : '0', boxShadow : 'rgba(0, 0, 0, 0.24) 0px 3px 8px', border : '1px solid gray', padding : '5px', top : '20px', cursor : 'pointer'}} onClick={()=>{
                                            setIsReport(false);
                                            setShowReport(true)
                                        }}>Báo cáo</div>
                                    )
                                }
                            </div>
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
                            <img src={book.User.DetailStore?.avatar} alt="" />
                        </div>
                        <div className={styles.Store_Content}>
                            <div className={styles.Store_name}>
                                <span>
                                    {book.User.DetailStore?.nameStore}
                                </span>
                            </div>
                            <div className={styles.Store}>
                                <button onClick={()=>{setIsChat(true)}}>
                                    <FontAwesomeIcon icon={faMessage}/>
                                    <span >Chat</span>
                                </button>
                                <button onClick={() => {
                                    navigate(`/viewstore/${idStore.id}`)
                                }}>
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
                            <VoucherFreeShipItem id = {idStore.id} setIsPending={setIsPending}/>
                        </div>
                    )}
                    {idStore && (
                        <div className={styles.voucher}>
                            <h3>Mã giảm giá sách</h3>
                            <VoucherItem id = {idStore.id} setIsPending = {setIsPending}/>
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
                                        {infor && (
                                            <span className={styles.cmt_count}>{infor.number_review} bình luận</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.rate_detail}>
                                    {infor && infor.arrRating && infor.arrRating.map((item, i)=>(
                                        <div className={styles.rate_detail_item}>
                                            <div>{i+1} sao</div>
                                            <div className={styles.rate_bar}>
                                                <div
                                                style={{
                                                    width: `100%`,
                                                    height: `14px`,
                                                    borderRadius: `4px`,
                                                    //chỉnh lại cái % phía trong theo rating nha, đây đang hiển thị theo cái sao phía trên
                                                    background: `linear-gradient(90deg, #4EA58B ${item}%, gray ${0}%)`,
                                                }}
                                                ></div>
                                            </div>
                                            <div className={styles.percent}>{parseInt(item)}%</div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.cmt_space}>
                                    <div className={styles.cmt_avt}>
                                        {storedUserData &&(<img src={storedUserData.avatar} alt="" />)}
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
                                        <textarea className={styles.cmt_write} placeholder='Viết bình luận...' onChange={(e)=>{setReviewMessage(e.target.value)}} value={reviewMessage}/>
                                        {selectedImageUrl && (
                                            <div className={styles.img_local}>
                                            <div className={styles.img_img2}>
                                            <div className={styles.cancel} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                                                <img
                                                src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                                                alt="Choose file"
                                                className={styles.img_img1}
                                                onClick={()=>{setIsImageModalOpen(true)}}
                                                />
                                            </div>
                                            </div>
                                        )}
                                        {
                                        isImageModalOpen && (
                                            <div className={styles.modalContainer} onClick={() => { setIsImageModalOpen(false); }}>
                                            <div className={styles.img_modal}>
                                                <img src={selectedImageUrl} className={styles.img_item} />
                                            </div>
                                            </div>
                                        )
                                        }

                                        <div className={styles.cmt_btn}>
                                            <button className={styles.cmt_btn_send} onClick={()=>{handleComment(reviewMessage, rating, selectedFile)}}>
                                                Gửi
                                            </button>
                                            <button htmlFor="fileInput1">
                                                <label htmlFor="fileInput1">
                                                    <FontAwesomeIcon icon={faImage}/>
                                                </label>
                                                <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleFileChange}/>
                                            </button>
                                            {isLoading && (
                                                <div><img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={250} /></div>
                                            )}
                                            {errCmt && (
                                                <div className={styles.error}>{errCmt}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={styles.reviewContainer}>
                                    {review && review.reviews && review.reviews.map((item)=>(
                                        <div>
                                    <div className={styles.cmt_show}>
                                        {isReviewImg && (
                                            <div className={styles.modalContainer} onClick={() => { setIsReviewImg(false); }}>
                                            <div className={styles.img_modal}>
                                                <img src={item.img} className={styles.img_item} />
                                            </div>
                                            </div>
                                        )}
                                            <div className={styles.cmt_avt}>
                                                <img src={item.review1.avatar} alt="" />
                                            </div>
                                            <div className={styles.cmt_show_content}>
                                                <h6>{item.review1.firstName} {item.review1.lastName}</h6>
                                                <span className={styles.cmt_time}>{moment(item.updatedAt).format("DD-MM-YYYY")}</span>
                                                {/* Hiển thị số sao đánh giá của người đó */}
                                                <div>
                                                {
                                                    Array.from({ length: 5 }).map((_, index) => (
                                                        <span
                                                        key={index}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: index + 1 <= item.num_star ? '#4EA58B' : 'gray',
                                                        }}
                                                        >
                                                        &#9733;
                                                        </span>
                                                    ))
                                                }
                                                </div>
                                                <div className={styles.comment1}>
                                                <span>{item.desc}</span>
                                                {item.img && (
                                                    <img src={item.img} alt="" className={styles.img_review} onClick={()=>{setIsReviewImg(true)}}/>
                                                )}
                                                </div>
                                            </div>
                                            {item.customer_id == storedUserData.id && (
                                                <div style={{
                                                    marginLeft : '30px',
                                                    cursor : 'pointer',
                        
                                                }}
                                                onClick={()=>{handleDeleteCommnet(item.id)}}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} style={{height : '15px'}}/>
                                                </div>
                                            )}
                                        </div>
                                        {idStore && item.FeedBack &&(
                                            <div className={styles.cmt_show} style={{borderBottom: '#4ea58b75 dashed 1px', marginTop : "-40px"}} >
                                                <div className={styles.cmt_show} style={{marginLeft : "20%"}}>
                                                <div className={styles.cmt_avt}>
                                                    <img src={idStore.DetailStore.avatar} alt="" />
                                                </div>
                                                <div className={styles.cmt_show_content}>
                                                        <h6>{idStore.DetailStore.nameStore}</h6>
                                                        <span className={styles.cmt_time}>{moment(item.FeedBack.createdAt).format("DD-MM-YYYY")}</span>
                                                        <div className={styles.comment1}>
                                                        <span>{item.FeedBack.desc}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                    ))} 
                                    {errReview && (
                                        <div>{errReview}</div>
                                    )}                            
                                </div>
                                <div className={styles.num_page}>
                                    {infor && infor.numPage > 1 && [...Array(infor.numPage)].map((_, index) => (
                                        <span key={index + 1} onClick={()=>{getReview(index+1)}}>{index + 1}</span>
                                    ))}
                                </div>
                            </td>
                        </table>
                    </div>

                </div>)
                
            }
            {
                idStore && (
                    <Chat isChat={isChat} setIsChat = {setIsChat} idUser = {idStore}/>
                )
            }
        </div>
    )
}