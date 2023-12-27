import React, { useState } from 'react'
import styles from './HomeStore.module.css'
import HeaderStore from '../../../compoments/Store/HeaderStore/HeaderStore'
import SideBar from '../../../compoments/Store/SidebarHomeStore/SidebarHomeStore'
import BodyHome from '../../../compoments/Store/BodyHomeStore/BodyHomeStore'
import MyProfile from '../../../compoments/MyProfile/MyProfile'

export default function HomeStore() {
    const [open, setOpen] = useState(1)
    return (
        <div className={styles.HomeStore}>
            <HeaderStore/>
            <div className={styles.body}>
                <SideBar setOpen = {setOpen}/>
                {open === 1 && (<BodyHome />)}
                {open === 2 && (<MyProfile/>)}
            </div>
        </div>
    )
}