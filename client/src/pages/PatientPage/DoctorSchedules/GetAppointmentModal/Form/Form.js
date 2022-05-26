import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { MyContext } from '../../../../../context/ContextProvider'
import { request } from '../../../../../utils/axios-utils';
import { fullDate } from '../../../../../utils/Date';

const addAppointment = (data) => {
    return request({url: `/api/appointment/add-appointment`, method: `post`, data: data});
}

const addNotif = (data) => {
    return request({url: `/api/notification/add-notif`, method: `post`, data: data});
}

const Form = ({ds}) => {

    const { user, adminNotif, setAdminNotif, socket } = MyContext();
    const [reason, setReason] = useState("");

    const { mutate } = useMutation(addAppointment, {
        onSuccess: (data) => {
            console.log("Appointment:",data?.data);
            mutateAddNotif({
                pic: user?.pic,
                description: `${user?.firstName} ${user?.lastName} booked an appointment for ${ds?.doctor?.name} scheduled on ${fullDate(ds?.scheduleDate)}. Time: ${ds?.startTime} - ${ds?.endTime}.`
            });
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const { mutate: mutateAddNotif } = useMutation(addNotif, {
        onSuccess: (data) => {
            socket.emit("sendNotifAdmin",data?.data);
            console.log("Notif:",data?.data);
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            doctor: ds?.doctor?._id,
            user: user?._id,
            scheduleDate: ds?.scheduleDate,
            scheduleDay: ds?.scheduleDay,
            startTime: ds?.startTime,
            endTime: ds?.endTime,
            reason: reason,
        })
    }

  return (
    <div>
        <form className='w-full h-full' onSubmit={(e) => handleSubmit(e)}>
            <h3 className=" px-4 py-3 text-gray-600 text-center text-xl font-semibold border-b border-gray-100">
                Appointment Details.
            </h3>
            <div className='flex items-center gap-4 px-4 mt-4'>
                <div className=''>
                    <img src={ds?.doctor?.pic} alt="" className='w-[110px] h-[110px] rounded-full object-cover object-center'/>
                </div>
                <div className=''>
                    <div>
                        <p className='font-semibold text-blue-500 text-lg '>{ds?.doctor?.name}</p>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm'>{ds?.doctor?.specialty}</p>
                    </div>
                    <div className='flex'>
                        <div className='text-blue-400 h-7 rounded-lg'>
                            <svg viewBox="0 0 20 20" className="h-full w-full fill-current mr-2"><path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z" /></svg>
                        </div>
                        <div>
                            <p className='font-semibold'>{fullDate(ds?.scheduleDate)}</p>
                            <p className='text-gray-500 text-xs'>{ds?.startTime} - {ds?.endTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4 border-t border-gray-200'>
                <h3 className="px-4 py-3 text-gray-800 text-lg text-left font-semibold border-b border-gray-100">
                    Reason for your appointment.
                </h3>
                {/* textarea */}
                <div className='px-4'>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your reason..." onChange={(e) => setReason(e.target.value)} value={reason}></textarea>
                </div>
            </div>

            <button type="submit" className="block ml-auto mr-2 my-2 mt-3 w-full sm:w-auto text-center rounded-full
            border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Book Appointment
            </button>
            
        </form>
    </div>
  )
}

export default Form