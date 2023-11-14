import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './DrawnLine.module.css'
import newRequest from '../../ults/NewRequest';

const DrawLine = ({run}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null);
  useEffect(()=>{
      setIsLoading(true)
      newRequest.get(`/review/list/star`,{
        withCredentials: true
      }).then((res)=>{
        setData(res.data.data)
        setCategory(res.data.category)
        setIsLoading(false)
        console.log(res.data)
        setError(false)
      }).catch((error)=>{
        setError(error.response.data)
        setIsLoading(false)
        console.log(error.response.data)
      })
  }, [run])
  const [chartData, setChartData] = useState(null);
  useEffect(()=>{
    setChartData(
      {
        series: [{
         data : data ? data : []
        }],
        options: {
          chart: {
            type: 'bar',
            height: 380
          },
          plotOptions: {
            bar: {
              barHeight: '100%',
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
          colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
          ],
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
              colors: ['#fff']
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          xaxis: {
            categories: category ? category : [],
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          title: {
            text: 'Các sản phẩm được đánh giá 5* trong tháng',
            align: 'center',
            floating: true
          },
          subtitle: {
            text: 'Lượt đánh giá 5*',
            align: 'center',
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function () {
                  return ''
                }
              }
            }
          }
        },
      }
    )
  },[data])

  return (
    <div className={styles.chart}>
      {error && (<div>{error}</div>)}
      {isLoading && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {!error && !isLoading && data &&(
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={380} />
      )}
    </div>
  );
};
export default DrawLine;
