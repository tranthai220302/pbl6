import React, { useEffect, useState } from 'react';
import styles from './Statistical.module.css';
import { Link } from 'react-router-dom';
import Chart from '../Chart/Chart';
import newRequest from '../../../ults/NewRequest';

export default function MyProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [data, setData] = useState({
    data: Array(30).fill(0),
    dateTitle: Array.from({ length: 30 }, (_, index) => (index + 1).toString()),
  });

  const [datarevenue, setDatarevenue] = useState([]);
  const [dataOrderfailed, setDataOrderfailed] = useState([]);
  const [dataOrdersuccess, setDataOrdersuccess] = useState([]);
  const [month, setMonth] = useState('1');

  const fetchData = (endpoint, setter) => {
    newRequest.post(endpoint, {}, { withCredentials: true })
      .then((res) => {
        console.log('Successfully fetched data:', res.data);
        setter(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getRevenue = () => {
    fetchData(`/shippemt/revenueShipper/${month}`, setDatarevenue);
  };

  const getOrdersuccess = () => {
    fetchData(`/shippemt/orderSucessfull/${month}`, setDataOrdersuccess);
  };

  const getOrderfailed = () => {
    fetchData(`/shippemt/orderFailed/${month}`, setDataOrderfailed);
  };

  useEffect(() => {
    getOrdersuccess();
    getOrderfailed();
    getRevenue();
  }, [month]);

  useEffect(() => {
    console.log(dataOrdersuccess)
    if (dataOrdersuccess.length !== 0) {
        setData(dataOrdersuccess);
      }
  }, [dataOrdersuccess]);

  const handleChange = (data) => {
    setData(data);
  };

  const Change = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className={styles.MyProfile}>
      {currentUser ? (
        <div>
          <div className={styles.MyProfile_Title}>Thống kê</div>
          <div className={styles.rating}>
            <div onClick={() => { handleChange(dataOrdersuccess); }}>Đơn thành công : {dataOrdersuccess.total}</div>
            <div onClick={() => { handleChange(dataOrderfailed); }}>Đơn thất bại : {dataOrderfailed.total}</div>
            <div onClick={() => { handleChange(datarevenue); }}>Doanh thu : {datarevenue.total}</div>
            <div>
              <select name="" id="" onChange={(e) => Change(e)}>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={(index + 1).toString()}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Chart data={data?.data} dateTitle={data?.dateTitle} />
          </div>
          <div className={styles.MyProfile_Content}></div>
        </div>
      ) : (
        <div className={styles.notlogin}>
          <span className={styles.Notification}>Bạn cần đăng nhập để truy cập!</span>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
    </div>
  );
}
