import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { MyContext } from '../../../../../context/ContextProvider';
import { request } from '../../../../../utils/axios-utils'; 

const registerDoctor = (data) => {
    return request({url: `/api/doctor/register`, method: `post`, data: data});
} 

const role =  parseInt(process.env.REACT_APP_DOCTOR_KEY);

const Form = ({ closeModal }) => {
    const {doctorData, setDoctorData} = MyContext();

    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [contact, setContact] = useState('');
    const [pic, setPic] = useState();

    const { mutate } = useMutation(registerDoctor,{
        onSuccess: (data) => {
            setDoctorData([data?.data, ...doctorData]);
            closeModal();
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !specialty || !email || !pass || !confirmPass || !contact){
            toast.error('Please fill all the fields!');
            return;
        }
        if(pass !== confirmPass){
            toast.error('Password and confirm password does not match!');
            return;
        }
        mutate({
            name,
            specialty,
            email,
            pass,
            contact,
            pic,
            role,
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
        <h3 className="mb-6 text-gray-800 text-2xl text-left font-semibold">
            Add doctor account.
        </h3>

        <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setName(e.target.value)} value={name} />

                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setSpecialty(e.target.value)} value={specialty} />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Specialty</label>
            </div>
        </div>   
        <div className="relative z-0 w-full mb-6 group">
            <input type="number" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
            onChange={(e) => setContact(e.target.value)} value={contact}/>
            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+639)</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_username" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="password" name="floating_pass" id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setPass(e.target.value)} value={pass} />

                <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input type="password" name="floating_cPass" id="floating_cPass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} />
                <label htmlFor="floating_cPass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
            </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload picture.</label>
                <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={(e) => postDetails(e.target.files[0])} accept="image/*"/>
                {/* {isUploadingPic && 
                <div className='flex gap-2 items-center text-gray-700'>
                    <Spinner/>
                    <span>Uploading...</span>
                </div>} */}
                <div className="mt-1 text-xs text-gray-500" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
            </div>
        <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-full">Add account.</button>
        </div>
    </form>
  )
}

export default Form