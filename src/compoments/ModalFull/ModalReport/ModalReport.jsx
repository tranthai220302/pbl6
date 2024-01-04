import React, { Profiler } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ModalReport.module.css'
import { faTrash, faEnvelope, faMobilePhone, faWarehouse, faPenToSquare, faCircleInfo, faSearch, faBell, faAlignCenter, faL, faUser} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import newRequest from '../../../ults/NewRequest';
import { toast } from 'react-toastify';
export default function ModalReport({ showUpdate, handleCloseUpdate, report, getData}) {

    const handleDelete = (id) =>{
        const confirmed = window.confirm('Bạn có muốn xoá báo cáo này không ?');
        if(confirmed){
            try {
                newRequest.delete(`/report/delete/${id}`).then((res)=>{
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, 
                    });
                    getData('')
                }).catch((error)=>{
                    toast.error(error.response.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000, 
                    });
                })
            } catch (error) {
                
            }
        }
    }
  return (
    <>
    <Modal show={showUpdate} onHide={handleCloseUpdate}
            backdrop={false}
            className={styles.cc}
    >
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo của khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={styles.report}>
            {report && report.map((item, i) =>(
            <div className={styles.user_report} key={i}>
                <div className={styles.user_r_desc}>
                    <img src={item.customerReport.avatar} alt="Avatar"  className={styles.avatar_user_report}/>
                    <span className={styles.name_user}>{item.customerReport.firstName} {item.customerReport.lastName}</span>
                </div>
                <div className={styles.report_dec}>
                    <span className={styles.desc}>
                        {item.desc}
                    </span>
                    <div className={styles.date_desc}>{moment(item.createdAt).format("DD-MM-YYYY")}</div>
                </div>
                <FontAwesomeIcon icon={faTrash}  style={{color : 'orange', height : '15px', marginLeft: '20px', cursor: 'pointer'}} onClick={()=>{handleDelete(item.id)}}/>
            </div>
        ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
