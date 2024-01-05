import React, { Profiler } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ModalUpdate.module.css'
import { faTrash, faEnvelope, faMobilePhone, faWarehouse, faPenToSquare, faCircleInfo, faSearch, faBell, faAlignCenter, faL, faUser} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import newRequest from '../../ults/NewRequest';
import { useEffect } from 'react';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';
import moment from 'moment';
import Voucher from '../../pages/Admin/Voucher/Vouher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export default function ModalUpdate({customer, showUpdate, handleCloseUpdate, getData, product, getDataProduct, voucher}) {
  const [filter, setFilter] = useState({
    email : customer?.email,
    address : customer?.address,
    phone : customer?.phone,
  })
  const [filterBoook, setFilterBook] = useState({
    price : product?.price,
    author : product?.Author?.id,
    name : product?.name,
    sales_number : product?.sales_number,
    desc: product?.desc
  })
  const [filterVoucher, setFilterVoucher] = useState({
    name : voucher?.name,
    discountType : voucher?.discountType,
    codition : voucher?.codition,
    discountValue: voucher?.discountValue,
    quantity : voucher?.quantity,
    expiryDate: voucher?.expiryDate
  })
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [isPendingUpdate, setIsPendingUpdate] = useState(null)
  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
      setSelectedCategories(updatedCategories);
    }
  };
  
  const handleUpdate = (id)=>{
    newRequest.put(`/user/edit/${id}`,filter, {
      withCredentials: true
    })
    .then((res) => {
      getData('')
      handleCloseUpdate()
    })
    .catch((error) => {
    });
  }
  const handleSetFilterVoucher = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name)
    console.log(value)
    setFilterVoucher((prev)=>(
      {
        ...prev,
        [name]: name === 'codition' ? parseInt(value, 10) : name === 'discountValue' ? parseInt(value, 10): name === 'quantity' ? parseInt(value, 10) : value,
      }
    ))
  }
  const handleUpdateVoucher = (id, filterVoucher)=>{
    newRequest.put(`/voucherItem/update/${id}`,filterVoucher, {
      withCredentials: true
    })
    .then((res) => {
      toast.success("Chỉnh sửa voucher thành công!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, 
      });
      getData('')
      handleCloseUpdate()
    })
    .catch((error) => {
      console.log(error)
    });
  }
  const handelSetFilterBook = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    if(name == 'price' || name == 'sales_number' || name == 'author'){
      value = parseInt(value)
    }
    setFilterBook((prev)=>(
      {
        ...prev,
        [name]: value,
      }
    ))
  }
  console.log(filterVoucher)
  const handleSetFilter = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFilter((prev)=>(
      {
        ...prev,
        [name]: name === 'codition' ? parseInt(value, 10) : value,
      }
    ))
  }
  useEffect(()=>{
    setIsPending(true);
    newRequest.get(`/category`, {
      withCredentials: true
    })
    .then((res) => {
      setCategory(res.data)
      setIsPending(false);
      setError(false)
    })
    .catch((error) => {
      setError(error.response.data);
      setIsPending(false);
    });
  }, [product])
  const handleUpdateBook = (filterBoook, selectedCategories, id) =>{
    const updatedFilter = {
      ...filterBoook,
      categorys: selectedCategories.length == 0 ? product.Categories.map((item)=>{
        return parseInt(item.id)
      }) : selectedCategories
    };
    setIsPendingUpdate(true);
    newRequest.put(`/book/update/${id}`,updatedFilter, {
      withCredentials: true
    })
    .then((res) => {
      getDataProduct('')
      setIsPendingUpdate(false);
      handleCloseUpdate()
    })
    .catch((error) => {
      setIsPendingUpdate(false);
    });
  }
  return (
    <>
    <Modal show={showUpdate} onHide={handleCloseUpdate}
            backdrop={false}
            className={styles.cc}
    >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {customer && (
              <div className={styles.card}>
              <div className={styles.avatar_card}>
                <img className={styles.img_card} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxMWB6zdzX1Yhcbhe3KJQr3zxGsl_ETGi2A&usqp=CAU" alt="" />
                <div className={styles.card_name}>{customer.firstName} {customer.lastName}</div>
              </div>
              <div className={styles.infor}>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.card_icon} />
                    <input type="text" defaultValue={customer.email} className = {styles.name_item} name='email' onChange={(e)=>handleSetFilter(e)} />
                  </div>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faWarehouse} className={styles.card_icon}/>
                    <textarea className={styles.address} name="address" id="" cols="30" rows="10" defaultValue={customer.address} onChange={(e)=>handleSetFilter(e)} ></textarea>
                  </div>
                </div>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faMobilePhone} className={styles.card_icon} />
                    <input type="text" defaultValue={customer.phone ? `0${customer.phone}` : ''} className = {styles.name_item} name = 'phone' onChange={(e)=>handleSetFilter(e)}  />
                  </div>
                  <div className={styles.infor_item}>
                    <FontAwesomeIcon icon={faUser} className={styles.card_icon} />
                    <input type="text" defaultValue={'25'} className = {styles.name_item} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {product && (
            <div className={styles.card}>
              <div className={styles.avatar_card}>
                <img className={styles.img_card} src={product.Images[0].filename} alt="" />
                <div className={styles.card_name}>{product.name}</div>
              </div>
              <div className={styles.infor}>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Giá</span>
                    <input type="text" defaultValue={product.price} className = {styles.value_book} name='price' onChange={(e)=>handelSetFilterBook(e)} />
                  </div>
                </div>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Tác giả</span>
                    <input type="text" defaultValue={product.Author?.name} className = {styles.value_book} name = 'author' onChange={(e)=>handelSetFilterBook(e)}  />
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Số lượng</span>
                    <input type="text" name='sales_number' defaultValue={product.sales_number} className = {styles.value_book} onChange={(e)=>handelSetFilterBook(e)} />
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Thể loại</span>
                    <div className={styles.value_book}>{product.Categories.map((item)=>(
                      <span>{item.name}</span>
                    ))}</div>
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Chọn thể loại</span>
                    <div className={styles.value_book}>
                      {isPending && (<div>........</div>)}
                      {error && (<div>{error}</div>)}
                      {!isPending && !error && category && category.map((item, i) =>(
                        <label key={i}>
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={handleCategoryChange}
                          />  
                          {item.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Nội dung</span>
                    <textarea className={styles.desc_book} name="desc" id="" cols="30" rows="10" defaultValue={product.desc} onChange={(e)=>handelSetFilterBook(e)} ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}
           {isPendingUpdate && (<img className={styles.img_loading} src=" https://assets.materialup.com/uploads/ec71c736-9c99-4c75-9fb4-6b263f9717a2/line.gif" alt="" />)}
           {voucher && (
            <div className={styles.card}>
              <div className={styles.avatar_card}>
                <img className={styles.img_card} src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-6.jpg" alt="" />
                <div className={styles.card_name}>
                <input type="text" defaultValue={voucher.name} className = {styles.value_book} name='name' onChange={(e)=>handleSetFilterVoucher(e)} />
                </div>
              </div>
              <div className={styles.infor}>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item1}>
                    <span className={styles.book_title}>Loại</span>
                    <select className={styles.value_book1} name='discountType' onChange={(e)=>handleSetFilterVoucher(e)}>
                        <option value={voucher.discountType == 'amount' ? 'amount' : "percent" }>{voucher.discountType == 'amount' ? 'amount' : "percent" }</option>
                        <option value={voucher.discountType == 'amount' ? 'percent' : "amount" }>{voucher.discountType == 'amount' ? 'percent' : "amount" }</option>
                    </select>
                  </div>
                </div>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item1}>
                    <span className={styles.book_title}>Điều kiện đơn hàng lớn hơn</span>
                    <input type="text" defaultValue={voucher.codition} className = {styles.value_book1} name = 'codition' onChange={(e)=>handleSetFilterVoucher(e)}  />
                  </div>
                  <div className={styles.infor_item1}>
                    <span className={styles.book_title}>Giảm giá</span>
                    <div className={styles.amount}>
                    <input type="text" name='discountValue' defaultValue={voucher.discountValue} className = {styles.value_book1} onChange={(e)=>handleSetFilterVoucher(e)} />
                    <span>{filterVoucher.discountType == "amount" ? "đ" : "%"}</span>
                    </div>
                  </div>
                  <div className={styles.infor_item1}>
                    <span className={styles.book_title}>Số lượng</span>
                    <input className={styles.value_book1} defaultValue={voucher.quantity} onChange={(e)=>handleSetFilterVoucher(e)} name='quantity' />
                  </div>
                  <div className={styles.infor_item1}>
                    <span className={styles.book_title}>Ngày hết hạn</span>
                    <input type='date' name='expiryDate' defaultValue={moment(voucher.expiryDate).format("YYYY-MM-DD")} className={styles.value_book1} onChange={(e)=>handleSetFilterVoucher(e)}/>
                  </div>
                </div>
              </div>
            </div>
           )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          {customer && (
              <Button variant="primary" onClick={() => handleUpdate(customer.id)}>
                  Save Change
              </Button>
          )}
          {product && (
              <Button variant="primary" onClick={() => handleUpdateBook(filterBoook,selectedCategories,product.id)}>
                  Save Change
              </Button>
          )}
          {voucher && (
              <Button variant="primary" onClick={() => handleUpdateVoucher(voucher.id, filterVoucher)}>
                  Save Change
              </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
