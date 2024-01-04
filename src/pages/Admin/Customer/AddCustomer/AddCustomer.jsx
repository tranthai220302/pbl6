import React, {useState} from 'react'
import styles from './AddCustomer.module.css'
import NavbarAdmin from '../../NavbarAdmin/NavbarAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import uploadImg from '../../../../ults/upload'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import newRequest from '../../../../ults/NewRequest'
export default function AddCustomer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [data, setData] = useState({});
    const [isPending, setIsPending] = useState(null);
    const imagesUrl = async(file) =>{
        console.log(file)
        try {
          const url = await uploadImg(file); 
          return url;
        } catch (err) {
            console.log(err)
        }
      }
    const handleChang = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
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
    const createUser = async () =>{
        setIsPending(true);
        const img = await imagesUrl(selectedFile);
        const da = data;
        da.avatar = img
        console.log(da)
        newRequest.post('/auth/register', da).then((res)=>{
            toast.success('Thêm người dùng thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false)
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false)
        })
    }
  return (
    <div className={styles.container}>
    <div className={styles.addCustomer}>
      <NavbarAdmin isNoSearch = {true}/>
      <div className={styles.content} style={{ position: 'relative', overflow: 'hidden' }}>
        {isPending && (
                    <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
            )}
        <div className={styles.avatar}>
            <img src={selectedImageUrl ? selectedImageUrl : "https://t3.ftcdn.net/jpg/01/99/95/36/360_F_199953658_lzMYuyHVYFiMynfiMU8ZXquUC3crgUtH.jpg"} alt="" />
            <label htmlFor="fileInput1">
                <FontAwesomeIcon icon={faPlusCircle} className={styles.icon}/>       
            </label>
            <input type="file" id="fileInput1" style={{ display: 'none' }}  onChange={handleFileChange}/>
        </div>
        <div className={styles.item_item1}>
                <span>Tài khoản</span>
                <input type="text" placeholder='Nhập tài khoản' name = 'username' onChange={(e)=>{handleChang(e)}}/>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Mật khẩu</span>
                <input type="password" placeholder='Nhập mật khẩu' name = 'password'onChange={(e)=>{handleChang(e)}}/>
            </div>
            <div className={styles.item_item}>
                <span>Nhập lại mật khẩu</span>
                <input type="password" placeholder='Nhập mật khẩu' name = 'confirmPassword'onChange={(e)=>{handleChang(e)}}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Email</span>
                <input type="email" placeholder='Nhập email' name = 'email'onChange={(e)=>{handleChang(e)}}/>
            </div>
            <div className={styles.item_item}>
                <span>Địa chỉ</span>
                <input type="text" placeholder='Nhập địa chỉ' name = 'address'onChange={(e)=>{handleChang(e)}}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Họ</span>
                <input type="text" placeholder='Nhập họ' name = 'firstName'onChange={(e)=>{handleChang(e)}}/>
            </div>
            <div className={styles.item_item}>
                <span>Tên</span>
                <input type="text" placeholder='Nhập tên' name = 'lastName'onChange={(e)=>{handleChang(e)}}/>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.item_item}>
                <span>Tuổi</span>
                <input type="text" placeholder='Nhập tuổi' name = 'age'onChange={(e)=>{handleChang(e)}}/>
            </div>
            <div className={styles.item_item}>
                <span>Số điện thoại</span>
                <input type="text" placeholder='Nhập số điện thoại' name = 'phone'onChange={(e)=>{handleChang(e)}}/>
            </div>
        </div>
        <Button onClick={()=>{createUser()}}>Thêm</Button>
      </div>
    </div>
  </div>
  )
}
