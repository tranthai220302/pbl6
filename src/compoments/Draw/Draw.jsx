import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './Draw.module.css'
import newRequest from '../../ults/NewRequest';
const ApexChart = ({store, month, setDataStore, book}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null);
  useEffect(()=>{
    if(store){
      setIsLoading(true)
      newRequest.get(`/order/satistical/${month}`,{
        withCredentials: true
      }).then((res)=>{
        setData(res.data.data)
        setDataStore(res.data.storeA)
        setCategory(res.data.category)
        setIsLoading(false)
        console.log(res.data)
        setError(false)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false)
        console.log(error.response.data)
      })
    }
  },[month])
  useEffect(()=>{
    if(!store && !book){
      setIsLoading(true)
      newRequest.get('/user/userByDate',{
        withCredentials: true
      }).then((res)=>{
        setData(res.data.data)
        setCategory(res.data.date)
        setIsLoading(false)
        setError(false)
        console.log(res.data)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false) 
      })
    }
    if(book){
      setIsLoading(true)
      newRequest.get('/book/bookHigh',{
        withCredentials: true
      }).then((res)=>{
        setData(res.data.data)
        setCategory(res.data.category)
        setIsLoading(false)
        setError(false)
        console.log(res.data)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false) 
        console.log(error)
      })
    }
  },[])
  const [chartData, setChartData] = useState(null);
  useEffect(()=>{
    setChartData({
      series: [
        {
          data : data ? data : []
        },
      ],
      options: {
        chart: {
          type: 'bar',
          events: {
            click: function (chart, w, e) {
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: category ? category : [],
          labels: {
            show: true, 
            style: {
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          title: {
            text: 'Người'
          },
        },
        title: {
          text: book && 'Các sản phẩm bán chạy nhất trong tháng',
          align: 'center',
          floating: true
        },
        toolbar: {
          show: false, 
        },
      },
    })
  }, [data])
  return (
    <div className={styles.chart}>
      {error && (<div>{error}</div>)}
      {isLoading && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {!error && !isLoading && data &&(
          <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={250}
        />
      )}
    </div>
  );
};
  
export default ApexChart;  