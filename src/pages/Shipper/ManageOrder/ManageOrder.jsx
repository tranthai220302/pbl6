import React, { useEffect, useState } from 'react';
import styles from './ManageOrder.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import newRequest from '../../../ults/NewRequest';
export default function MyProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser)
  const dummyData = [
    { time: '09:00', location: 'Hanoi', price: '1000000', shopName: 'ABC Shop', status: 'Completed' },
    { time: '10:30', location: 'Ho Chi Minh City', price: '750000', shopName: 'XYZ Shop', status: 'Pending' },
    { time: '12:15', location: 'Da Nang', price: '500000', shopName: 'DEF Shop', status: 'Cancelled' },
    { time: '14:45', location: 'Can Tho', price: '1200000', shopName: 'GHI Shop', status: 'Completed' },
    { time: '16:20', location: 'Nha Trang', price: '900000', shopName: 'JKL Shop', status: 'Pending' },
  ];
  const [openEdit, setOpenEdit] = useState(false);
  const [DataOrder, setDataOrder] = useState([]);
  const GetOrder = () => {
    newRequest.get(`/shippemt/get-orders`, {
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res.data);
        setDataOrder(res.data)
      }
    ).catch((error) => {
      console.error(error);
    });
  };

  useEffect(()=>{
    GetOrder();
  },[])
  return (
    <div className={styles.MyProfile}>
      {currentUser ? (
        <div>
          <div className={styles.MyProfile_Title}>Quản lý đơn hàng</div>
          <div>
            <div>
              <table className={styles.viewrating}>
                <colgroup>
                  <col width='24%' />
                  <col />
                </colgroup>
                <tr>
                  <th>Thời gian</th>
                  <th>Địa điểm</th>
                  <th>Giá tiền</th>
                  <th>Tên shop</th>
                  <th>Trạng thái</th>
                  <th>Xem chi tiết</th>
                </tr>
                {DataOrder.map((data, index) => (
                  <tr key={index}>
                    <td>{data.updatedAt}</td>
                    <td>{data.Order.addressCustomer}</td>
                    <td>{data.Order.total_price}</td>
                    <td>{data.Order.store.DetailStore.nameStore}</td>
                    <td>{data.Order.State.status}</td>
                    <td><FontAwesomeIcon icon={faPenSquare} onClick={()=>setOpenEdit(true)}/></td>
                  </tr>
                ))}
              </table>
            </div>
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


const EditStore = ({ setOpenedit }) => {
    const [formData, setFormData] = useState({
      name: '',
      logo: null,
      description: '',
      address: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const updateVoucherItem = () => {
      console.log('Updating store information:', formData);
      setOpenedit(false);
    };
  
    return (
      <div className={styles.overlay}>
        <div className={styles.editForm}>
          <h3>Thay đổi thông tin người giao hàng</h3>
          <label htmlFor="name">Tên cửa hàng: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="name">Tên cửa hàng: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="name">Tên cửa hàng: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="name">Tên cửa hàng: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="name">Tên cửa hàng: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {/* ... Other input fields ... */}
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
