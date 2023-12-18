import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './AddBook.module.css'
import { upload } from '@testing-library/user-event/dist/upload';
import uploadImg from '../../../../ults/upload';
import newRequest from '../../../../ults/NewRequest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddBook({id,  getData}) {
  const [show, setShow] = useState(false);
  // const [error, setError] = useState(null);
  const [isPendingCate, setIsPendingCate] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [author, setAuthor] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [file, setFile] = useState([]);
  const [bookInfo, setBookInfo] = useState({
    name: '',
    desc: '',
    price: '',
    publication_date: '',
    sales_number: '',
    author_id: '',
    store_id: id,
    nhaXB: '',
    languages: '',
    weight: 0,
    size: '',
    numPage: 0,
    percentDiscount: 0,
  });
  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
      setSelectedCategories(updatedCategories);
    }
  };
  const handleSetFilterBook = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setBookInfo((prev)=>(
      {
        ...prev,
        [name]: name === 'sales_number' ? parseInt(value, 10) : name === 'author_id' ? parseInt(value, 10): name == 'price' ?  parseInt(value, 10) :  name === 'numPage' ? parseInt(value, 10) : name === 'percentDiscount' ? parseInt(value, 10)/100 : value ,
      }
    ))
  }
  const imagesUrl = async() =>{
    console.log(file)
    try {
      const img = []
      for (let i = 0; i < file.length; i++) {
          const url = await uploadImg(file[i]); 
          img.push(url)
      }
      return img;
    } catch (err) {
        console.log(err)
    }
  }
  const handleCreateBook = async() => {
    setIsPending(true)
    const requiredFields = ['name', 'desc', 'price', 'publication_date', 'sales_number', 'author_id', 'categorys', 'nhaXB', 'percentDiscount', 'languages', 'size', 'weight', 'numPage'];

    const isFormValid = requiredFields.every((field) => {
      return bookInfo[field] !== '';
    });
    const imgUrl = await imagesUrl();
    console.log(imgUrl)
    console.log(selectedCategories)
    const bookPost = bookInfo;
    bookPost.categorys = selectedCategories;
    bookPost.images = imgUrl
    console.log(bookPost)
    if (isFormValid) {
      setIsPending(true);
      newRequest
        .post(`/book/create/${id}`, bookPost)
        .then((res) => {
          getData('');
          toast.success('Thêm sách thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setIsPending(false);
          setError(false);
          setSelectedCategories([])
          setFile([])
          setBookInfo({
            name: '',
            desc : '',
            price : '',
            publication_date: '',
            sales_number : '',
            author_id : '',
            store_id : id,
            nhaXB: '',
            languages: '',
            weight: 0,
            size: '',
            numPage: 0,
            categorys : '',
            images : ''
          })
          handleClose()
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error.response.data)
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
  useEffect(()=>{
    setIsPendingCate(true);
    newRequest.get(`/category`, {
      withCredentials: true
    })
    .then((res) => {
      setCategory(res.data)
      setIsPendingCate(false);
      setError(false)
    })
    .catch((error) => {
      setError(error.response.data);
      setIsPendingCate(false);
    });
  }, [])
  useEffect(()=>{
    setIsPending(true);
    newRequest.get(`/author/${id}`, {
      withCredentials: true
    })
    .then((res) => {
      setAuthor(res.data)
      setIsPending(false);
      setError(false)
    })
    .catch((error) => {
      setError(error.response.data);
      setIsPending(false);
    });
  }, [])
  return (
    <>
      <button onClick={handleShow} className={styles.btn}>Thêm Sách</button>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin của sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isPending && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={450} />)}
        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.item}>
                <span className={styles.name_item}>Name</span>
                <input type="text" className={styles.input_item} placeholder='Nhập name sách' name='name' onChange={(e)=>handleSetFilterBook(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Nội dung</span>
                <textarea name="desc" id="" cols="30" rows="13" onChange={(e)=>handleSetFilterBook(e)} className={styles.input_item}></textarea>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Thể loại</span>
                <div className={styles.value_book}>
                      {isPendingCate && (<div>........</div>)}
                      {!isPendingCate  && category && category.map((item, i) =>(
                        <label key={i} className={styles.item_valuebook}>
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={handleCategoryChange}
                          />  
                          {item.name}
                        </label>
                      ))}
                    </div>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Tác giả</span>
                <select className={styles.input_item} name='author_id' onChange={(e)=>handleSetFilterBook(e)}>
                <option value="">Chọn tác giả</option>
                  {
                    author && author.map((item, i)=>(
                      <option value={item.id}>{item.name}</option>
                    ))
                  }
                </select>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.item}>
                <span className={styles.name_item}>Giá</span>
                <input type="text" className={styles.input_item} placeholder='Nhập giá sách' name='price' onChange={(e)=>handleSetFilterBook(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Phần trăm giảm giá </span>
                <input type="text" className={styles.input_item} placeholder='Nhập phần trăm giảm giá (%)' name='percentDiscount' onChange={(e)=>handleSetFilterBook(e)} required/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Ảnh</span>
                <input type="file" className={styles.input_item} placeholder='Nhập số lượng' name= 'sales_number' onChange={(e)=>setFile(e.target.files)} required multiple/>
            </div>
            <div className={styles.item}>
                <span className={styles.name_item}>Nhà xuất bản</span>
                <input type="text" className={styles.input_item} placeholder='Nhập nhà xuất bản' name='nhaXB' onChange={(e)=>handleSetFilterBook(e)} required/>
            </div>
            <div className={styles.solieu}>
              <div className={styles.solieu_left}>
                <div className={styles.item_sl}>
                    <span className={styles.name_item}>Số lượng</span>
                    <input type="text" className={styles.input_item} placeholder='Nhập số lượng' name= 'sales_number' onChange={(e)=>handleSetFilterBook(e)} required/>
                </div>
                <div className={styles.item_sl}>
                  <span className={styles.name_item}>Năm xuất bản</span>
                  <input type="text" className={styles.input_item} placeholder='Nhập năm xuất bản' name='publication_date' onChange={(e)=>handleSetFilterBook(e)} required/>
                </div>
                <div className={styles.item_sl}>
                  <span className={styles.name_item}>Ngôn ngữ</span>
                  <select className={styles.input_item} name='languages' onChange={(e)=>handleSetFilterBook(e)}>
                    <option value="">Chọn ngôn ngữ</option>
                      <option value="Tiếng Việt">Tiếng Việt</option>
                      <option value="Tiếng Anh">Tiếng Anh</option>
                      <option value="Tiếng Pháp">Tiếng Pháp</option>
                    </select>
                </div>
              </div>
              <div className={styles.solieu_right}>
              <div className={styles.item_sl}>
                <span className={styles.name_item}>Khối lượng</span>
                <input type="text" className={styles.input_item} placeholder='Nhập khối lượng (gam)' name='weight' onChange={(e)=>handleSetFilterBook(e)} required/>
              </div>
              <div className={styles.item_sl}>
                <span className={styles.name_item}>Kích thước</span>
                <input type="text" className={styles.input_item} placeholder='Nhập kích thước (hxw) (cm)' name='size' onChange={(e)=>handleSetFilterBook(e)} required/>
              </div>
              <div className={styles.item_sl}>
                <span className={styles.name_item}>Số trang</span>
                <input type="text" className={styles.input_item} placeholder='Nhập số trang' name='numPage' onChange={(e)=>handleSetFilterBook(e)} required/>
              </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>handleCreateBook()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default AddBook;