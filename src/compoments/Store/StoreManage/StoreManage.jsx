import React, { useState, useEffect } from 'react';
import styles from './StoreManage.module.css';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faReply, faMessage, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
const notify = (er, message) => toast[er](message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});
const EditStore = ({ item, setOpenedit, getDataVoucher }) => {
  console.log(item.DetailStore)
  const [formData, setFormData] = useState({
    name: item.DetailStore.nameStore || '',
    logo: item.DetailStore.avatar
      || null,
    description: item.DetailStore.descStore
      || '',
    address: item.DetailStore.address || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo' && files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
          imagePreview.src = e.target.result;
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
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
          <div className={styles.FormTitle}>
            <h3>Thay đổi thông tin cửa hàng</h3>
            <FontAwesomeIcon className={styles.CloseForm} icon={faClose} onClick={() => setOpenedit(false)} />
          </div>        
        <label htmlFor="name">Tên cửa hàng: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="logo">Avatar cửa hàng: </label>
        {/* Hidden file input */}
        <input type="file" name="logo" onChange={handleChange} hidden />

        {/* Clickable image to trigger file input */}
        <div className={styles.avt_store} onClick={() => document.getElementsByName('logo')[0].click()}>
          <img
            id="imagePreview"
            style={{ height: '150px', width: '150px', borderRadius: '150px', cursor: 'pointer' }}
            src={formData.logo}
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
      </div>
    </div>
  );
};
const Edit = ({ item, setOpenedit, getDataVoucher }) => {
  console.log(item);
  const convertToDatetimeLocalFormat = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    name: item.name || '',
    discountValue: item.discountValue || '',
    discountType: item.discountType || '',
    expiryDate: convertToDatetimeLocalFormat(item.expiryDate) || '',
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
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res.data);
        getDataVoucher();
        setOpenedit(false)
      }
    ).catch((error) => {
      console.error(error);
    });
    console.log('Đã cập nhật thông tin người dùng:', formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.editForm}>
      <div className={styles.FormTitle}>
            <h3>Cập nhật thông tin mã giảm giá</h3>
            <FontAwesomeIcon className={styles.CloseForm} icon={faClose} onClick={() => setOpenedit(false)} />
          </div>
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
      </div>
    </div>
  );
};


