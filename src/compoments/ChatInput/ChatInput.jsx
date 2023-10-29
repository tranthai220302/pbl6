import React, { useState } from 'react'
import styles from './ChatInput.module.css'

export default function ChatInput({handleSendMsg}) {
    const [message, setMessage] = useState('');
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit(message);
      }
    };
  
    const handleSubmit = (message) => {
      if (message.length > 0) {
        handleSendMsg(message);
        setMessage("");
      }
    };
  
    return (
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder='Nhập tin nhắn ....'
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
          onKeyPress={handleKeyPress}
        />
        <img onClick={() => handleSubmit(message)} className={styles.send_img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3rd558OSmfchOH1d7hcUlH40T73LbVR50hJ3jnWBB69V-v51vLzoWWuqBvZM8hhPgmg&usqp=CAU" alt="" />
      </div>
    );
}
