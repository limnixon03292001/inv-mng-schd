import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutation } from 'react-query';
import { request } from '../../../../../utils/axios-utils';
import SelectGender from '../../../../../components/SelectBtn/SelectGender';
import SelectStatus from '../../../../../components/SelectBtn/SelectStatus';
import { MyContext } from '../../../../../context/ContextProvider';
import toast from 'react-hot-toast';

const gender = [
    { name: 'Male' },
    { name: 'Female' },
];
  
  const status = [
    { name: 'Single' },
    { name: 'Married' },
];

const addPatient = (data) => {
    return request({url: `/api/patient`, method: `post`, data: data});
}

const Form = ({ closeModal }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [religion, setReligion] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [genderSelected, setGenderSelected] = useState(gender[0]);
    const [statusSelected, setStatusSelected] = useState(status[0]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [pic, setPic] = useState();
    const [isUploadingPic, setIsUploadingPic] = useState(false);

    const {patientRecord, setPatientRecord} = MyContext();

    const {mutate} = useMutation(addPatient, {
        onSuccess: (data) =>{
            setPatientRecord([data?.data, ...patientRecord]);
            closeModal();
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
        firstName: firstName,
        lastName:lastName,
        age: age,
        religion: religion,
        contact: contact,
        address: address,
        birthPlace: birthPlace,
        gender: genderSelected?.name,
        civilStatus: statusSelected?.name,
       dateOfBirth: selectedDate,
        })
    }

    const postDetails = (pics) => {
        if(pics === undefined){
            // toast.error('Please select an Image!');
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            // setIsUploadingPic(true);
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "securing-future");
            // mutate(data);
        }else{
            console.log("error");
        }
    }
   

  return (
    <form className='w-full' onSubmit={(e) => handleSubmit(e)}>
        <h3 className="mb-4 text-gray-800 text-2xl text-left font-semibold">
        Add Patient.
        </h3>

        <div className="grid grid-cols-2 gap-6">

            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setFirstName(e.target.value)} value={firstName} />

                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setLastName(e.target.value)} value={lastName} />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
        </div>
    
        <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="number" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setAge(e.target.value)} value={age}/>
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                onChange={(e) => setReligion(e.target.value)} value={religion}/>
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Religion</label>
            </div>
        </div>
    
        <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 w-full mb-6 group">
            <input type="number" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
            onChange={(e) => setContact(e.target.value)} value={contact}/>
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+639)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
           onChange={(e) => setAddress(e.target.value)} value={address}/>
            <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>
        </div> 
        <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  
               onChange={(e) => setBirthPlace(e.target.value)} value={birthPlace}/>
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birth place</label>
            </div>
        </div>
        <div className="flex flex-wrap gap-1 xl:gap-6 mb-4 items-center">
            <div className="relative w-full group flex-1">
                <label className=' text-sm text-gray-500 '>Gender</label>
                <SelectGender genderSelected={genderSelected} setGenderSelected={setGenderSelected} gender={gender}/>
            </div>
            <div className="relative w-full group flex-1">
                <label className=' text-sm text-gray-500 '>Civil Status</label>
                <SelectStatus statusSelected={statusSelected} setStatusSelected={setStatusSelected} status={status}/>
            </div>
            <div className="relative w-full group flex-1">
                <label className=' text-sm text-gray-500 '>Date of birth</label>
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy'
                className="rounded-lg border border-gray-200 p-2 w-36 md:w-44" placeholderText='dd/MM/yyyy'/>
            </div>
            {/* profile */}
            <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload picture.</label>
                <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={(e) => postDetails(e.target.files[0])} accept="image/*"/>
                {/* {isUploadingPic && 
                <div className='flex gap-2 items-center text-gray-700'>
                    <Spinner/>
                    <span>Uploading...</span>
                </div>} */}
                <div className="mt-1 text-xs text-gray-500" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
            </div>
        </div> 
        <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-full">Add patient.</button>
        </div>
  </form>
  )
}

export default Form