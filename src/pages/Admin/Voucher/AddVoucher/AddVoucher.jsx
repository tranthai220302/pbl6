import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './AddVoucher.module.css'
import { upload } from '@testing-library/user-event/dist/upload';
import uploadImg from '../../../../ults/upload';
import newRequest from '../../../../ults/NewRequest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddVoucher({id, idVoucher, getData}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [voucherInfo, setVoucherInfo] = useState({
    name: '',
    discountType: 'amount',
    discountValue: '',
    codition: '',
    expiryDate: '',
    quantity: '',
    VoucherId : idVoucher 
  });
  const [file, setFile] = useState('')
  const handleSetFilterVoucher = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name)
    console.log(value)
    setVoucherInfo((prev)=>(
      {
        ...prev,
        [name]: name === 'codition' ? parseInt(value, 10) : name === 'discountValue' ? parseInt(value, 10): name === 'quantity' ? parseInt(value, 10) : value,
      }
    ))
  }
  const handleCreateVoucher = () => {
    const requiredFields = ['name', 'discountType', 'codition', 'discountValue', 'quantity', 'expiryDate'];

    const isFormValid = requiredFields.every((field) => {
      return voucherInfo[field] !== '';
    });

    if (isFormValid) {
      setIsPending(true);
      newRequest
        .post(`/voucherItem/create/${id}`, voucherInfo, {})
        .then((res) => {
          getData('');
          toast.success('Xác nhận thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setIsPending(false);
          setError(false);
          handleClose()
        })
        .catch((error) => {
          setError(error.response.data);
          setIsPending(false);
          toast.error(error.response.data, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        });
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <button onClick={handleShow} className={styles.btn}>Thêm Voucher</button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin Voucher FreeShip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isPending && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={450} />)}
        <div className={styles.container}>
            <div className={styles.item}>
                <span className={styles.name_item}>Name</span>
                <input type="text" className={styles.input_item} placeholder='Nhập name voucher' name='name' onChange={(e)=>handleSetFilterVoucher(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Loại</span>
                <select className={styles.input_item} name='discountType' onChange={(e)=>handleSetFilterVoucher(e)}>
                        <option value="amount">amount</option>
                        <option value="percent">percent</option>
                </select>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Điều kiện đơn hàng lớn hơn</span>
                <input type="text" className={styles.input_item} placeholder='Nhập điều kiện voucher' name= 'codition' onChange={(e)=>handleSetFilterVoucher(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Giảm giá</span>
                <input type="text" className={styles.input_item} placeholder='Nhập giảm giá voucher' name = 'discountValue' onChange={(e)=>handleSetFilterVoucher(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Số lượng</span>
                <input type="text" className={styles.input_item} placeholder='Nhập số lượng voucher' name = 'quantity' onChange={(e)=>handleSetFilterVoucher(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Ngày hết hạn</span>
                <input type="date" className={styles.input_item} placeholder='Nhập ngày voucher hết hạn' name='expiryDate' onChange={(e)=>handleSetFilterVoucher(e)} required/>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>handleCreateVoucher()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default AddVoucher;