import React, {useEffect, useState } from 'react'
import styles from './BodyHomeStore.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUser, faTableList, faTicket, faLink, faKey,faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest';
import ModalCustomer from '../../Modal/Modal';
import ModalUpdate from '../../ModalUpdate/ModalUpdate';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Example from '../../../compoments/ModalFull/ModalFull';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faBook, faTruckFast, faChartSimple} from '@fortawesome/free-solid-svg-icons';

export default function BodyHomeStore({managebook,manageorder,managestore,analysis}) {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data,setData] = useState('');   
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [selectOrder, setSelectOrder] = useState(null);
    const currentUser = localStorage.getItem("currentUser");
    const [userData, setUserData] = useState('');
    const [user, setUser] = useState('');
    var userdetail = JSON.parse(currentUser);
    const [selectProduct, setSelectProduct] = useState(null);
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
            console.log(res.data)
            console.log(manageorder)
            setIsPending(false);
            setError(false)
          })
          .catch((error) => {
            setError(error.response.data)
            setIsPending(false)
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
      const data2 = [
        { name: 'Tháng 1', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Tháng 2', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Tháng 3', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Tháng 4', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Tháng 5', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Tháng 6', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Tháng 7', uv: 3490, pv: 4300, amt: 2100 },
      ];
      useEffect(()=>{
        console.log(managebook)
        console.log(manageorder)
        console.log(managestore)
        console.log(analysis)
      }, [managebook,manageorder,managestore,analysis])
    useEffect(()=>{
        getData();
      }, [managebook,manageorder,managestore,analysis])


    return(
        
        <div className={styles.BodyHomeStore}>
            <div className={styles.BodyHomeStore_Item}>
                {/* <tbody>                              
                    <tr key={userdetail.id}>
                      {managebook && selectedProduct && (
                        <Example showExmaple={true} showCloseExample={()=>setSelectedProduct(null)} id = {selectedProduct.id} isOrder={false}/>
                      )}
                      {manageorder && selectOrder && (
                        <Example showExmaple={true} showCloseExample={()=>setSelectOrder(null)} id = {selectOrder.id} isOrder={true} isVoucher={false}/>
                      )}
                    </tr>
                </tbody> */}
          {managebook && (
            <div className={styles.table1}>
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
                    {/* <img src={product.Images[0]?.filename} alt="Avatar" width="50" height="50" /> */}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.desc}</td>
                  <td className={styles.price}>{product.price}đ</td>
                  <td>{product.sales_number}</td>
                  <td>{product.Author?.name}</td>
                  <td>
                    {/* {product.Categories.map((item)=>(
                    <span>{item.name} <br></br></span> 
                  ))} */}
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
                {!error && data && data.map((product) => (
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
                    ) : ( <td><FontAwesomeIcon icon={faXmark} className={styles.x_icon} /></td>)}
                    <td className={styles.price}>{product.quantity}</td>
                    <td>{Date(product.createdAt)}</td>
                    <td>{product.customer?.firstName} {product.customer?.lastName}</td>
                    <td>{product.store?.firstName} {product.store?.lastName}</td>
                    <td>{product.Book?.name}</td>
                    <td>{product.State?.status}</td>
                    <td>
                      <button>
                      <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClickOrder(product.id)}} />
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
                
            </div>
            {!managebook && !manageorder && !managestore && !analysis && (
                
                <div className={styles.BodyHomeStore_Item}>
                <div className={styles.BodyHomeStore_Title}>
                    Phân tích bán hàng hôm nay
                </div>
                <div className={styles.BodyHomeStore_Content}>
                    <table className={styles.NeedWork}>
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ xác nhận</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ lấy hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đã xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đơn hủy</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Trả hàng/Hoàn tiền chờ xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm bị tạm khóa</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm hết hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chương trình khuyến mãi chờ xử lý</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={styles.BodyHomeStore_Title}>
                    Công việc cần làm
                </div>
                <div className={styles.BodyHomeStore_Content}>
                    <table className={styles.NeedWork}>
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ xác nhận</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chờ lấy hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đã xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Đơn hủy</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Trả hàng/Hoàn tiền chờ xử lý</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm bị tạm khóa</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Sản phẩm hết hàng</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.NeedWork_Item}>
                                    <span className={styles.number}>0</span>
                                    <span>Chương trình khuyến mãi chờ xử lý</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            
            )}
            <div className={styles.BodyHomeStore_Item}>
                <div className={styles.BodyHomeStore_Title}>
                    Phân tích bán hàng hôm nay
                </div>
                <div className={styles.BodyHomeStore_Sales_Content}>
                    <div className={styles.Sales_Chart}>
                        <span>Doanh số</span>
                        <LineChart width={500} height={150} data2={data2} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    <div className={styles.sales}>
                        <div className={styles.Sales_Item}>
                            <span>Lượt truy cập</span>
                            <span className={styles.number}>0</span>
                            <span className={styles.compare}>So với hôm qua: 100%</span>
                        </div>
                        <div className={styles.Sales_Item}>
                            <span>Doanh số</span>
                            <span className={styles.number}>0</span>
                            <span className={styles.compare}>So với hôm qua: 100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}