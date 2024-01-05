import React, {useState, useEffect} from 'react'
import styles from './Profile.module.css'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import newRequest from '../../../ults/NewRequest'
export default function ProfileAdmin() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [data, setData] = useState({});
    const [isPending, setIsPending] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
          navigate("/login");
        } else {
          setCurrentUser(
            JSON.parse(
              localStorage.getItem('currentUser')
            )
          );
        }
      }, []);
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
      console.log(currentUser)
  return (
    <div className={styles.container}>
    <div className={styles.addCustomer}>
      <NavbarAdmin isNoSearch = {true}/>
      {
        currentUser && (
        <div className={styles.content} style={{ position: 'relative', overflow: 'hidden' }}>
            <div className={styles.avatar}>
                <img src={currentUser.avatar ? currentUser.avatar : selectedImageUrl ? selectedImageUrl : "https://t3.ftcdn.net/jpg/01/99/95/36/360_F_199953658_lzMYuyHVYFiMynfiMU8ZXquUC3crgUtH.jpg"} alt="" />
                <label htmlFor="fileInput1">
                    <FontAwesomeIcon icon={faPlusCircle} className={styles.icon}/>       
                </label>
                <input type="file" id="fileInput1" style={{ display: 'none' }}  onChange={handleFileChange}/>
            </div>
            <div className={styles.item_item1}>
                    <span>Vai trò</span>
                    <input type="text" placeholder='Nhập tài khoản' name = 'username' value="Admin" />
            </div>
            <div className={styles.item}>
                <div className={styles.item_item}>
                    <span>Email</span>
                    <input type="email" placeholder='Nhập email' name = 'email' value={currentUser.email}/>
                </div>
                <div className={styles.item_item}>
                    <span>Địa chỉ</span>
                    <input type="text" placeholder='Nhập địa chỉ' name = 'address' value={currentUser.address}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_item}>
                    <span>Họ</span>
                    <input type="text" placeholder='Nhập họ' name = 'firstName' value={currentUser.firstName}/>
                </div>
                <div className={styles.item_item}>
                    <span>Tên</span>
                    <input type="text" placeholder='Nhập tên' name = 'lastName' value={currentUser.lastName}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_item}>
                    <span>Tuổi</span>
                    <input type="text" placeholder='Nhập tuổi' name = 'age' value={currentUser.age}/>
                </div>
                <div className={styles.item_item}>
                    <span>Số điện thoại</span>
                    <input type="text" placeholder='Nhập số điện thoại' name = 'phone' value={"0" + currentUser.phone}/>
                </div>
            </div>
            <Button>Chỉnh sửa</Button>
          </div>
        )
      }
    </div>
  </div>
  )
}
