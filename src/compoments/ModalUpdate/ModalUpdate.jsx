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
export default function ModalUpdate({customer, showUpdate, handleCloseUpdate, getData, product}) {
  const [filter, setFilter] = useState({
    email : customer?.email,
    address : customer?.address,
    phone : customer?.phone,
  })
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [checked, setChecked] = useState(null);
  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryValue]);
    } else {
      const updatedCategories = selectedCategories.filter(
        (category) => category !== categoryValue
      );
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
  const handleSetFilter = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFilter((prev)=>(
      {
        ...prev,
        [name]: name === 'phone' ? parseInt(value, 10) : value,
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
  const handleInputChange = (name) => {
    const updatedCategories = product.Categories.map((itemp) => {
      if (itemp.name === name) {
        return { ...itemp, checked: !itemp.checked };
      }
      return itemp;
    });
  };
  return (
    <>
    <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
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
                    <input type="text" defaultValue={product.price} className = {styles.value_book} name='email' onChange={(e)=>handleSetFilter(e)} />
                  </div>
                </div>
                <div className={styles.infor_body}>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Tác giả</span>
                    <input type="text" defaultValue={product.Author.name} className = {styles.value_book} name = 'phone' onChange={(e)=>handleSetFilter(e)}  />
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Số lượng</span>
                    <input type="text" defaultValue={product.sales_number} className = {styles.value_book} />
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Thể loại</span>
                    <div className={styles.value_book}>
                      {isPending && (<div>........</div>)}
                      {error && (<div>{error}</div>)}
                      {!isPending && !error && category && (
                        category.map((item, i)=>{
                          <label key={i}>
                            <input
                              type="checkbox"
                              value={item.id}
                            />  
                            {item.name}
                          </label>
                        })
                      )}
                      {}
                    </div>
                    <div className={styles.value_book}>{product.Categories.map((item)=>(
                      <span>{item.name}</span>
                    ))}</div>
                  </div>
                  <div className={styles.infor_item}>
                    <span className={styles.book_title}>Nội dung</span>
                    <textarea className={styles.desc_book} name="address" id="" cols="30" rows="10" defaultValue={product.desc} onChange={(e)=>handleSetFilter(e)} ></textarea>
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
          <Button variant="primary" onClick={() => handleUpdate(customer.id)}>
              Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
