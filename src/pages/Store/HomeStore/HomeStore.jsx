import React, { useState } from 'react'
import styles from './HomeStore.module.css'
import HeaderStore from '../../../compoments/Store/HeaderStore/HeaderStore'
import SideBar from '../../../compoments/Store/SidebarHomeStore/SidebarHomeStore'
import BodyHome from '../../../compoments/Store/BodyHomeStore/BodyHomeStore'
import MyProfile from '../../../compoments/MyProfile/MyProfile'
import StoreManage from '../../../compoments/Store/StoreManage/StoreManage'

export default function HomeStore() {

    const [open, setOpen] = useState(0)
    const [Submenu,setSubMenu] = useState("Thông tin cửa hàng")

    const [managebook, setManageBook] = useState('')
    const [manageorder, setManageOrder] = useState('')
    const [managestore, setManageStore] = useState('')
    const [analysis, setAnalysis] = useState('')

    return (
        <div className={styles.HomeStore}>
            <HeaderStore/>
            <div className={styles.body}>

                {/* <SideBar setOpen = {setOpen}/>*/}
                <SideBar setOpen = {setOpen}  setSubMenu={setSubMenu} managebook={managebook} setManageBook={setManageBook} managestore={managestore} setManageStore={setManageStore} manageorder={manageorder} setManageOrder={setManageOrder} analysis={analysis} setAnalysis={setAnalysis}/>
                {open === 0 && (<BodyHome managebook = {managebook} manageorder = {manageorder} managestore = {managestore} analysis={analysis}/>)}
                {open === 1 && (<StoreManage Submenu={Submenu} SetSubmenu={setSubMenu}/> )}
            </div>
        </div>
    )
}