import React from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../../../context/ContextProvider';
import { checkToken } from '../../../../utils/checkToken'
import { fullDate } from '../../../../utils/Date';
import GetAppointmentBtn from '../GetAppointmentModal/GetAppointmentBtn';

const DoctorSchedTable = ({roleUser, auth}) => {
    const {doctorSched} = MyContext();
  return (
    <div>
          {/* Table start */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-6">
            <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3">
                  Doctor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3">
                  Appointment Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Appointment Day
                </th>
                <th scope="col" className="px-6 py-3">
                  Available Time
                </th>
                <th scope="col" className="px-6 py-3">
                  <span>Actions</span>
                </th>
                </tr>
            </thead>
            <tbody>
                {doctorSched?.map((ds, id) => (
                    <tr className="bg-white border-b hover:bg-gray-50" key={id} >
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
                          {ds?.doctor?.specialty}
                        </th>
                        <td className="px-6 py-4">{fullDate(ds?.scheduleDate)}</td>
                        <td className="px-6 py-4">{ds?.scheduleDay}</td>
                        <td className="px-6 py-4">{ds?.startTime} - {ds?.endTime}</td>
                        <td className="px-6 py-4 text-right flex">

                       { checkToken() && auth?.role === roleUser ? 
                            <GetAppointmentBtn ds={ds}/>
                          :
                          <Link to="/login" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
                            Get appoinmentxx.
                          </Link>
                        }
                        </td>
                    </tr>
                 ))} 
                
            </tbody>
            </table>
        </div>
        {/* Table ends */}
    </div>
  )
}

export default DoctorSchedTable