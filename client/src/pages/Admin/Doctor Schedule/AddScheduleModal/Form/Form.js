import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { request } from '../../../../../utils/axios-utils';
import { MyContext } from '../../../../../context/ContextProvider';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid'
import { extractDay, fullDate } from '../../../../../utils/Date';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import toast from 'react-hot-toast';

const addSchedule = (data) => {
    return request({url: `/api/doctor/add-schedule`, method: `post`, data: data});
}


const Form = () => {
    const {doctorData, setDoctorSched, doctorSched} = MyContext();
    const [doctorSelected, setDoctorSelected] = useState(doctorData[0]);
    const [dateSelected, setDateSelected] = useState(null);
    const [daySelected, setDaySelected] = useState(``);
    const [startTime, setStartTime] = useState(``);
    const [endTime, setEndTime] = useState(``);
    const [doctorId, setDoctorId] = useState(doctorSelected?._id);
    // const [expireAt, setExpireAt] = useState(null);

    const {mutate} = useMutation(addSchedule, {
        onSuccess: (data) => {
            setDoctorSched([data?.data, ...doctorSched]);
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!dateSelected || !startTime || !endTime){
            return toast.error('All fields are required!');
        }
        mutate({
            doctor: doctorId,
            scheduleDate: dateSelected,
            scheduleDay: daySelected,
            startTime: startTime,
            endTime: endTime,
            // expireAt: expireAt,
        })
    }

    // console.log(
    //     doctorId,
    //     dateSelected,
    //     daySelected,
    //     startTime,
    //     endTime
    // )

    const handleDoctorData = (value) => {
        setDoctorSelected(value);
        setDoctorId(value?._id);
    }
  
    const handleDate = (date) => {
        setDaySelected(extractDay(date));
        setDateSelected(date);
    };
 
    const handleTime = useCallback((time, change) => {
       
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        time = time.join('');
        // return adjusted time or original string
        change(time); 
        
    },[]);
    // console.log("time", startTime, endTime)


    // useEffect(() => {
    //     var startDate = new Date( `${fullDate(dateSelected)} ${endTime}` );
    //     setExpireAt(startDate)
    // },[dateSelected, endTime])

  
  return (
    <form className='w-full overflow-auto' >
        <h3 className="mb-6 text-gray-800 text-2xl text-left font-semibold">
            Add doctor schedule.
        </h3>
        <div className='space-y-4'>
            <div>
                <label className=' text-sm text-gray-500 '>Select date</label>
                <DatePicker selected={dateSelected} onChange={date => handleDate(date)} dateFormat='dd/MM/yyyy'
                className="rounded-lg border border-gray-200 p-2 w-full" placeholderText='dd/MM/yyyy'/>
            </div>
            <div>
                <label className=' text-sm text-gray-500 block mb-1'>Start time</label>
                <TimePicker onChange={(value) => handleTime(value, setStartTime)} disableClock={true} required={true} className="w-full" name="time1" autoFocus={false}/>
            </div>
            <div>
                <label className=' text-sm text-gray-500 '>End time</label>
                <TimePicker onChange={(value) => handleTime(value, setEndTime)} disableClock={true} required={true} className="w-full" name="time2" autoFocus={false}/>
            </div>
            <div>
                <label className=' text-sm text-gray-500 '>Select doctor</label>
                <SelectDoctor doctorSelected={doctorSelected} setDoctorSelected={setDoctorSelected}
                    doctorData={doctorData} handleDoctorData={handleDoctorData}/>
            </div>
        </div>
        <div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-full mt-4" onClick={(e) => handleSubmit(e)}>Add schedule.</button>
        </div>
    </form>
  )
}







const SelectDoctor = ({doctorSelected, doctorData, handleDoctorData}) => {
    return (
        <div className="w-full">
            <Listbox value={doctorSelected} onChange={(value) => handleDoctorData(value)}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full rounded-lg bg-white pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm py-2 border border-gray-200 cursor-pointer">
                    <span className="block truncate">{doctorSelected?.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {doctorData?.map((doctor, doctorIdx) => (
                            <Listbox.Option
                                key={doctorIdx}
                                className={({ active }) =>
                                `relative cursor-pointer select-none py-2 px-4 ${
                                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                }`
                                }
                                value={doctor}
                            >
                                {({ doctorSelected }) => (
                                <>
                                    <span
                                    className={`block truncate ${
                                        doctorSelected ? 'font-medium' : 'font-normal'
                                    }`}
                                    >
                                        {doctor?.name}
                                    </span>
                                    {/* {doctorSelected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    ) : null} */}
                                </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
            </Listbox>
        </div>
    )
}

export default Form