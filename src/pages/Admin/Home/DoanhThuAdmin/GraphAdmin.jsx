import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import seriesData from './cc';
import newRequest from '../../../../ults/NewRequest';
import styles from './GrapAdmin.module.css'
const GraphAdmin = ({month}) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null);
  useEffect(()=>{
      setIsLoading(true)
      newRequest.post('/user/revenuaAdminByMonth',{
        month : month
      },{
      }).then((res)=>{
        setData(res.data.data)
        setCategory(res.data.dateTitle)
        setIsLoading(false)
        setError(false)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false)
      })
  },[month])
  const [chartData, setChartData] = useState();
  useEffect(()=>{
    setChartData({
      series: [
        {
          name: `Doanh thu tháng ${month}`,
          data: data ? data : [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: category ? category : []
        },
        title: {
          text: `Doanh thu tháng ${month}`,
          align: 'bottom'
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    })
  },[data])
  return (
      <div id="chart">
        {
          !error && !isLoading && data && (
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
          )
        }
        {isLoading && (
          <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
        )}
      </div>
    );
  };

export default GraphAdmin;
