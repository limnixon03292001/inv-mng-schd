

export const checkToken = () => {

    const creds = JSON.parse(localStorage.getItem("creds"))
  
    if(creds?.token || creds){
        return true
    }else{
        return false
    }
}