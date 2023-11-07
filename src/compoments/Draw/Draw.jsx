import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './Draw.module.css'
import newRequest from '../../ults/NewRequest';
const ApexChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null);
  useEffect(()=>{
    setIsLoading(true)
    newRequest.get('/user/userByDate',{
      withCredentials: true
    }).then((res)=>{
      setData(res.data.data)
      setCategory(res.data.date)
      setIsLoading(false)
      setError(false)
    }).catch((error)=>{
      setError(error.response.data)
      setIsLoading(false)
    })
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