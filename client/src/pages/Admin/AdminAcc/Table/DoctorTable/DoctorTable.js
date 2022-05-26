import React from 'react';
import Delete from './Actions/Delete';
import Edit from '../../../../../components/Buttons/Edit';
import View from '../../../../../components/Buttons/View';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { request } from '../../../../../utils/axios-utils';
import { MyContext } from '../../../../../context/ContextProvider';
import {fullDate} from '../../../../../utils/Date';

const getDoctor = () => {
  return request({url: `/api/doctor`, method: `get`});
}

const DoctorTable = () => {

  const { doctorData, setDoctorData } = MyContext();

  const {isLoading} =  useQuery('doctor-accounts', getDoctor, {
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
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor name
            </th>            
            <th scope="col" className="px-6 py-3">
              Specialty
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {doctorData?.map((doctor,id) => (
          <tr className="bg-white border-b hover:bg-gray-50" key={id}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <img src={doctor?.pic} alt="" className='bg-gray-200 h-9 w-10 object-cover object-center rounded' />
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
            {doctor?.name}
            </th>
            <td className="px-6 py-4">{doctor?.specialty}</td>
            <td className="px-6 py-4">{doctor?.email}</td>
            <td className="px-6 py-4">{doctor?.contact}</td>
            <td className="px-6 py-4">{fullDate(doctor?.createdAt)}</td>
            <td className="px-6 py-4 text-right flex">
              <View/>
              <Edit/>
              <Delete id={doctor?._id}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default DoctorTable