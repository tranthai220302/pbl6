import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalEditCategory.module.css'
import { useState } from 'react';
import uploadImg from '../../../../ults/upload';
import { toast } from 'react-toastify';
import newRequest from '../../../../ults/NewRequest';
export default function ModalEditCategory({modalShow, setModalShow, item, getData, isAdd}){
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [data, setData] = useState({
        name : item?.name,
        desc : item?.desc,
    });
    const change = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const imagesUrl = async(file) =>{
        console.log(file)
        try {
          const url = await uploadImg(file); 
          return url;
        } catch (err) {
            console.log(err)
        }
      }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleCancle = () =>{
        setSelectedImageUrl(null)
      }
      const update = async ()=>{
        setIsPending(true);
        const img = await imagesUrl(selectedFile);
        setData((prev)=>({
            ...prev,
            img: img
        }))
        newRequest.put(`/category/update/${item.id}`, {
            name : data.name,
            desc : data.desc,
            img : img ? img : item.img
        }).then((res)=>{
            getData(1)
            toast.success('Chỉnh sửa thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false)
        }).catch((error)=>{
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
            setIsPending(false)
        })
      }
      const add = async () =>{
        setIsPending(true);
        const img = await imagesUrl(selectedFile);
        if(!data.name || !data.desc || !img){
            toast.error('Vui lòng nhập đầy đủ thông tin!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000, 
            });
        }else{
            newRequest.post(`/category/create`, {
                name : data.name,
                desc : data.desc,
                img : img 
            }).then((res)=>{
                getData(1)
                toast.success('Thêm thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000, 
                });
                setIsPending(false)
            }).catch((error)=>{
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000, 
                });
                setIsPending(false)
            })
        }
      }
  return (
    <>
    <Modal
      show = {modalShow}
      onHide={setModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isAdd ? (
            <span>Thêm thể loại</span>
          ) : (
            <span>Chỉnh sửa thể loại</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAdd ? (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.file_img}>
                            <label htmlFor="fileInput1">
                                Chọn ảnh  
                                <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
                            </label>
                            <input type="file" id="fileInput1" style={{ display: 'none' }}  onChange={handleFileChange}/>
                    </div>
                    {selectedImageUrl && (
                        <div className={styles.img_local}>
                            <div className={styles.img_img2}>
                            <div className={styles.cancel1} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                                {/* <img
                                src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                                alt="Choose file"
                                className={styles.img_img1}
                                /> */}
                                 <img src={selectedImageUrl} alt="avatr" width={284} height={174}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.right}>
                    <h4>
                        <input type="text"  name='name' onChange={(e)=>{change(e)}}/>
                    </h4>
                    <textarea name="desc" id="" cols="40" rows="10" onChange={(e)=>{change(e)}} ></textarea>
                </div>
            </div>
        ) : (
         <div className={styles.container}>
            <div className={styles.left}>
                <img src={item.img} alt="avatr" width={284} height={174}/>
                <div className={styles.file_img}>
                        <label htmlFor="fileInput1">
                            Chọn ảnh  
                            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
                        </label>
                        <input type="file" id="fileInput1" style={{ display: 'none' }}  onChange={handleFileChange}/>
                </div>
                {selectedImageUrl && (
                    <div className={styles.img_local}>
                        <div className={styles.img_img2}>
                        <div className={styles.cancel} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
                            <img
                            src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
                            alt="Choose file"
                            className={styles.img_img1}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.right}>
                <h4>
                    <input type="text" defaultValue={item.name} name='name' onChange={(e)=>{change(e)}}/>
                </h4>
                <textarea name="desc" id="" cols="40" rows="10" defaultValue={item.desc} onChange={(e)=>{change(e)}} ></textarea>
            </div>
        </div>
        )}
        {isPending && (<img src='https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif' height={20} width={450} />)}
      </Modal.Body>
      <Modal.Footer>
        {isAdd ? (
            <Button onClick={()=>{add()}}>Thêm</Button>
        ) : (
            <Button onClick={()=>{update()}}>Chỉnh sửa</Button>
        )}
        <Button onClick={setModalShow}>Đóng</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
