import React, { useState, useEffect } from 'react';
import styles from './StoreManage.module.css';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons';

const EditStore = ({ item, setOpenedit, getDataVoucher }) => {
  console.log(item)
  const [formData, setFormData] = useState({
    name: item.name || '',
    logo: item.logo || null,
    description: item.description || '',
    address: item.address || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo' && files && files[0]) {
      // If it's a file input, handle the file and set it to the formData
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));

      // If you want to dynamically update the displayed image, you can use FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
          imagePreview.src = e.target.result;
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      // For other inputs, update the formData as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const updateVoucherItem = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('logo', formData.logo);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('address', formData.address);

    newRequest
      .put(`/voucherItem/update/${item.id}`, formDataToSend, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('Successfully updated voucher item:', res.data);
        getDataVoucher();
      })
      .catch((error) => {
        console.error('Error updating voucher item:', error);
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.editForm}>
        <h3>Thay đổi thông tin cửa hàng</h3>
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        
        {/* Hidden file input */}
        <input type="file" name="logo" onChange={handleChange} hidden />
        
        {/* Clickable image to trigger file input */}
        <div onClick={() => document.getElementsByName('logo')[0].click()}>
          <img
            id="imagePreview"
            style={{ height: '150px', width: '150px', borderRadius: '150px', cursor: 'pointer' }}
            src={formData.logo ? URL.createObjectURL(formData.logo) : 'default-image-url'}
            alt=""
          />
        </div>
        
        <label htmlFor="description">Mô tả cửa hàng: </label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <label htmlFor="address">Địa chỉ: </label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        <button onClick={updateVoucherItem} className={styles.button}>
          Lưu thay đổi
        </button>
        <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};


