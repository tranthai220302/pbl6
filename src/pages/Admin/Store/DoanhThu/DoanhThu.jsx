import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './DoanhThu.module.css'
import GraphDoanhThu from './GraphDoanhThu/GraphDoanhThu';
import GraphLine from './GrapLine/GrapLine';
import GraphPie from './GrapPie/GrapPie';
import newRequest from '../../../../ults/NewRequest';
function DoanhThu({showExmaple, showCloseExample, id}) {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth()+1)
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null)
    useEffect(()=>{
      setIsPending(true);
      newRequest.get(`/book/bookIsOrder/${id}/1`, {
      }).then(
        (res) => {
          setData(res.data.data)
          console.log(res.data.data)
          setCategory(res.data.nameBook)
          setIsPending(false);
          console.log(res.data.data)
        }
      ).catch((error)=>{
        setError(error.response)
        setIsPending(false)
      })
    },[])
    const handle = (e) =>{
        if(e.key === 'Enter'){
            setMonth(e.target.value)
        }
    }
  return (
    <>
      <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
        <Modal.Header closeButton>
          <Modal.Title>
            Doanh thu cửa hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
            <div className={styles.container}>
                <div className={styles.garph}>
                    <div className={styles.up}>
                        <input type="text" placeholder='Nhập tháng ...' className={styles.search} onKeyPress={(e) => {handle(e)}}/>
                        <GraphLine id = {id} month={month} />
                    </div>
                    <div className={styles.down}>
                        <div className={styles.left}>
                            <GraphDoanhThu id = {id} />
                        </div>
                        <div className={styles.right}>
                            <GraphPie id = {id} />
                        </div>
                    </div>
                </div>
                <div className={styles.product}>
                    <span className={styles.title}>Các sản phẩm bán chạy</span>
                    <div className={styles.table1}>
                        <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lượt mua</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!error && data && data.map((product, i) => (
                            <tr key={i}>
                            <td>{category[i]}</td>
                            <td>{product}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                        {isPending && (
                        <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                        )}
                        {error && (<div className={styles.error}>{error}</div>)}
                    </div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DoanhThu;