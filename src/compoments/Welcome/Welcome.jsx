import React from 'react'
import styles from './Welcome.module.css'
export default function Welcome() {
  return (
    <div className={styles.continer}>
        <div className={styles.welcome}>
            <span className={styles.name}>Chào bạn!</span>
            <span className={styles.desc}>Hãy bắt đầu cuộc trò chuyện nào!</span>
        </div>
        <img className={styles.robot} src="https://cdnl.iconscout.com/lottie/premium/thumb/happy-robot-say-hai-5665357-4729052.gif" alt="" />
    </div>
  )
}
