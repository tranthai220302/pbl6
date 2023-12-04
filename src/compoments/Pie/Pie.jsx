import React, { useState} from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import newRequest from '../../ults/NewRequest';
import styles from './Pie.module.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Pie= ({admin, month}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null);
  useEffect(()=>{
    if(!admin){
      setIsLoading(true)
      newRequest.get('/user/userByAge',{
      }).then((res)=>{
        setData(res.data.data)
        setCategory(res.data.category)
        setIsLoading(false)
        setError(false)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false)
      })
    }
  },[])
  useEffect(()=>{
    if(admin){
      setIsLoading(true)
      newRequest.get(`/order/draw/${month}`,{
      }).then((res)=>{
        setData(res.data.store  )
        console.log(res.data)
        setCategory(res.data.category)
        setIsLoading(false)
        setError(false)
      }).catch((error)=>{
        setError(error.response)
        setIsLoading(false)
      })
    }
  },[month])
  const [chartData, setChartData] = useState(null);
  useEffect(()=>{
    setChartData({
      series: data ? data : [],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: category ? category : [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    })
  }, [data])

  return (
    <div className={styles.chart}>
      {error && (<div>{error}</div>)}
      {isLoading && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {!error && !isLoading && data &&(
        <div className={styles.pie}>
          <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380}/>
        </div>
      )}
    </div>
  );
};

export default Pie;
