import React, { useState } from 'react'
import styles from './HomeStore.module.css'
import HeaderStore from '../../../compoments/Store/HeaderStore/HeaderStore'
import SideBar from '../../../compoments/Store/SidebarHomeStore/SidebarHomeStore'
import BodyHome from '../../../compoments/Store/BodyHomeStore/BodyHomeStore'

export default function HomeStore() {
    const [managebook, setManageBook] = useState('')
    const [manageorder, setManageOrder] = useState('')
    const [managestore, setManageStore] = useState('')
    const [analysis, setAnalysis] = useState('')
    return (
        <div className={styles.HomeStore}>
            <HeaderStore/>
            <div className={styles.body}>
                <SideBar managebook={managebook} setManageBook={setManageBook} managestore={managestore} setManageStore={setManageStore} manageorder={manageorder} setManageOrder={setManageOrder} analysis={analysis} setAnalysis={setAnalysis}/>
                <BodyHome managebook = {managebook} manageorder = {manageorder} managestore = {managestore} analysis={analysis}/>
            </div>
        </div>
    )
}