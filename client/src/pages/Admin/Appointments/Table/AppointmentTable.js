import React from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import View from '../../../../components/Buttons/View';
import { MyContext } from '../../../../context/ContextProvider';
import { request } from '../../../../utils/axios-utils';
import { fullDate } from '../../../../utils/Date';

const getAllAppointment = () => {
    return request({url: `/api/appointment/`, method: `get`});
}

const AppointmentTable = () => {

    const {allAppointment, setAllAppointment} = MyContext();

    const {isLoading} =  useQuery('all-appointment', getAllAppointment,{
        onSuccess: (data) => {
          setAllAppointment(data?.data)
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
                Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
                Doctor Name
            </th>
            <th scope="col" className="px-6 py-3">
                Appointment Date
            </th>
            <th scope="col" className="px-6 py-3">
                Appointment Time
            </th>
            <th scope="col" className="px-6 py-3">
                Appointment Day
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Actions
            </th>
            </tr>
        </thead>
        <tbody>
            {allAppointment?.map((app, id) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={id}>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {app?.user?.firstName} {app?.user?.lastName}
                    </th>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                        
                        {app?.doctor?.name}
                    </th>
                    <td className="px-6 py-4">{fullDate(app?.scheduleDate)}</td>
                    <td className="px-6 py-4">{app?.startTime} - {app?.endTime}</td>
                    <td className="px-6 py-4">{app?.scheduleDay}</td>
                    <td className="px-6 py-4">
                       
                        {/* Status: Booked  */}
                        {app?.status === "Booked" && 
                                <span className='text-xs text-semibold text-yellow-500 bg-yellow-400/20 py-1 px-2
                                rounded-full'>{app?.status}</span>
                        }
                    
                        {/* Status: Completed  */}
                        {app?.status === "Completed" && 
                            <span className='text-xs text-semibold text-green-500 bg-green-400/20 py-1 px-2
                            rounded-full'>{app?.status}</span>
                        }

                        {/* Status: In process  */}
                        {app?.status === "In process" && 
                            <span className='text-xs text-semibold text-blue-500 bg-blue-400/20 py-1 px-2
                            rounded-full'>{app?.status}</span> 
                        }                   
                    </td>
                    <td className="px-6 py-4 text-right flex">
                        <View />
                    </td>
                </tr>
            ))}
            
        </tbody>
        </table>
    </div>
  )
}

export default AppointmentTable