const Add = ({ setOpenedit, id, getDataVoucher }) => {
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
      "VoucherId": 1
    };

    newRequest.post(`/voucherItem/create/${id}`, jsonData, {
      withCredentials: true
    }).then(
      (res) => {
        console.log(res.data);
        getDataVoucher();
        setOpenedit(false);
      }
    ).catch((error) => {
      console.error(error);
    });
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.editForm}>
          <div className={styles.FormTitle}>
            <h3>Tạo mã giảm giá</h3>
            <FontAwesomeIcon className={styles.CloseForm} icon={faClose} onClick={() => setOpenedit(false)} />
          </div>
        <label htmlFor="name">Tên mã giảm giá: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label htmlFor="discountValue">Số tiền được giảm: </label>
        <input type="text" name="discountValue" value={formData.discountValue} onChange={handleChange} />
        <label htmlFor="discountType">Kiểu: </label>
        <select name="discountType" value={formData.discountType} onChange={handleChange}>
          <option value="amount">Amount</option>
          <option value="percentage">Percentage</option>
        </select>
        {formData.discountType === 'amount' ? (
              <div style={{display: 'contents'}}>
                  <label htmlFor="discountValue">Số tiền được giảm: </label>
                  <input type="text" name="discountValue" value={formData.discountValue} onChange={handleChange} />
              </div>
          ) : (
              <div style={{display: 'contents'}}>
                  <label htmlFor="discountValue">Số phần trăm được giảm: </label>
                  <input type="text" name="discountValue" value={formData.discountValue} onChange={handleChange} />
              </div>
          )}
        <label htmlFor="expiryDate">Có hạn đến ngày: </label>
        <input type="datetime-local" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        <label htmlFor="quantity">Số lượng: </label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
        <label htmlFor="codition">Giá tiền tối thiểu: </label>
        <input type="text" name="codition" value={formData.codition} onChange={handleChange} />
        <button onClick={UpdatUser}>Lưu thay đổi</button>
      </div>
    </div>
  );
};
const Feedback = ({ setOpenedit, item, getDataStar }) => {

  const handleChange = (e) => {
    setReply(e.target.value)
  };

  const UpdatFeedBack = () => {
    let api = ""
    if (item.FeedBack) {
      api = "/feedBack/update/"
    }
    else {
      api = "/feedBack/create/"
    }
    const apiEndpoint = `${api}${item.FeedBack.id}`;
    const requestMethod = item.FeedBack? 'put' : 'post';
    newRequest[requestMethod](apiEndpoint, {
      "desc": reply
}, {
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res.data);
        getDataStar();
        setOpenedit(false);
        notify("success","Thêm thành công");
      }
    ).catch((error) => {
      console.error(error);
      notify("error","Thất bại");
    });

  };

  const [rating, setRating] = useState(5);
  const [reply, setReply] = useState("");
  const handleRating = (value) => {
    setRating(value);
  };

  const [replyVisible, setReplyVisible] = useState(false);

  const handleReplyClick = () => {
    setReplyVisible(true);
  };

  const handleReplySubmit = () => {
    UpdatFeedBack();
  };
  useEffect(() => {
    setReply(item.FeedBack?.desc);
    if (item.FeedBack?.desc) {
      setReplyVisible(true);
    }
  }, [])


  return (
    <div className={styles.overlay}>
      <div className={styles.editForm}>
        <div className={styles.FormTitle}>
          <h3>Chi tiết đánh giá</h3>
          <FontAwesomeIcon className={styles.CloseForm} icon={faClose} onClick={() => setOpenedit(false)} />
        </div>
        <div className={styles.book}>
          <img className={styles.img_book} src={item.review1} alt="" />
          <div>
            <h4>{item.review2.name}</h4>
            <span>{item.review2.nhaXB}</span>
          </div>
          <div className={styles.price}>
            <span className={styles.current_price}>{item.review2.price - item.review2.price * item.review2.percentDiscount}đ</span>
            <div>
              <span className={styles.old_price}>{item.review2.price
              }đ</span>
              <span className={styles.percent_discount}>-{item.review2.percentDiscount * 100}%</span>
            </div>
          </div>
        </div>
        <div>
          <h5>Đánh giá</h5>
          <div className={styles.cus_comment}>
            <img className={styles.avt_cus} src={item.review1.avatar} alt="" />
            <div className={styles.cus_inf}>
              <span className={styles.name_cus}>{item.review1.lastName} {item.review1.firstName
              }</span>
              <div>
                {Array.from({
                  length: item.num_star
                }).map((_, index) => (
                  <span
                    key={index}
                    style={{
                      cursor: 'pointer',
                      color: index < rating ? '#4EA58B' : 'gray',
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div>
                {item.desc}
              </div>
              <div className={styles.icon_cmt}>
<div className={styles.icon_cmt_child} onClick={handleReplyClick}>
                  <FontAwesomeIcon icon={faReply} />
                  <span>Trả lời</span>
                </div>
                <div className={styles.icon_cmt_child}>
                  <FontAwesomeIcon icon={faMessage} />
                  <span>Nhắn tin</span>
                </div>
              </div>
              {replyVisible && (
                <div className={styles.send_mess}>
                  <textarea style={{ width: '100%' }}
                    placeholder="Nhập nội dung trả lời..."
                    value={reply}
                    onChange={(e) => handleChange(e)}
                  />
                  <button onClick={handleReplySubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Delete = ({ setOpenedit, item, getDataVoucher }) => {

  const UpdatFeedBack = () => {

    newRequest.delete(`/voucherItem/delete/${item.id}`, {
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res.data);
        getDataVoucher(res.data)
        setOpenedit(false);
      }
    ).catch((error) => {
      console.error(error);
    });

  };


  return (
    <div className={styles.overlay}>
      <button onClick={() => UpdatFeedBack()}>Oke</button>
      <button onClick={() => setOpenedit(false)}>Hủy</button>
    </div>
  );
};

export default function StoreManage({ Submenu, SetSubmenu }) {
  const [percentStar, setpercentStar] = useState("")
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [data, setData] = useState({});
  const [datareview, setDataeview] = useState({});
  const [dataStar, setDataStar] = useState([]);
  const [dataVoucher, setDataVoucher] = useState([]);
  const [openedit, setOpenedit] = useState(false);
  const [idvoucher, setIdvoucher] = useState("")
  const getData = () => {
    newRequest.get(`/user/infor/${currentUser.id}`, {}).then(
      (res) => {
        console.log(res.data);
        setData(res.data);
      }
    ).catch((error) => {
    });
  }
  const getDataStar = () => {
    newRequest.get(`/review/store/${currentUser.id}`, {}).then(
      (res) => {
        console.log(res.data.reviews);
        setDataStar(res.data.reviews);
        setpercentStar(res.data.percentStar)
      }
    ).catch((error) => {
    });
  }
  const getByNumStar = (num) => {
    newRequest.get(`/review/store/search/${currentUser.id}?numstar=${num}`, {}).then(
      (res) => {
        console.log(res.data);
        setDataStar(res.data);
      }
    ).catch((error) => {
    });
  }
  const getDataVoucher = () => {
    newRequest.get(`/voucherItem/list/${currentUser.id}?type=store&isExpire=true`, { withCredentials: true }).then(
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
    getDataStar();
  }, []); // Gọi useEffect chỉ một lần khi component được tạo ra
  const handledit = (id) => {
    setIdvoucher(id)
    setOpenedit("edit");
    console.log("xin chao")
  }
  const handdelete = (id) => {
    setIdvoucher(id)
    setOpenedit("delete");
    console.log("xin chao")
  }
  const handlFeedBack = (item) => {
    setDataeview(item)
    setOpenedit("feedback");
    console.log("xin chao")
  }
  const handladd = () => {
    setOpenedit("add");
    console.log("xin chao")
  }
  const handleditstore = () => {
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
                <FontAwesomeIcon className={styles.Edit_StoreInf} icon={faPenToSquare} onClick={handleditstore} />
              </div>
              <div className={styles.StoreManage_Content}>
                <div className={styles.Store_inf}>
                  <h6>Tên cửa hàng</h6>
                  <span>{data.DetailStore?.nameStore}</span>
                </div>
                <div className={styles.Store_inf}>
                  <h6>Logo của cửa hàng</h6>
                  <img style={{ height: "100px", width: "100px" }} src={data.DetailStore?.avatar} alt="" />
                </div>
                <div className={styles.Store_inf}>
                  <h6>Mô tả cửa hàng</h6>
                  <span>{data.DetailStore?.descStore}</span>
                </div>
                <div className={styles.Store_inf}>
                  <h6>Địa chỉ</h6>
                  <span>{data.DetailStore?.address}</span>
                </div>
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
                  Được đánh giá {percentStar}/5
                </div>
                <div onClick={() => getDataStar()}>Tất cả</div>
                <div onClick={() => getByNumStar(1)}>1 sao</div>
                <div onClick={() => getByNumStar(2)}>2 sao</div>
                <div onClick={() => getByNumStar(3)}>3 sao</div>
                <div onClick={() => getByNumStar(4)}>4 sao</div>
                <div onClick={() => getByNumStar(5)}>5 sao</div>
              </div>
              <div>
                <table className={styles.viewrating}>
                  <colgroup>
                    <col width='24%' />
                    <col />
                  </colgroup>
                  <tr>
                  <th>Thông tin Sản phẩm</th>
                    <th>Bình luận của khách hàng</th>
                    <th>Số sao</th>
                    <th>Tên khách hàng đánh giá</th>
                    <th>Phản hồi</th>
                  </tr>
                  {dataStar && dataStar?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.review2.name}</td>
                      <td>{item.desc}</td>
                      <td>{item.num_star}</td>
                      <td>{item.review1?.firstName} {item.review1?.lastName}</td>
                      <td className={styles.icon} onClick={()=>handlFeedBack(item)}><FontAwesomeIcon icon={faReply} /></td>
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
        <Tab eventKey="Mã giảm giá của cửa hàng" title="Mã giảm giá của cửa hàng">
          {currentUser ? (
            <div>
              <div className={styles.StoreManage_Title}>
                Mã giảm giá của cửa hàng
              </div>
              <div className={styles.rating}>
                <div onClick={() => handladd()}>
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
                    <th>Hạn sử dụng</th>
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
                      <td>{item.expiryDate}</td>
                      <td className={styles.icon} onClick={()=>handledit(item)}><FontAwesomeIcon icon={faPenToSquare} /></td>
                      <td className={styles.icon} onClick={()=> handdelete(item)}><FontAwesomeIcon icon={faTrash} /></td>
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
      {openedit === "edit" && <Edit item={idvoucher} setOpenedit={setOpenedit} getDataVoucher={getDataVoucher} />}
      {openedit === "add" && <Add setOpenedit={setOpenedit} id={currentUser.id} />}
      {openedit === "editstore" && <EditStore item={data} setOpenedit={setOpenedit} />}
      {openedit === "feedback" && <Feedback item={datareview} setOpenedit={setOpenedit} getDataStar={getDataStar}/>}
      {openedit === "delete" && <Delete item={idvoucher} setOpenedit={setOpenedit} getDataVoucher={getDataVoucher} />}
    </div >
  );
}
