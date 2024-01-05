import React, { useEffect, useState } from 'react';
import styles from './MyProfile.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import newRequest from '../../../ults/NewRequest';

// ... (your other imports)

// ... (your other imports)

export default function MyProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    avata:'',
    age: '',
    drivingLicense: '',
    numMotorbike: '',
  });

  const GetOrder = () => {
    newRequest.get(`/user/detailShipper/${currentUser.id}`, {
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res.data[0].userShipper);
        setFormData({
          ...formData,
          firstName: res?.data[0]?.userShipper?.firstName,
          lastName: res?.data[0]?.userShipper?.lastName,
          address: res?.data[0]?.userShipper?.address,
          phone: res?.data[0]?.userShipper?.phone,
          avata: res?.data[0]?.userShipper?.avata,
          age: res?.data[0]?.userShipper?.age,
          drivingLicense: res?.data[0]?.drivingLience,
          numMotorbike: res?.data[0]?.numMobike,
        });
        setData(res?.data[0]);
      }
    ).catch((error) => {
      console.error(error);
    });
  };
  

  useEffect(() => {
    GetOrder();
  }, []);

  const updateProfile = async () => {
    try {
      const formDataObject = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phone: formData.phone,
        age: formData.age,
        drivingLience: formData.drivingLicense,
        numMobike: formData.numMotorbike,
      };
      
  
      const response = await newRequest.put(`/shippemt/edit`, formDataObject, {
        withCredentials: true,
      });
  
      console.log(response.data);
      toast.success('Thông tin đã được cập nhật thành công!');
      setOpenEdit(false);
      GetOrder();
    } catch (error) {
      console.error('Có lỗi khi cập nhật thông tin:', error.message);
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const EditStore = ({ setOpenedit }) => {
    return (
      <div className={styles.overlay}>
        <div className={styles.editForm}>
          <h3>Thay đổi thông tin người giao hàng</h3>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

          <label htmlFor="address">Địa chỉ: </label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label htmlFor="phone">Số điện thoại: </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label htmlFor="age">Tuổi: </label>
          <input type="text" name="age" value={formData.age} onChange={handleChange} />

          <label htmlFor="drivingLicense">Bằng lái: </label>
          <input type="text" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} />

          <label htmlFor="numMotorbike">Số xe máy: </label>
          <input type="text" name="numMotorbike" value={formData.numMotorbike} onChange={handleChange} />

          <button onClick={updateProfile} className={styles.button}>
            Lưu thay đổi
          </button>
          <button className={styles.btn_cancel} onClick={() => setOpenedit(false)}>
            Hủy bỏ
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.MyProfile}>
      {currentUser ? (
        <div>
          <div className={styles.MyProfile_Title}>
            <span>Thông tin cá nhân</span>
            <FontAwesomeIcon className={styles.Edit_StoreInf} icon={faPenSquare} onClick={() => setOpenEdit(true)} />
          </div>
          <div className={styles.MyProfile_Content}>
            <table>
              <colgroup>
                <col width='30%' />
                <col />
              </colgroup>
              <tr>
                <th>Tên đăng nhập</th>
                <td>{data.userShipper?.username}</td>
              </tr>
              <tr>
                <th>Họ và tên</th>
                <td>{data.userShipper?.firstName + ' ' + data.userShipper?.lastName}</td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td>{data.userShipper?.address}</td>
              </tr>
              <tr>
                <th>Số điện thoại</th>
                <td>{data.userShipper?.phone}</td>
              </tr>
              <tr>
                <th>Tuổi</th>
                <td>{data.userShipper?.age}</td>
              </tr>
              <tr>
                <th>Bằng lái</th>
                <td>{data.drivingLience}</td>
              </tr>
              <tr>
                <th>Số xe máy</th>
                <td>{data.numMobike
}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.notlogin}>
          <span className={styles.Notification}>Bạn cần đăng nhập để truy cập!</span>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
      {openEdit && <EditStore setOpenedit={setOpenEdit} />}
    </div>
  );
}

