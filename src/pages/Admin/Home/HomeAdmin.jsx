import React, { useState } from 'react'
import SliderMenu from '../../../compoments/SliderMenu/SliderMenu'
import styles from './HomeAdmin.module.css'
import { useEffect } from 'react'
import BodyAdmin from '../../../compoments/BodyAdmin/BodyAdmin'
export default function HomeAdmin() {
    const [open, setOpen] = useState(true)
  return (
    <div class={styles.homeAdmin}>
        {open && <SliderMenu setOpen = {setOpen} />}
        <BodyAdmin />      
    </div>
  )
}
