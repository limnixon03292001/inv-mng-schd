import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Sidenav from '../../components/Sidenav/Sidenav';
import Topnav from '../../components/Topnav/Topnav';
import AdminAcc from './AdminAcc/AdminAcc';
import Dashboard from './Dashboard/Dashboard';
import PatientRecord from './PatientRecord/PatientRecord';
import PatientInfo from './PatientInfo/PatientInfo';
import DoctorSchedule from './Doctor Schedule/DoctorSchedule';
import Appointments from './Appointments/Appointments';


const Admin = () => {
  
    const [open, setOpen] = useState(false);   

  return (
    <div className='leading-normal tracking-normal'>
        <div className='flex flex-wrap'>
                {/* SideNav */}
                <Sidenav open={open}/>
            {/* SideNav */}
            {/* MainContent */}
            <div className='w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen overlay'>
                <Topnav setOpen={setOpen} open={open}/>

                <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/patient-record" element={<PatientRecord />}/>
                    <Route path="/admin-accounts" element={<AdminAcc />}/>
                    <Route path="/doctor-schedules" element={<DoctorSchedule />}/>
                    <Route path="/appointments" element={<Appointments />}/>

                    <Route path="/patient/:id" element={<PatientInfo />}/>
                </Routes>

            </div>
            {/* MainContent */}
        </div>
    </div>
  )
}

export default Admin