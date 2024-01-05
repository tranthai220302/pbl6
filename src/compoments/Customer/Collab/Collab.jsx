import React, { useState } from 'react'
import styles from './Collab.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleCheck, faTableList, faTicket, faLink, faKey} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DieuKhoan from '../../DieuKhoan/DieuKhoan';
import { toast } from 'react-toastify';
import uploadImg from '../../../ults/upload';
import newRequest from '../../../ults/NewRequest';
export default function Collab() {
    const [checkbox, setCheckBox] = useState(null)
    const [isStoreFormVisible, setStoreFormVisibility] = useState(false);
    const [open, setOpen] = useState(null)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedImageUrl1, setSelectedImageUrl1] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [clickShipper, setClickShipper] = useState(false);
    const [d, setD] = useState({
        drivingLience: "",
        numMobike: "",
    })
    const [body, setBody] = useState({
        nameStore : '',
        descStore : '',
        img : '',
        papers: '',
        address : currentUser?.address
    })
    const changeInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setBody((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const changeInput1 = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setD((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const imagesUrl = async(file) =>{
        console.log(file)
        try {
          const url = await uploadImg(file); 
          return url;
        } catch (err) {
            console.log(err)
        }
      }
    const registerStore = async() =>{
        setIsPending(true)
        const img1 = await imagesUrl(selectedFile);
        const img2 = await imagesUrl(selectedFile1)
        setBody((prev)=>({
            ...prev,
            img : img1,
            papers : img2
        }))
        console.log(body)
        newRequest.post('/user/openStore', body)
        .then((res)=>{
            console.log(res.data)
            toast.success('Chúng tôi sẽ thông báo qua email của bạn!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false)
            setStoreFormVisibility(false);
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            console.log(error)
            setIsPending(false)
        })
    }
    const registerShipper = async() =>{
        setIsPending(true)
        const img1 = await imagesUrl(selectedFile);
        setD((prev)=>({
            ...prev,
            img : img1,
        }))
        console.log(body)
        newRequest.post('/user/registerShipper', body)
        .then((res)=>{
            console.log(res.data)
            toast.success('Chúng tôi sẽ thông báo qua email của bạn!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            console.log(res.data)
            setIsPending(false)
            setStoreFormVisibility(false);
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            console.log(error)
            setIsPending(false)
        })
    }
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
      const handleFileChange1 = (e) => {
        const file = e.target.files[0];
        setSelectedFile1(file)
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImageUrl1(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleCancle1 = () =>{
        setSelectedImageUrl1(null)
      }
    const showStoreForm = () => {
      if(!checkbox){
        toast.error('Vui lòng xem qua điều khoản', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
          });
      }else{
        setStoreFormVisibility(true);
      }
    };

    const hideStoreForm = () => {
        setStoreFormVisibility(false);
    }

    const [isRegistered, setRegistered] = useState(false);

    const handleRegistration = () => {
      // Thực hiện các bước đăng ký ở đây
      // Ví dụ: Gọi API đăng ký, xử lý form, vv.
  
      // Sau khi đăng ký thành công, hiển thị thông báo
      setRegistered(true);
  
      // Tạm thời ẩn thông báo sau 3 giây (có thể điều chỉnh theo nhu cầu)
      setTimeout(() => {
        setRegistered(false);
      }, 3000);
    };

    return (
        <div className={styles.Collab}>
            <div className={styles.Collab_Title}>
                Hợp tác với Harumi
            </div>
            {open && (
                <DieuKhoan showExmaple={true} showCloseExample={()=>setOpen(null)} setCheckBox = {setCheckBox} checkbox = {checkbox}/>
            )}
            <table className={styles.Collab_Content}>
                <colgroup>
                    <col width='50%'/>
                    <col width='50%'/>
                </colgroup>
                <td >
                    <th>Điều khoản hợp tác với tư cách người bán:</th>
                    <tr>
                        <span onClick={()=>setOpen(true)}>Xem điều khoản nè</span>
                    </tr>
                    <tr className={styles.btn}>
                        <button onClick={showStoreForm}>Đăng ký người bán</button>
                    </tr>
                </td>
                <td style={{display: 'flex', flexDirection : 'column', alignItems : 'center'}}>
                    <th>Điều khoản hợp tác với tư cách là shipper:</th>
                    <tr>
                        <span>Đây là điều khoản nè</span>
                    </tr>
                    <tr className={styles.btn}>
                        <button onClick={()=>setClickShipper(true)}>Đăng ký shipper</button>
                    </tr>
                </td>
            </table>
            {clickShipper && (
                <div className={styles.overlay}>
                    <div className={styles.registerStoreForm}>
                        <div className= {styles.btnClose_space}>
                            <FontAwesomeIcon className={styles.btnClose_icon} icon={faXmark} onClick={()=>{setClickShipper(false)}}/>
                        </div>
                        <h3>Đăng ký trở thành người bán hàng</h3>
                        <label htmlFor="">Bằng lái xe </label>
                        <input type="text" name="drivingLience" id="" onChange={(e)=>{changeInput1(e)}}/>
                        <label htmlFor="">Biển số xe </label>
                        <input type="text" name="numMobike" id="" defaultValue={currentUser.address} onChange={(e)=>{changeInput1(e)}}/>
                        <div style={{display : 'flex', justifyContent : 'space-around', marginTop : '20px', marginBottom: '20px'}}>
                        <div className={styles.file_img}>
                        <label htmlFor="fileInput">
                            Ảnh bằng lái xe
                            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
                        </label>
                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                        </div>
                        <div style={{display : 'flex', gap : '20px', marginBottom : '10px'}}>
                        {selectedImageUrl && (
                            <div className={styles.img_local}>
                                <div className={styles.img_img2}>
                                <div className={styles.cancel} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                                    <img
                                    src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                                    alt="Choose file"
                                    className={styles.img_img1}
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                        <button onClick={()=>{registerShipper()}}>
                            Đăng ký
                        </button>
                        {isPending && (
                            <img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' className={styles.img_load} />
                        )}
                    </div>
                </div>
            )}
            {/* Hiển thị form edit khi trạng thái là true */}
            {isStoreFormVisible && (
                <div className={styles.overlay}>
                    <div className={styles.registerStoreForm}>
                        <div className= {styles.btnClose_space}>
                            <FontAwesomeIcon className={styles.btnClose_icon} icon={faXmark} onClick={hideStoreForm}/>
                        </div>
                        <h3>Đăng ký trở thành người bán</h3>
                        <label htmlFor="">Tên cửa hàng: </label>
                        <input type="text" name="nameStore" id="" onChange={(e)=>{changeInput(e)}}/>
                        <label htmlFor="">Địa chỉ lấy hàng: </label>
                        <input type="text" name="address" id="" defaultValue={currentUser.address} onChange={(e)=>{changeInput(e)}}/>
                        <label htmlFor="editName">Mô tả qua cửa hàng: </label>
                        <textarea name="descStore" id="" cols="30" rows="5" onChange={(e)=>{changeInput(e)}}></textarea>
                        <div style={{display : 'flex', justifyContent : 'space-around', marginTop : '20px', marginBottom: '20px'}}>
                        <div className={styles.file_img}>
                        <label htmlFor="fileInput">
                            Ảnh cửa hàng
                            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
                        </label>
                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                        </div>
                        <div className={styles.file_img}>
                        <label htmlFor="fileInput1">
                            Giấy tờ kinh doanh: 
                            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
                        </label>
                        <input type="file" id="fileInput1" style={{ display: 'none' }} onChange={handleFileChange1} />
                        </div>
                        </div>
                        <div style={{display : 'flex', gap : '20px', marginBottom : '10px'}}>
                        {selectedImageUrl && (
                            <div className={styles.img_local}>
                                <div className={styles.img_img2}>
                                <div className={styles.cancel} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                                    <img
                                    src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                                    alt="Choose file"
                                    className={styles.img_img1}
                                    />
                                </div>
                            </div>
                        )}
                        {selectedImageUrl1 && (
                            <div className={styles.img_local}>
                                <div className={styles.img_img2}>
                                <div className={styles.cancel} onClick={()=>{handleCancle1()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                                    <img
                                    src={selectedImageUrl1 || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                                    alt="Choose file"
                                    className={styles.img_img1}
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                        <button onClick={()=>{registerStore()}}>
                            Đăng ký
                        </button>
                        {isPending && (
                            <img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' className={styles.img_load} />
                        )}
                    </div>
                </div>
            )}
            {isRegistered && (
                <div className={styles.success_message}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                    <p className={styles.message}>Đăng ký thành công!</p>
                </div>
            )}
        </div>
    )
}