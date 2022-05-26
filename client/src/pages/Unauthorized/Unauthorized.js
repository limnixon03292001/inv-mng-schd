import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const Unauthorized = () => {

  useEffect(() =>{
    toast.error("Unauthorized!");
    // localStorage.removeItem("creds");
  },[])
  return (
    <div>Unauthorized</div>
  )
}

export default Unauthorized