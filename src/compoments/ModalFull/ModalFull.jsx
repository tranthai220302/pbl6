import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalFull.module.css'
import { useEffect } from 'react';
import newRequest from '../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalCustomer from '../Modal/Modal';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import { faTrash, faPenToSquare, faCircleInfo, faSearch} from '@fortawesome/free-solid-svg-icons';

function Example({showExmaple, showCloseExample, id}) {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [selectProduct, setSelectProduct] = useState(null);
  const [selectProductUpdate, setSelectProductUpdate] = useState(null)
  const getData = (name) =>{
    newRequest.get(`/book/store/${id}?name=${name}`, {
        withCredentials: true
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
        setIsPending(false);
        setError(false)
      })
      .catch((error) => {
        setError(error.response.data)
        setIsPending(false)
      });
  }
  const handleDeleteClick = (id) =>{
    const confirmed = window.confirm('Bạn có muốn xoá sẩn phẩm này không ?');
  
    if (confirmed) {
        newRequest.delete(`/book/delete/${id}`, {
          withCredentials: true
        })
        .then((res) => {
            getData('')
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error)
          setIsPending(false);
        });
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getData(name);
    }
  };
  useEffect(()=>{
    getData('');
  },[])
  return (
    <>
      <Modal show={showExmaple} fullscreen={true} onHide={showCloseExample}>
        <Modal.Header closeButton>
          <Modal.Title>
            <input 
                type="text" 
                placeholder='Nhập tên sách' 
                className={styles.search} 
                onKeyPress={handleKeyPress}
                onChange={(e) =>{setName(e.target.value)}}
            />
            <FontAwesomeIcon icon={faSearch} className={styles.user_icon}  />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
        <div className={styles.table1}>
                <table>
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Name</th>
                    <th>Nội dung</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Xoá</th>
                    <th>Chỉnh sửa</th>
                    <th>Xem </th>
                  </tr>
                </thead>
                <tbody>
                  {!error && data && data.map((product) => (
                    <tr key={product.id}>
                      {selectProduct && (
                        <ModalCustomer customer={null} show={true} handleClose={() => setSelectProduct(null)} product={selectProduct}/>
                      )}
                      {selectProductUpdate && (
                        <ModalUpdate product={selectProductUpdate} showUpdate={true} handleCloseUpdate={() => setSelectProductUpdate(null)} getData={getData} />
                      )}
                      <td>
                        <img src={product.Images[0].filename} alt="Avatar" width="50" height="50" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.desc}</td>
                      <td className={styles.price}>{product.price}đ</td>
                      <td>{product.sales_number}</td>
                      <td>{product.Author.name}</td>
                      <td>{product.Categories.map((item)=>(
                        <span>{item.name} <br></br></span> 
                      ))}</td>
                      <td>
                        <button>
                        <FontAwesomeIcon icon={faTrash} className={styles.user_icon} onClick={()=>{handleDeleteClick(product.id)}} />
                        </button>
                      </td>
                      <td>
                        <button><FontAwesomeIcon icon={faCircleInfo} className={styles.user_icon} 
                            onClick={()=>setSelectProductUpdate(product)}
                        />
                        </button>
                      </td>
                      <td>
                        <button><FontAwesomeIcon icon={faPenToSquare} className={styles.user_icon} 
                        onClick={()=>setSelectProduct(product)}
                        /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                {isPending && (
                  <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
                )}
                {error && (<div className={styles.error}>{error}</div>)}
              </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;