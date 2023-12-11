import React, { useState } from 'react'
import styles from './HomeStore.module.css'
import HeaderStore from '../../../compoments/Store/HeaderStore/HeaderStore'
import SideBar from '../../../compoments/Store/SidebarHomeStore/SidebarHomeStore'
import BodyHome from '../../../compoments/Store/BodyHomeStore/BodyHomeStore'

export default function HomeStore() {
    return (
        <div className={styles.HomeStore}>
            <HeaderStore/>
            <div className={styles.body}>
                <SideBar/>
                <BodyHome/>
            </div>
        </div>
    )
}