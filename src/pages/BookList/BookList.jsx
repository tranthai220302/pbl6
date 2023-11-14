import React, { useState } from 'react'
import SideBar from '../../compoments/SideBar/SideBar'
import ListBookDetail from '../../compoments/ListBookDetail/ListBookDetail'
import styles from './BookList.module.css'

export default function BookList() {
    return (
        <div className={styles.BookList}>
            <SideBar/>
            <ListBookDetail/>
        </div>
    )
}