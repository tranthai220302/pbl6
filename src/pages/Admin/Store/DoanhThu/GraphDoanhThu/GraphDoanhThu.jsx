import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './GrapDoanhThu.module.css'
import newRequest from '../../../../../ults/NewRequest';
const GraphDoanhThu = ({id}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null)
  useEffect(()=>{
    setIsPending(true);
    newRequest.get(`/order/numOrder7date/${id}`, {
    }).then(
      (res) => {
        console.log(res.data.data)
        setData(res.data.data)
        setCategory(res.data.dateTitle)
        setIsPending(false);
      }
    ).catch((error)=>{
      setError(error.response.dateTitle)
      setIsPending(false)
    })
  },[id])
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData({
      series: [{
        name: 'Đơn',
        data: data ? data : []
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },  
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: category ? category : [],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            }
          }
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
    })
  }, [data]); 

  return (
    <div className={styles.chart}>
      <span className={styles.name_draw}>Đơn hàng trong 7 ngày qua</span>
      {error && (<div>{error}</div>)}
      {isPending && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {data && (
        <div className={styles.cc}>
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={260} />
        </div>
      )}
    </div>
  );
};

export default GraphDoanhThu;
