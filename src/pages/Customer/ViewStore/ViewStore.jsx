import React, { useEffect, useState } from 'react'
import styles from './ViewStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPlus, faStore, faStar, faUserCheck,faUsers,faLocationDot,faLeaf} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest'
import { useNavigate } from 'react-router-dom';
import Chat from '../../Chat/Chat';
import { useLocation } from 'react-router-dom';
import ListBookDetail from '../../../compoments/ListBookDetail/ListBookDetail';
import { useParams } from 'react-router-dom';
import VoucherFreeShipItem from '../../../compoments/VoucherFreeShip/VoucherFreeShipItem';
import VoucherItem from '../../../compoments/Voucher/VoucherItem';
import SideBar from '../../../compoments/SideBar/SideBar';
import navbar from '../../../assets/img/welcom.png'
export default function ViewStore() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVoucher, setIsLoadingVoucher] = useState(false);
    const [numPage, setNumPage] = useState(1);
    const [price_min, setPrice_min] = useState('');
    const [price_max, setPrice_max] = useState('');
    const [author, setAuthor] = useState('');
    const [languages, setLanguage] = useState('');
    const [nhaXB, setNhaXB] = useState('');
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null)
    const [store, setStore] = useState(null);
    const [cate, setCate] = useState(null);
    const [selectedLi, setSelectedLi] = useState(null);
    const getCategory = async () => {
        await newRequest.get(`/category`, {
        }).then(
            (res) => {
                const arr = res.data;
                arr.push('Tất cả sản phẩm')
                setCate(arr)

            }
        ).catch((error) => {
            console.log(error.response.data)
        })
    }
    const getBooksByQuery = (page) =>{
        setIsLoading(true);
        newRequest.get(`/book/search?idStore=${id}&page=${page}&category=${category}&priceMin=${price_min}&priceMax=${price_max}&author=${author}&languages=${languages}&nhaXB=${nhaXB}`, {
        }).then(
          (res) => {
            setBookData(res.data.booksByQuery)
            setNumPage(res.data.numpage)
            setIsLoading(false);
            setError(false)
            console.log(res.data)
          }
        ).catch((error)=>{
          setIsLoading(false)
          setError(error.response.data)
        })
    }
    const getUser =  () =>{
        newRequest.get(`/user/infor/${id}`, {
        }).then(
          (res) => {
            setStore(res.data)
          }
        ).catch((error)=>{
            console.log(error.response.data)
        })
    }
    useEffect(()=>{
        getUser();
        getCategory()
    },[id])
    useEffect(()=>{
        getBooksByQuery(1);
    },[category, price_max, price_min, author, languages, nhaXB, id])
    const handleLiClick = (index) => {
        setSelectedLi(index);
        
    };
    return (
        <div className={styles.ViewStore}>
            <div className={styles.Store_In}>
                <div className={styles.Store_Inf}>
                <div className={styles.avt_store}>
                    {store && (
                        <img src={store.DetailStore.avatar}alt="" />
                    )}
                </div>
                <div className={styles.Store_Content}>
                    <div className={styles.Store_name}>
                        {store && (
                            <span>
                                {store.DetailStore.nameStore}
                            </span>
                        )}
                    </div>
                    <div className={styles.Store}>
                        <button>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Theo dõi</span>
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faMessage}/>
                            <span >Chat</span>
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
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faStar}/>
                                <span >Đánh giá: 5.0 (10 đánh giá)</span>
                            </td>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faStore}/>
                                <span >Sản phẩm: 150</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faUserCheck}/>
                                <span >Tham gia từ: 11/11/2021</span>
                                
                            </td>
                            <td>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faUsers}/>
                                <span >Người theo dõi: 32</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <FontAwesomeIcon className={styles.Store_Des_Icon} icon={faLocationDot}/>
                                <span>Địa chỉ: 16/06 Ngô Sĩ Liên - Liên Chiểu - Đà Nẵng</span>
                            </td>
                        </tr>
                    </table>
                </div>
                </div>
                <ul className={styles.category1}>
                    {/* <li 
                        className={selectedLi === null ? styles.defaultLi : styles.selectedLi} 
                        onClick={() => handleLiClick(null)}
                    >
                        Tất cả sản phẩm
                    </li> */}
                    {cate && cate.map((item, index) => (
                        <li 
                            key={index} 
                            className={selectedLi === index ? styles.selectedLi : styles.defaultLi} 
                            onClick={() => handleLiClick(index)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>

            </div>
            <div className={styles.Store_Voucher}>
                <h4>Voucher của shop</h4>
                {isLoadingVoucher && (
                    <img src="https://cdnl.iconscout.com/lottie/premium/thumb/hourglass-loader-5599238-4668043.gif" alt="" height={200} style={{display : 'flex', margin : 'auto'}}/>
                )}
                <VoucherFreeShipItem id = {id} setIsPending = {setIsLoadingVoucher}/>
                <div style={{height: '40px'}}></div>
                <VoucherItem id = {id} />
            </div>
            <div className={styles.Store_Listbook}>
            <div className={styles.home_item}>
              <div className={styles.title}>
                <span>SẢN PHẨM BÁN CHẠY</span>
              </div>
              <div className={styles.bo}>
                <SideBar 
                    category={category}
                    setCategory={setCategory}
                    price_min={price_min}
                    setPrice_min={setPrice_min}
                    price_max={price_max}
                    setPrice_max={setPrice_max}
                    author={author}
                    setAuthor={setAuthor}
                    languages={languages}
                    setLanguage={setLanguage}
                    nhaXB={nhaXB}
                    setNhaXB={setNhaXB}
                />
              <div className={styles.background}>
              {isLoading && (
                    <img src="https://assets-v2.lottiefiles.com/a/95503f40-1153-11ee-b240-1b376106fc67/nwUqj0Krki.gif" alt="" height={300} width={300} style={{display: 'flex', justifyContent : 'center', margin : 'auto'}}/>
                )}
                <div className={styles.booklist}>
                {error && (
                    <div>Không có sách</div>
                )}
                {bookData && !error && !isLoading && bookData.length > 0  && bookData.map((item)=>(
                    <div className={`${styles.hotproduct_item} ${styles.product}`} key={item.id}>
                    <img src={item.Images[0].filename} alt='' />
                    <span>{item.name}</span>
                    {item.percentDiscount > 0 ? (
                      <div>
                        <b>{(item.price * (1 - item.percentDiscount)).toFixed(0)}đ</b>
                        <div>
                          <span className={styles.old_price}>{item.price}đ</span>
                          <span className={styles.percentDiscount}>{item.percentDiscount*100}%</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <b>{item.price}đ</b>
                        <div>
                          <span className={styles.current_price}></span>
                        </div>
                      </div>
                    )}
                    <span style={{
                      backgroundColor : '#f1b1b0',
                      borderRadius : '10px',
                      display : 'flex',
                      alignItems: 'center',
                      justifyContent : 'center',
                      fontSize: '13px',
                      color: 'white',
                      marginTop : '5px'
                    }}>Đã bán {item.purchases}</span>
                    <button>
                      Mua ngay
                    </button>
                  </div>
                    ))}
                </div>
                </div>
                
              </div>
            </div>
            <div className={styles.num_page}>
                    {numPage && numPage > 1 && [...Array(numPage)].map((_, index) => (
                        <span key={index + 1} onClick={()=>{getBooksByQuery(index+1)}}>{index + 1}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}