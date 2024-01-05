import React, { useEffect, useState } from 'react'
import styles from './Category.module.css'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'
import newRequest from '../../../ults/NewRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalListBook from './ModalListBook/ModalListBook';
import ModalEditCategory from './ModalEditCategory/ModalEditCategory';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
export default function Category() {
  const [datacate, setDatacate] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [number, setNumber] = useState(null)
  const [error, setError] = useState(null)
  const [numPage, setNumpage] = useState(null)
  const [editIndex, setEditIndex] = useState(null); // Thêm state để theo dõi mục nào đang được chỉnh sửa
  const [open, setIsOpen] =useState(false)
  const [selectedCate, setSelectCate] = useState(null);
  const [selectedCateUp, setSelectCateUp] = useState(null);
  const [openAdd, setOpenAdd] = useState(false)
  const getCategory = async (page) => {
    setIsPending(true);
    await newRequest.get(`/category?isNumber=1&page=${page}`, {}).then(
      (res) => {
        setDatacate(res.data.categorys)
        setNumber(res.data.number)
        setNumpage(res.data.numPage);
        setIsPending(false);
        setError(false)
      }
    ).catch((error) => {
      setError(error.response)
      setIsPending(false)
    })
  }

  const handleEdit = (index) => {
    // Khi click vào icon chỉnh sửa, setEditIndex để chỉ định mục nào đang được chỉnh sửa
    setEditIndex(index);
    setIsOpen(!open)
  }

  const handleDelete = (id) => {
    // Xử lý xoá ở đây
    console.log(`Delete item with ID ${id}`);
  }

  useEffect(() => {
    getCategory(1)
  }, [])
  const click = (item)=>{
    setSelectCate(item.name)
    setIsOpen(false);
  }
  const clickUp = (item)=>{
    setSelectCateUp(item)
    setIsOpen(false);
    console.log(item)
  }
  const handleDelte = (item)=>{
    setIsPendingDelete(true);
    newRequest.delete(`/category/delete/${item}`).then((res)=>{
        toast.success('Xoá thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
        });
        getCategory(1)
        setIsPendingDelete(false);
    }).catch((error)=>{
        toast.error(error.response.data, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, 
        });
        setIsPendingDelete(false)
    })
  }
  const submit = (item) => {
    setIsOpen(false)
    confirmAlert({
      title: 'Xác nhận xoá',
      message: `Bạn có chắc muốn xoá thể loại "${item.name}" không?`,
      buttons: [
        {
          label: 'Có',
          onClick: () => handleDelte(item.id)
        },
        {
          label: 'Không',
          onClick: () => console.log('Click Không')
        }
      ]
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <NavbarAdmin isNoSearch={true}/>
        <div className={styles.content}>
          <div style={{display : 'flex', justifyContent : 'space-between'}}>
          <h3>Danh sách thể loại</h3>
          <button onClick={()=>{setOpenAdd(true)}}><FontAwesomeIcon icon={faPlus} /> Thêm thể loại</button>
          </div>
          {
            selectedCate && <ModalListBook showExmaple={true} showCloseExample={()=>{setSelectCate(null)}} category={selectedCate} />
          }
          {
            selectedCateUp && <ModalEditCategory modalShow={true} setModalShow={()=>setSelectCateUp(null)} item = {selectedCateUp} getData={getCategory} />
          }
            {
            openAdd && <ModalEditCategory modalShow={true} setModalShow={()=>setOpenAdd(null)} item = {selectedCateUp} getData={getCategory} isAdd = {true} />
          }
          {isPending && (
            <img className={styles.img_loading} src='https://i.gifer.com/ZKZg.gif' />
          )}
          <div className={styles.list}>
            {isPendingDelete && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' style={{width : '100%', height : '20px'}} />)}
            {datacate && !isPending && number &&
              datacate.map((item, index) => (
                <div className={styles.item} key={index}>
                  <div className={styles.header}>
                    <img src={item.img} alt="avatar" style={{ height: '80px', width: '80px', borderRadius: '50%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span className={styles.desc}>{item.desc}</span>
                      <div className={styles.number}>
                        <span style={{ fontWeight: 700 }}>Thể loại : <span style={{ fontWeight: 400 }}>{item.name}</span></span>
                        <span style={{ fontWeight: 700 }}>Sản phẩm : <span style={{ fontWeight: 400 }}>{number[index]}</span></span>
                        <FontAwesomeIcon icon={faCircleInfo} style={{ cursor: 'pointer', color: 'gray' }} onClick={() => handleEdit(index)} />
                        {editIndex === index && open && (
                          <div className={styles.editBlock}>
                            <ul>
                                <li onClick={()=>{clickUp(item)}}>Chỉnh sửa</li>
                                <li onClick={()=>{submit(item)}}>Xoá</li>
                                <li onClick={()=>{click(item)}}>Xem sản phẩm</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.num_page}>
            {numPage && !isPending && numPage > 1 && [...Array(numPage)].map((_, index) => (
              <span key={index + 1} onClick={() => { getCategory(index + 1) }}>{index + 1}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
