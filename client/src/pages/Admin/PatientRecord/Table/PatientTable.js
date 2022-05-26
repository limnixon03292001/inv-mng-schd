import React from 'react';
import { useQuery } from 'react-query';
import { request } from '../../../../utils/axios-utils';
import { MyContext } from '../../../../context/ContextProvider';
import { fullDate } from '../../../../utils/Date';
import Delete from '../Table/Actions/Delete';
import Edit from '../Table/Actions/Edit';
import View from '../Table/Actions/View';
import toast from 'react-hot-toast';

const getPatient = () => {
  return request({url: `/api/patient`, method: `get`});
}

const PatientTable = () => {
  const {patientRecord, setPatientRecord} = MyContext();


  const {isLoading} =  useQuery('patient-records', getPatient,{
    onSuccess: (data) => {
      setPatientRecord(data?.data);
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
              LastName
            </th>
            <th scope="col" className="px-6 py-3">
              FirstName
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Age
            </th>
            <th scope="col" className="px-6 py-3">
              Contact No.
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

        {patientRecord?.map((patient,id) => (
          <tr className="bg-white border-b hover:bg-gray-50" key={id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <img src={patient?.pic} alt="" className='h-9 w-10 object-cover object-center rounded' />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {patient?.lastName}
              </th>
              <td className="px-6 py-4">{patient?.firstName}</td>
              <td className="px-6 py-4">{patient?.gender}</td>
              <td className="px-6 py-4">{patient?.age}</td>
              <td className="px-6 py-4">{patient?.contact}</td>
              <td className="px-6 py-4">{fullDate(patient?.createdAt)}</td>
              {/* <td className="px-6 py-4">$2999</td> */}
              <td className="px-6 py-4 text-right flex">
                <View patientId={patient?._id}/>
                <Edit patient={patient}/>
                <Delete/>
              </td>
        </tr>
        ))}
        
        </tbody>
      </table>
    </div>

  )
}

export default PatientTable