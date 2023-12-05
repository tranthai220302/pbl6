import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import newRequest from '../../../../../ults/NewRequest';
import styles from './GrapPie.module.css'
const GraphPie = ({id}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null)
  useEffect(()=>{
    setIsPending(true);
    newRequest.get(`/book/bookIsOrder/${id}/0`, {
    }).then(
      (res) => {
        setData(res.data.data)
        setCategory(res.data.nameBook)
        setIsPending(false);
      }
    ).catch((error)=>{
      setError(error.response)
      setIsPending(false)
    })
  },[id])
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
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
                title: 'Biểu đồ sách đã được bán đi trong tháng',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    })
  }, [data]);
  

  return (
    <div className={styles.chart}>
      <span className={styles.name_draw}>Sách được bán đi trong tháng</span>
      {error && (<div>{error}</div>)}
      {isPending && (<img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />)}
      {data && (
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height={320} />
      )}
    </div>
  );
};

export default GraphPie;
