import React from 'react';
import { useQuery } from 'react-query';
import { request } from '../../../../utils/axios-utils';
import { MyContext } from '../../../../context/ContextProvider';
import Delete from '../../../../components/Buttons/Delete';
import Edit from '../../../../components/Buttons/Edit';
import View from '../../../../components/Buttons/View';
import toast from 'react-hot-toast';
import { fullDate } from '../../../../utils/Date';


const getSchedule = () => {
    return request({url: `/api/doctor/get-schedule`, method: `get`});
}

//get the list of the updated doctors
const getDoctor = () => {
    return request({url: `/api/doctor`, method: `get`});
}

const DoctorSchedTable = () => {

    const {doctorSched, setDoctorSched, setDoctorData} = MyContext();

    const {isLoading} =  useQuery('doctor-schedules', getSchedule,{
        onSuccess: (data) => {
          setDoctorSched(data?.data);
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const {isLoading: doctorListLoading} =  useQuery('doctor-lists', getDoctor, {
        onSuccess: (data) => {
          setDoctorData(data?.data);
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });
    
  return (  
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3">
                Doctor Name
            </th>
            <th scope="col" className="px-6 py-3">
                Schedule Date
            </th>
            <th scope="col" className="px-6 py-3">
                Schedule Day
            </th>
            <th scope="col" className="px-6 py-3">
                Start Time
            </th>
            <th scope="col" className="px-6 py-3">
                End Time
            </th>
            <th scope="col" className="px-6 py-3">
                <span>Actions</span>
            </th>
            </tr>
        </thead>
        <tbody>
            {doctorSched?.map((ds, id) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={id}>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {ds?.doctor?.name}
                    </th>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                        {fullDate(ds?.scheduleDate)}
                    </th>
                    <td className="px-6 py-4">{ds?.scheduleDay}</td>
                    <td className="px-6 py-4">{ds?.startTime}</td>
                    <td className="px-6 py-4">{ds?.endTime}</td>
                    <td className="px-6 py-4 text-right flex">
                        <View />
                        <Edit />
                        <Delete />  
                    </td>
                </tr>
            ))}
            
        </tbody>
        </table>
    </div>
  )
}

export default DoctorSchedTable