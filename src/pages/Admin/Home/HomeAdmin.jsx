import React, { useState } from 'react'
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu'
import styles from './HomeAdmin.module.css'
import { useEffect } from 'react'
import BodyAdmin from '../../../compoments/BodyAdmin/BodyAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import GraphAdmin from './DoanhThuAdmin/GraphAdmin'
import UserChart from './User/GrapUser'
import newRequest from '../../../ults/NewRequest'
import { Navbar } from 'react-bootstrap'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'
export default function HomeAdmin() {
    const [open, setOpen] = useState(true)
    const [number, setNumber] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [year, setYear] = useState(2024)
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth() + 1)
    useEffect(()=>{
        setIsLoading(true)
        newRequest.get('/user/number',{
        }).then((res)=>{
          setNumber(res.data)
          console.log(res.data)
          setIsLoading(false)
          setError(false)
        }).catch((error)=>{
          setError(error.response.data)
          setIsLoading(false)
        })
    },[])
    const handleSearch = (e) =>{
      if(e.key == 'Enter'){
        console.log('cc')
        setMonth(e.target.value)
      }
    }
  return (
    <div className={styles.container}>
      <div className={styles.customer}>
        <NavbarAdmin isNoSearch={true} />
          {isLoading ? (
             <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
          ):(
            <div className={styles.content}>
              {number && (
                  <div className={styles.number}>
                  <div className={styles.number_item}>
                    <div className={styles.icon}>
                      <img src='https://icon-library.com/images/customers-icon/customers-icon-16.jpg' alt='avatr' className={styles.img} />
                    </div>
                    <div className={styles.number_body}>
                      <span className={styles.title}>
                      <FontAwesomeIcon icon={faArrowUp} className={styles.ff}  />
                        Khách hàng
                      </span>
                      <span className={styles.num_num}>{number.customer}</span>
                    </div>
                  </div>
                  <div className={styles.number_item}>
                    <div className={styles.icon}>
                      <img src='https://images.freeimages.com/365/images/previews/3b6/small-store-icon-psd-53185.jpg' alt='avatr' className={styles.img} />
                    </div>
                    <div className={styles.number_body}>
                      <span className={styles.title}>
                      <FontAwesomeIcon icon={faArrowUp} className={styles.ff}  />
                        Cửa hàng
                      </span>
                      <span className={styles.num_num}>{number.store}</span>
                    </div>
                  </div>
                  <div className={styles.number_item}>
                    <div className={styles.icon}>
                      <img src='https://cdn-icons-png.flaticon.com/512/6947/6947616.png' alt='avatr' className={styles.img} />
                    </div>
                    <div className={styles.number_body}>
                      <span className={styles.title}>
                      <FontAwesomeIcon icon={faArrowUp} className={styles.ff}  />
                        Shipper
                      </span>
                      <span className={styles.num_num}>{number.shipper}</span>
                    </div>
                  </div>
                  <div className={styles.number_item}>
                    <div className={styles.icon}>
                      <img src='https://w7.pngwing.com/pngs/49/802/png-transparent-computer-icons-book-cover-symbol-book-blue-angle-text-thumbnail.png' alt='avatr' className={styles.img} />
                    </div>
                    <div className={styles.number_body}>
                      <span className={styles.title}>
                      <FontAwesomeIcon icon={faArrowUp} className={styles.ff}  />
                        Sản phẩm
                      </span>
                      <span className={styles.num_num}>{number.book}</span>
                    </div>
                  </div>
                </div>
              )}
            <div className={styles.charts}>
              <div className={styles.admin}>
                <div>
                <input type="text" name="" id="" placeholder='Nhập mm/yyyy' onKeyPress={(e) =>{handleSearch(e)}} className={styles.input_month}/>
                </div>
                <GraphAdmin month={month} />  
              </div>
            </div>
          </div>
          )}
      </div>
    </div>
  )
}
