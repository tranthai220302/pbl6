import React, { useState } from 'react'
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu'
import styles from './HomeAdmin.module.css'
import { useEffect } from 'react'
import BodyAdmin from '../../../compoments/BodyAdmin/BodyAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import GraphAdmin from './DoanhThuAdmin/GraphAdmin'
import UserChart from './User/GrapUser'
export default function HomeAdmin() {
    const [open, setOpen] = useState(true)
  return (
    <div class={styles.container}>
      <div className={styles.customer}>
        <div className={styles.navbar}>
            <div className={styles.search}>
              <input type="text"className={styles.search_input} />
              <FontAwesomeIcon icon={faSearch} className={styles.search_icon}  />
            </div>
            <div className={styles.user}>
              <FontAwesomeIcon icon={faBell} className={styles.notify_icon} />
              <img className={styles.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHt1mwK4Kb4YVuHYIO5PUWrvcVgbYaW-Sb3g&usqp=CAU" alt="" />
            </div>
          </div>
          <div className={styles.content}>
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
                  <span className={styles.num_num}>10000</span>
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
                  <span className={styles.num_num}>10000</span>
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
                  <span className={styles.num_num}>10000</span>
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
                  <span className={styles.num_num}>100001</span>
                </div>
              </div>
            </div>
            <div className={styles.charts}>
              <div className={styles.admin}>
                <GraphAdmin />  
              </div>
              <div className={styles.user}>
                <UserChart />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
