import React, {useEffect, useState } from 'react'
import styles from './BodyHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey,faCheck, faXmark, faL} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest';
import ModalCustomer from '../../Modal/Modal';
import ModalUpdate from '../../ModalUpdate/ModalUpdate';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Example from '../../../compoments/ModalFull/ModalFull';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faBook, faTruckFast, faChartSimple} from '@fortawesome/free-solid-svg-icons';
import DoanhThu from '../../../pages/Admin/Store/DoanhThu/DoanhThu';
import NavbarAdmin from '../../../pages/Admin/NavbarAdmin/NavbarAdmin';
import GraphLine from '../../../pages/Admin/Store/DoanhThu/GrapLine/GrapLine';
import ReactApexChart from 'react-apexcharts';
import { parseJSON } from 'date-fns';
import AddBook from '../../../pages/Admin/Store/AddBook/AddBook';
import Chat from '../../../pages/Chat/Chat';

export default function BodyHomeStore({managebook,manageorder,managestore,analysis,setAll,all,StateId1,StateId6,StateId7}) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data,setData] = useState('');   
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [selectOrder, setSelectOrder] = useState(null);
    const currentUser = localStorage.getItem("currentUser");
    const [userData, setUserData] = useState('');
    const [user, setUser] = useState('');
    var userdetail = JSON.parse(currentUser);
    const [category, setCategory] = useState(null)
    const [datalength,setDatalength] = useState(null)
    const [selectProduct, setSelectProduct] = useState(null);
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth()+1);

    const handle = (e) =>{
      if(e.key === 'Enter'){
          setMonth(e.target.value)
      }
  }
  console.log("cu",currentUser)
    const [selectProductUpdate, setSelectProductUpdate] = useState(null)

      const getData = () =>{
        let url;
        if(manageorder){
          url = `/order/store/${userdetail.id}`
          setIsPending(true)
          newRequest.get(url, {
            withCredentials: true
          })
          .then((res) => {
            setData(res.data)
            setDatalength(res.data.length)
            console.log(res.data)
            console.log(manageorder)
            setIsPending(false);
            setError(false)
          })
          .catch((error) => {
            setError(error.response.data)
            setIsPending(false)
            console.log(error)
          });
        }else if(managebook){
          
          url = `/book/store/${userdetail.id}`
          setIsPending(true)
          newRequest.get(url, {
            withCredentials: true
          })
          .then((res) => {
            setData(res.data)
            console.log(res.data)
            console.log(managebook)
            setIsPending(false);
            setError(false)
          })
          .catch((error) => {
            setError(error.response.data)
            setIsPending(false)
          });
        }else if(analysis){

          url = `order/store/${userdetail.id}`
          setIsPending(true)
          newRequest.get(url, {
            withCredentials: true
          })
          .then((res) => {
            setData(res.data.data)
            setDatalength(res.data.length)
            console.log(analysis)
            console.log(res.data)
            setIsPending(false);
            setError(false)
          })
          .catch((error) => {
            setError(error.response.data)
            setIsPending(false)
            console.log(error)
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
      const handleComfirmOrder = (id) =>{
        const confirmed = window.confirm('Bạn có muốn xác nhận đơn hàng này không ?');
      
        if (confirmed) {
            newRequest.post(`/user/confirmOrder/${id}`, {
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
      const [chartData, setChartData] = useState(null);
    useEffect(()=>{
        getData();
       
      }, [managebook,manageorder,managestore])

    const handlePaid = () =>{
        paid++;
        setPaid(paid++);
    }
    const handleUnPaid = () =>{
      unpaid++;
      setUnpaid(unpaid++);
  };
    const [paid, setPaid] = useState('');
    const [unpaid, setUnpaid] = useState('');

    useEffect(()=>{
      getData()
    },[analysis])
    useEffect(()=>{
      setUnpaid(17)
      setChartData({
          series: [datalength-unpaid, unpaid],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Đã Thanh toán','Chưa Than toán'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
        })
      },[analysis]);


    return(
        
        <div className={styles.BodyHomeStore}>
            <div className={styles.BodyHomeStore_Item}>
          {managebook && (            
            <div className={styles.table1}>
              <AddBook id = {userdetail.id} getData={getData }></AddBook>
            <table>
            <thead className={styles.thead}>
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
                    {product.Images && (
                      <img src={product.Images[0]?.filename} alt="Avatar" width="50" height="50" />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.desc}</td>
                  <td className={styles.price}>{product.price}đ</td>
                  <td>{product.sales_number}</td>
                  <td>{product.Author?.name}</td>
                  <td>
                    {product.Categories && product.Categories.map((item)=>(
                    <span>{item.name} <br></br></span> 
                  ))}
                  </td>
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
            {manageorder && (
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
                {!error && data && data.map((product) => {
                  if (product.StateId ===1 && StateId1) {
                    return (
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
                    ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                    <td className={styles.price}>{product.quantity}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                    <td>{product.store?.firstName} {product.store?.lastName}</td>
                    <td>{product.Book?.name}</td>
                    { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                    }
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                      </button>
                    </td>
                  </tr>
                  )} else if (product.StateId === 6 && StateId6) {
                    return (
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
                        ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                        <td className={styles.price}>{product.quantity}</td>
                        <td>{product.createdAt}</td>
                        <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                        <td>{product.store?.firstName} {product.store?.lastName}</td>
                        <td>{product.Book?.name}</td>
                        { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                        }
                        <td>
                          <button>
                          <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                          </button>
                        </td>
                      </tr>
                    )
                  } else if (product.StateId === 7 && StateId7) {
                    return (
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
                    ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                    <td className={styles.price}>{product.quantity}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                    <td>{product.store?.firstName} {product.store?.lastName}</td>
                    <td>{product.Book?.name}</td>
                    { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                    }
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                      </button>
                    </td>
                  </tr>
                    )
                  } else if(all){
                    return (
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
                    ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                    <td className={styles.price}>{product.quantity}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                    <td>{product.store?.firstName} {product.store?.lastName}</td>
                    <td>{product.Book?.name}</td>
                    { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                    }
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                      </button>
                    </td>
                  </tr>
                    )
                  }
                  // )

                    
                  
                  // product.StateId === 1 && (
                  //   <tr key={product.id}>
                  //   {selectProduct && (
                  //     <ModalCustomer customer={null} show={true} handleClose={() => setSelectProduct(null)} product={selectProduct}/>
                  //   )}
                  //   {selectProductUpdate && (
                  //     <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getDataProduct={getData} />
                  //   )}
                  //   <td>
                  //     <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' alt="Avatar" width="50" height="50" />
                  //   </td>
                  //   <td>{product.total_price}đ</td>
                  //   {product.isPayment ? (
                  //     <td><FontAwesomeIcon icon={faCheck} className={styles.check_icon} /></td>
                  //   ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                  //   <td className={styles.price}>{product.quantity}</td>
                  //   <td>{product.createdAt}</td>
                  //   <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                  //   <td>{product.store?.firstName} {product.store?.lastName}</td>
                  //   <td>{product.Book?.name}</td>
                  //   { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                  //   }
                  //   <td>
                  //     <button>
                  //     <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                  //     </button>
                  //   </td>
                  // </tr>
                  // )
                  // <tr key={product.id}>
                  //   {selectProduct && (
                  //     <ModalCustomer customer={null} show={true} handleClose={() => setSelectProduct(null)} product={selectProduct}/>
                  //   )}
                  //   {selectProductUpdate && (
                  //     <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getDataProduct={getData} />
                  //   )}
                  //   <td>
                  //     <img src='https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png' alt="Avatar" width="50" height="50" />
                  //   </td>
                  //   <td>{product.total_price}đ</td>
                  //   {product.isPayment ? (
                  //     <td><FontAwesomeIcon icon={faCheck} className={styles.check_icon} /></td>
                  //   ) : (<td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                  //   <td className={styles.price}>{product.quantity}</td>
                  //   <td>{product.createdAt}</td>
                  //   <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                  //   <td>{product.store?.firstName} {product.store?.lastName}</td>
                  //   <td>{product.Book?.name}</td>
                  //   { product.StateId === 1 ? <td><button><FontAwesomeIcon icon={faCheck} className={styles.check_icon} onClick={()=>{handleComfirmOrder(product.id)}}/></button></td> : <td>{product.State?.status}</td>                      
                  //   }
                  //   <td>
                  //     <button>
                  //     <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
                  //     </button>
                  //   </td>
                  // </tr>
                })}
              </tbody>
            </table>
              {isPending && (
                <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
              )}
              {error && (<div className={styles.error}>{error}</div>)}
            </div>
          )}
          {analysis && (
            // <div>
            //   <span>Tổng số đơn hàng đã được đặt : {datalength} đơn hàng</span><br></br>
            //   <span>Biểu đồ tỉ lệ đơn hàng đã thanh toán</span>
            //   <div>{}</div>
            //   <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height={350} />  
            //  </div> 
            <div>
                        <input type="text" placeholder='Nhập tháng ...' className={styles.search} onKeyPress={(e) => {handle(e)}}/>
                        <GraphLine id={userdetail?.id} month={month} />
            </div> 
                    
            )}
                
            </div>
            {!managebook && !manageorder && !managestore && !analysis && (
                <div className={styles.BodyHomeStore_Title}>
                         Wellcome Back!
                </div>
            //     <div className={styles.BodyHomeStore_Item}>
            //     <div className={styles.BodyHomeStore_Title}>
            //         Phân tích bán hàng hôm nay
            //     </div>
            //     <div className={styles.BodyHomeStore_Content}>
            //         <table className={styles.NeedWork}>
            //             <colgroup>
            //                 <col />
            //                 <col />
            //                 <col />
            //                 <col />
            //             </colgroup>
            //             <tr>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chờ xác nhận</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chờ lấy hàng</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Đã xử lý</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Đơn hủy</span>
            //                     </div>
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Trả hàng/Hoàn tiền chờ xử lý</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Sản phẩm bị tạm khóa</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Sản phẩm hết hàng</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chương trình khuyến mãi chờ xử lý</span>
            //                     </div>
            //                 </td>
            //             </tr>
            //         </table>
            //     </div>
            //     <div className={styles.BodyHomeStore_Title}>
            //         Công việc cần làm
            //     </div>
            //     <div className={styles.BodyHomeStore_Content}>
            //         <table className={styles.NeedWork}>
            //             <colgroup>
            //                 <col />
            //                 <col />
            //                 <col />
            //                 <col />
            //             </colgroup>
            //             <tr>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chờ xác nhận</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chờ lấy hàng</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Đã xử lý</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Đơn hủy</span>
            //                     </div>
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Trả hàng/Hoàn tiền chờ xử lý</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Sản phẩm bị tạm khóa</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Sản phẩm hết hàng</span>
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className={styles.NeedWork_Item}>
            //                         <span className={styles.number}>0</span>
            //                         <span>Chương trình khuyến mãi chờ xử lý</span>
            //                     </div>
            //                 </td>
            //             </tr>
            //         </table>
            //     </div>
            // </div>
            
            )}
            
            <Chat />
        </div>
    )
}