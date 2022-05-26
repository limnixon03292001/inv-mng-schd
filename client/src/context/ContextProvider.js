import React,{createContext, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const MainContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();  //auth
    const [socket, setSocket] = useState(); //socket connection

    const [patientRecord, setPatientRecord] = useState([]); //patient records
    const [adminData, setAdminData] = useState([]); //list of admin accounts
    const [doctorData, setDoctorData] = useState([]); //list of doctor accounts
    const [doctorSched, setDoctorSched] = useState([]); //list of doctor schedules
    const [allAppointment, setAllAppointment] = useState([]); //list of all appointments in admin side
    const [adminNotif, setAdminNotif] = useState([]); // list of notification in admin side
    const userInfo =  JSON.parse(localStorage.getItem("creds"));
    const navigate = useNavigate();
    useEffect(() => {
          
        setUser(userInfo);
        // if(!checkToken){
        //     return navigate("/login", {replace: true});
        // }
            
    },[navigate]);

  return (
    <MainContext.Provider value={{
      user, setUser,
      patientRecord, setPatientRecord,
      adminData, setAdminData,
      doctorData, setDoctorData,
      doctorSched, setDoctorSched,
      allAppointment, setAllAppointment,
      adminNotif, setAdminNotif,
      socket, setSocket
    }}>
        {children}
    </MainContext.Provider>
  )
}

export const MyContext = () => {
    return useContext(MainContext);
}

export default ContextProvider