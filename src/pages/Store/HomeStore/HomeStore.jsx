import React, { useState } from 'react'
import styles from './HomeStore.module.css'
import HeaderStore from '../../../compoments/Store/HeaderStore/HeaderStore'
import SideBar from '../../../compoments/Store/SidebarHomeStore/SidebarHomeStore'
import BodyHome from '../../../compoments/Store/BodyHomeStore/BodyHomeStore'
import MyProfile from '../../../compoments/MyProfile/MyProfile'
import StoreManage from '../../../compoments/Store/StoreManage/StoreManage'
import StoreFlashsale from '../../../compoments/Store/FlashSale/FlashSale'

export default function HomeStore() {

    const [open, setOpen] = useState(0)
    const [Submenu,setSubMenu] = useState("Thông tin cửa hàng")

    const [managebook, setManageBook] = useState('')
    const [manageorder, setManageOrder] = useState('')
    const [managestore, setManageStore] = useState('')
    const [analysis, setAnalysis] = useState('')
    const [all, setAll] = useState('')
    const [StateId1,setStateId1] = useState('')
    const [StateId6,setStateId6] = useState('')
    const [StateId7,setStateId7] = useState('')


    return (
        <div className={styles.HomeStore}>
            <HeaderStore/>
            <div className={styles.body}>

                {/* <SideBar setOpen = {setOpen}/>*/}
                <SideBar setOpen = {setOpen}  setSubMenu={setSubMenu} managebook={managebook} setManageBook={setManageBook} managestore={managestore} setManageStore={setManageStore} manageorder={manageorder} setManageOrder={setManageOrder} analysis={analysis} setAnalysis={setAnalysis} setAll = {setAll} setStateId1={setStateId1} setStateId6={setStateId6} setStateId7={setStateId7} all={all} StateId1={StateId1} StateId6={StateId6} StateId7={StateId7}/>
                {open === 0 && (<BodyHome managebook = {managebook} manageorder = {manageorder} managestore = {managestore} analysis={analysis} all={all} StateId1={StateId1} StateId6={StateId6} StateId7={StateId7}/>)}
                {open === 1 && (<StoreManage Submenu={Submenu} SetSubmenu={setSubMenu}/> )}
                {open === 2 && (<StoreFlashsale /> )}
            </div>
        </div>
    )
}