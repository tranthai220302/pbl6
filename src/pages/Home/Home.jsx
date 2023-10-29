import React, { useState } from 'react'
import Chat from '../Chat/Chat'
export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div onClick={()=>{setOpen(!open)}}>Chat</div>
      {open && (
        <Chat setOpen = {setOpen} />
      )}
    </div>
  )
}
