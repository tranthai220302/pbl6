import React, {useState} from 'react'
import styles from './ReportPage.module.css'
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCircleInfo, faSearch, faBell, faCheck} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
export default function ReportPage() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);
    const [reports, setReports] = useState(null);
    const [isPendingReport, setIsPendingReport] = useState(null);
    const [errorReport, setErrorReport] = useState(null);
    const getData = ()=>{
        setIsPending(true);
        newRequest.get(`/report/store`, {
        }).then(
          (res) => {
            setData(res.data)
            setIsPending(false);
            setError(false)
            console.log(res.data)
          }
        ).catch((error)=>{
          setError(error.response.data)
          console.log(error.response.data)
          setIsPending(false)
        })
    }
    const handelReport = async (id) =>{
      setIsPendingReport(true);
      newRequest.get(`/report/list/${id}`, {
      }).then(
        (res) => {
          setReports(res.data)
          setIsPendingReport(false);
          setErrorReport(false)
          console.log(res.data)
        }
      ).catch((error)=>{
        setErrorReport(error.response.data)
        console.log(error.response.data)
        setIsPendingReport(false)
      })
    }
    useEffect(()=>{
      getData()
      }, [])
  return (
    <div className={styles.container}>
    <div className={styles.customer}>
          <div className={styles.navbar}>
            <div className={styles.search}>
              <input type="text"className={styles.search_input}  />
              <FontAwesomeIcon icon={faSearch} className={styles.search_icon}/>
            </div>
            <div className={styles.user}>
              <FontAwesomeIcon icon={faBell} className={styles.notify_icon} />
              <img className={styles.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHt1mwK4Kb4YVuHYIO5PUWrvcVgbYaW-Sb3g&usqp=CAU" alt="" />
            </div>
          </div>
          <div className={styles.content}>
        <div className={styles.list}>
        <div className={styles.table1}>
            <table>
            <thead>
            <tr>
                <th>Tên cửa hàng</th>
                <th>Xem báo cáo</th>
            </tr>
            </thead>
            <tbody>
            {!error && data && data?.map((customer) => (
                <tr key={customer.id}>
                <td>{customer.storeByReport.firstName} {customer.storeByReport.lastName}</td>
                <td>
                    <button>
                    <FontAwesomeIcon icon={faCheck} className={styles.user_icon} onClick={()=>handelReport(customer.store_id)} />
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
            {error && (<div className={styles.error}>{error}</div>)}
            {isPending && (
              <div className={styles.bac_img}> <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' /></div>
            )}
        </div>
        </div>
        <div className={styles.report}>
            <h3>Phản ánh của khách hàng</h3>
            {isPendingReport && (
                <div className={styles.bac_img}> <img className={styles.img_loading1} src='https://assets.materialup.com/uploads/ec71c736-9c99-4c75-9fb4-6b263f9717a2/line.gif' /></div>
                )}
                <div className={styles.line}></div>
                {!reports && !isPendingReport && !error && (
                    <img src='https://i.pinimg.com/originals/83/23/61/83236186c07e9ee1d3ac6094209f5cb0.gif' className={styles.img_dog} />
                )}
                {reports && reports.map((item, i) =>(
                    <div className={styles.user_report} key={i}>
                        <div className={styles.user_r_desc}>
                            <img src="https://img.pikbest.com/png-images/qiantu/anime-character-avatar-cute-beautiful-girl-second-element-free-button_2652661.png!bw700" alt="Avatar"  className={styles.avatar_user_report}/>
                            <span className={styles.name_user}>Thai</span>
                        </div>
                        <div className={styles.report_dec}>
                            <span className={styles.desc}>
                                {item.desc}
                            </span>
                            <div className={styles.date_desc}>{moment(item.createdAt).format("DD-MM-YYYY")}</div>
                        </div>
                    </div>
                ))}
                {errorReport && (<div className={styles.error}>{errorReport}</div>)}
        </div>
    </div>
    </div>
    </div>
  )
}
