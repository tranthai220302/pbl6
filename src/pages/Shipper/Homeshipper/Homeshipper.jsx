import React, { useState } from 'react'
import styles from './Homeshipper.module.css'
import HeaderShipper from '../HeaderShipper/HeaderShipper'

import MyProfile from '../MyProfile/MyProfile'
import SideBar from '../SideBar/SideBar'
import ManageOrder from '../ManageOrder/ManageOrder'
import Statistical from '../Statistical/Statistical'

export default function HomeStore() {
    const [select , setSelect ] = useState(1)
    return (
        <div className={styles.HomeStore}>
            <HeaderShipper/>
            <div className={styles.body}>
                {/* <SideBar setOpen = {setOpen}/>*/}
                <SideBar setSelect={setSelect}/>
                {select===1 && <MyProfile />}
                {select===2 && <ManageOrder />}
                {select===3 && <Statistical/>}
            </div>
        </div>
    )
}