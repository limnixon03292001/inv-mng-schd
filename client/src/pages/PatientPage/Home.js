import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/ContextProvider';
import { request } from '../../utils/axios-utils';
import { checkToken } from '../../utils/checkToken';
import { fullDate } from '../../utils/Date'
import DoctorSchedules from './DoctorSchedules/DoctorSchedules';
import Header from './Header/Header';


const getSchedule = () => {
  return request({url: `/api/doctor/get-public-schedule`, method: `get`});
}

const Home = ({roleUser}) => {

  const {doctorSched, setDoctorSched, user} = MyContext();
  const auth = JSON.parse(localStorage.getItem("creds"));
  

  //get list of doctor schedules
  const {isLoading} =  useQuery('doctor-list-schedules', getSchedule,{
    onSuccess: (data) => {
      setDoctorSched(data?.data);
    },
    onError: (err) => {
        const error = JSON.parse(err?.request?.response)
        toast.error(`Error: ${error.err}`);
    }
  });

  return (

      // This page is for registered user who wants to book an appointment
    <div>
      <Header roleUser={roleUser} auth={auth} user={user}/>
      <DoctorSchedules roleUser={roleUser} auth={auth} doctorSched={doctorSched}/>
    </div>
  )
}

export default Home