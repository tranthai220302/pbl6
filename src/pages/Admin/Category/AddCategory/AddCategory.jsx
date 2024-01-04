import React from 'react'
import styles from './AddCategory.module.css'
import NavbarAdmin from '../../NavbarAdmin/NavbarAdmin'
export default function AddCategory() {
  return (
    <div className={styles.container}>
    <div className={styles.addCategory}>
      <NavbarAdmin />
      <div className={styles.content}></div>
    </div>
  </div>
  )
}