const Edit = ({item,setOpenedit ,getDataVoucher}) => {
    console.log(item);
    // Sử dụng item để đặt giá trị mặc định của formData
    const [formData, setFormData] = useState({
      name: item.name || '',
      discountValue: item.discountValue || '',
      discountType: item.discountType || '',
      expiryDate: item.expiryDate || '',
      quantity: item.quantity || '',
      codition: item.codition || '',
      VoucherId: item.VoucherId || '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const UpdatUser = () => {
      newRequest.put(`/voucherItem/update/${item.id}`, formData, {
        withCredentials: true
      }).then(
        (res) => {
          console.log(res.data);
          getDataVoucher()
        }
      ).catch((error) => {
        console.error(error);
      });
      console.log('Đã cập nhật thông tin người dùng:', formData);
    };
  
    return (
      <div className={styles.overlay}>
        <div className={styles.editForm}>
          <h3>Thay đổi thông tin cá nhân</h3>
          <label htmlFor="name">Tên mã giảm giá: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="discountValue">Số tiền được giảm: </label>
          <input type="text" name="discountValue" value={formData.discountValue} onChange={handleChange} />
          <label htmlFor="discountType">Kiểu: </label>
          <input type="text" name="discountType" value={formData.discountType} onChange={handleChange} />
          <label htmlFor="expiryDate">Có hạn đến ngày: </label>
          <input type="datetime-local" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          <label htmlFor="quantity">Số lượng: </label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
          <label htmlFor="codition">Giá tiền tối thiểu: </label>
          <input type="text" name="codition" value={formData.codition} onChange={handleChange} />
          <button onClick={UpdatUser}>Lưu thay đổi</button>
          <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>Hủy bỏ</button>
        </div>
      </div>
    );
  };

  const Add = ({ setOpenedit,id,getDataVoucher }) => {
    const [formData, setFormData] = useState({
      name: '',
      discountValue: '',
      discountType: '',
      expiryDate: '',
      quantity: '',
      codition: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const UpdatUser = () => {
      const jsonData = {
        "name": formData.name,
        "discountValue": formData.discountValue,
        "discountType": formData.discountType,
        "expiryDate": formData.expiryDate,
        "quantity": formData.quantity,
        "codition": formData.codition,
        "VoucherId":1
      };
    
      newRequest.post(`/voucherItem/create/${id}`, jsonData, {
        withCredentials: true
      }).then(
        (res) => {
          console.log(res.data);
          getDataVoucher();
        }
      ).catch((error) => {
        console.error(error);
      });
    };
    
  
    return (
      <div className={styles.overlay}>
        <div className={styles.editForm}>
          <h3>Tạo mã giảm giá</h3>
          <label htmlFor="name">Tên mã giảm giá: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="discountValue">Số tiền được giảm: </label>
          <input type="text" name="discountValue" value={formData.discountValue} onChange={handleChange} />
          <label htmlFor="discountType">Kiểu: </label>
          <select name="discountType" value={formData.discountType} onChange={handleChange}>
              <option value="amount">Amount</option>
              <option value="percentage">Percentage</option>
          </select>
          <label htmlFor="expiryDate">Có hạn đến ngày: </label>
          <input type="datetime-local" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          <label htmlFor="quantity">Số lượng: </label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
          <label htmlFor="codition">Giá tiền tối thiểu: </label>
          <input type="text" name="codition" value={formData.codition} onChange={handleChange} />
          <button onClick={UpdatUser}>Lưu thay đổi</button>
          <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>Hủy bỏ</button>
        </div>
      </div>
    );
  };
  
export default function StoreManage({ Submenu, SetSubmenu }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [data, setData] = useState({});
  const [dataVoucher, setDataVoucher] = useState([]);
const [openedit, setOpenedit]= useState(false);
const [idvoucher,setIdvoucher] = useState("")
const getData = () => {
  newRequest.get(`/user/infor/${currentUser.id}`, {}).then(
    (res) => {
      console.log(res.data);
      setData(res.data);
    }
  ).catch((error) => {
  });
}
const getDataVoucher= () => {
    newRequest.get(`/voucherItem/list/${currentUser.id}?type=store&isExpire=true`, {withCredentials: true}).then(
      (res) => {
        console.log(res.data);
        setDataVoucher(res.data);
      }
    ).catch((error) => {
      // Xử lý lỗi nếu cần
    });
  }
  useEffect(() => {
    getDataVoucher();
    getData();
  }, []); // Gọi useEffect chỉ một lần khi component được tạo ra
  const handledit=(id)=>{
        setIdvoucher(id)
        setOpenedit("edit");
        console.log("xin chao")
  }
  const handladd=()=>{
    setOpenedit("add");
    console.log("xin chao")
}
const handleditstore=()=>{
  setOpenedit("editstore");
  console.log("xin chao")
}
  return (
    <div className={styles.StoreManage}>
      <Tabs
        activeKey={Submenu}
        onSelect={(k) => SetSubmenu(k)}
      >
        <Tab eventKey="Thông tin cửa hàng" title="Thông tin cửa hàng">
          {currentUser ? (
            <div>
              <div className={`${styles.StoreManage_Title} ${styles.StoreInf}`}>
                {Submenu}
                <FontAwesomeIcon className={styles.Edit_StoreInf} icon={faPenToSquare} onClick={handleditstore}/>
              </div>
              <div className={styles.StoreManage_Content}>
                <table>
                  <colgroup>
                    <col width='30%' />
                    <col />
                  </colgroup>
                  <tr>
                    <th>Tên cửa hàng</th>
                    <td>{data.DetailStore?.nameStore}</td>
                  </tr>
                  <tr>
                    <th>Logo của cửa hàng</th>
                    <td><img style={{ height: "150px", width: "150px", borderRadius: "150px" }} src={data.DetailStore?.avatar} alt="" /></td>
                  </tr>
                  <tr>
                    <th>Mô tả cửa hàng</th>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ</th>
                    <td>{data.DetailStore?.address}</td>
                  </tr>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.notlogin}>
              <span className={styles.Notification}>
                Bạn cần đăng nhập để truy cập!
              </span>
              <Link to="/login">Đăng nhập</Link>
            </div>
          )}
        </Tab>
        <Tab eventKey="Đánh giá cửa hàng" title="Đánh giá cửa hàng">
          {currentUser ? (
            <div>
              <div className={styles.StoreManage_Title}>
                Đánh giá cửa hàng
              </div>
              <div className={styles.rating}>
                <div>
                    Được đánh giá 4.3/5
                </div>
                <div>Tất cả</div>
                <div>1 sao</div>
                <div>2 sao</div>
                <div>3 sao</div>
                <div>4 sao</div>
                <div>5 sao</div>
              </div>
              <div>
              <table className={styles.viewrating}>
                  <colgroup>
                    <col width='24%' />
                    <col />
                  </colgroup>
                  <tr>
                    <th>Thông tin Sản phẩm</th>
                    <th>Đánh giá của Người mua</th>
                    <th>Số sao</th>
                    <th>Tên người đánh giá</th>
                  </tr>
                  <tr>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                  <tr>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                  <tr>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                  <tr>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                  <tr>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                    <td>{data.DetailStore?.descStore}</td>
                  </tr>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.notlogin}>
              <span className={styles.Notification}>
                Bạn cần đăng nhập để truy cập!
              </span>
              <Link to="/login">Đăng nhập</Link>
            </div>
          )}
        </Tab>
        <Tab eventKey="Mã giảm giá của cửa hàng" title="Mã giảm giá của cửa hàng">
        {currentUser ? (
            <div>
              <div className={styles.StoreManage_Title}>
                Mã giảm giá của cửa hàng
              </div>
              <div className={styles.rating}>
                <div onClick={()=>handladd()}>
                    Thêm voucher 
                </div>
              </div>
              <div>
              <table className={styles.viewrating}>
                  <colgroup>
                    <col width='24%' />
                    <col />
                  </colgroup>
                  <tr>
                    <th>Tên mã giảm giá </th>
                    <th>Giảm</th>
                    <th>Đơn hàng tối thiểu</th>
                    <th>Số lượng</th>
                        <th>
                        Cập nhật
                        </th>
                    <th>
                        Xóa
                        </th>
                  </tr>
                  {dataVoucher && dataVoucher.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.discountValue}</td>
                      <td>{item.codition}</td>
                      <td>{item.quantity}</td>
                      <td onClick={()=>handledit(item)}><FontAwesomeIcon icon={faPenToSquare} /></td>
                      <td><FontAwesomeIcon icon={faTrash} /></td>
                    </tr>
                  ))}

                </table>
              </div>
            </div>
          ) : (
            <div className={styles.notlogin}>
              <span className={styles.Notification}>
                Bạn cần đăng nhập để truy cập!
              </span>
              <Link to="/login">Đăng nhập</Link>
            </div>
          )}
        </Tab>
      </Tabs>
    {openedit==="edit" && <Edit item={idvoucher} setOpenedit={setOpenedit}  getDataVoucher={getDataVoucher}/>}
    {openedit==="add" && <Add  setOpenedit={setOpenedit} id={currentUser.id}/>}
    {openedit==="editstore" && <EditStore item={data}  setOpenedit={setOpenedit}  />}
    </div>
  );
}
