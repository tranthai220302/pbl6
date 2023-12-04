import React, { useState } from 'react'
import styles from './Profile.module.css'
import Profile_Sidebar from '../../compoments/Profile_Sidebar/Profile_Sidebar'
import MyProfile from '../../compoments/MyProfile/MyProfile'
import ResetPassword from '../../compoments/ResetPassword/ResetPassword'
import Purchase from '../../compoments/Customer/Purchase/Purchase'
import Collab from '../../compoments/Customer/Collab/Collab'

export default function Profile() {
    const [open, setOpen] = useState(1)

    return(
        <div className={styles.Profile}>
            <Profile_Sidebar 
                setOpen = {setOpen}
            />
            {open === 1 && (<MyProfile />)}
            {open === 2 && (<ResetPassword />)}
            {open === 3 && (<Purchase />)}
            {open === 5 && (<Collab />)}
        </div>
    )
}