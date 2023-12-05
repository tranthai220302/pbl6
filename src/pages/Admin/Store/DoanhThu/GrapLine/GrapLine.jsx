import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import newRequest from '../../../../../ults/NewRequest';
import styles from './GrapLine.module.css'
const GraphLine = ({id, month}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null)
  useEffect(()=>{
    setIsPending(true);
    newRequest.post(`/order/revenue/${id}`, {month : month}, {
    }).then(
      (res) => {
        setData(res.data.data)
        setCategory(res.data.dateTitle)
        setIsPending(false);
        console.log(res.data.data)
      }
    ).catch((error)=>{
      setError(error.response)
      setIsPending(false)
    })
  },[month])
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    setChartData(
      {
        series: [{
          name: "VNĐ",
          data: data ? data : []
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Đơn hàng trong tuần',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], 
              opacity: 0.5
            },
          },
          xaxis: {
            categories: category ? category : []
          }
        },
      }
    )
  }, [data]); 
  return (
    <div id="chart">
      {error && (<div>{error}</div>)}
      {isPending && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {!isPending && data && (
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={330} />
      )}
    </div>
  );
};

export default GraphLine;
