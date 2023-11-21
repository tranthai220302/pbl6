import React, { useState } from 'react'
import styles from './Profile.module.css'
import Profile_Sidebar from '../../compoments/Profile_Sidebar/Profile_Sidebar'

export default function Profile() {
    return(
        <div className={styles.Profile}>
            <Profile_Sidebar/>
        </div>
    )
}