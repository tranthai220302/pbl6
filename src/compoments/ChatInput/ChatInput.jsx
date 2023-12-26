import React, { useState } from 'react';
import styles from './ChatInput.module.css';
import uploadImg from '../../ults/upload';

export default function ChatInput({ handleSendMsg, setSize }) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(message, selectedImageUrl);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageUrl(reader.result);
        setSize(true)
      };
      reader.readAsDataURL(file);
    }
  };
  const imagesUrl = async(file) =>{
    try {
      const url = await uploadImg(file); 
      return url;
    } catch (err) {
        console.log(err)
    }
  }
  const handleSubmit = async (message, img) => {
    if(!message && !img){
      console.log('Vui long nhap tin nhan')
    }else{
      handleSendMsg(message, img)
      setMessage('');
      setSelectedFile(null)
      setSelectedImageUrl(null)
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };
  const handleCancle = () =>{
    setSelectedImageUrl(null)
  }
  return (
    <div className={styles.chatInput}>
      {selectedImageUrl && (
        <div className={styles.img_local}>
          <div className={styles.img_img2}>
          <div className={styles.cancel} onClick={()=>{handleCancle()}}><img src="https://w7.pngwing.com/pngs/580/263/png-transparent-abort-delete-cancel-icon-cross-no-access-denied-thumbnail.png" alt="" height={12} /></div>
            <img
              src={selectedImageUrl || 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'}
              alt="Choose file"
              className={styles.img_img1}
              onClick={openImageModal}
            />
          </div>
          {isImageModalOpen && (
            <div className={styles.img_modal} onClick={closeImageModal}>
              <img src={selectedImageUrl} className={styles.img_item} />
            </div>
          )}
        </div>
      )}
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder="Nhập tin nhắn ...."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <div className={styles.file_img}>
          <label htmlFor="fileInput">
            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" alt="Choose file" className={styles.img_img} />
          </label>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
        <img
          onClick={() => handleSubmit(message)}
          className={styles.send_img}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3rd558OSmfchOH1d7hcUlH40T73LbVR50hJ3jnWBB69V-v51vLzoWWuqBvZM8hhPgmg&usqp=CAU"
          alt=""
        />
      </div>
    </div>
  );
}
