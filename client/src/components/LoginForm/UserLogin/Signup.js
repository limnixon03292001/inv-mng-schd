import React, {useState} from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

const registerUser = (data) => {
    return axios.post(`/api/user/`, data);
} 

const role =  parseInt(process.env.REACT_APP_USER_KEY);

const Signup = ({ setisSwitch, isSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    // const [genderSelected, setGenderSelected] = useState(gender[0]);
    // const [statusSelected, setStatusSelected] = useState(status[0]);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [pic, setPic] = useState();
    const [isUploadingPic, setIsUploadingPic] = useState(false);

    // console.log(
    //     email,
    //     password,
    //     cpwd,
    //     firstName,
    //     lastName,
    //     contact,
    //     address
    // )

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

    const { mutate } = useMutation(registerUser, {
        onSuccess: (data) => {
          console.log(data?.data);
          setisSwitch(!isSwitch);
          toast.success("Your account has been registered sucessfuly!");
        },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password || !cpwd || !firstName || !lastName || !contact || !address){
            toast.error('Please fill all the fields!');
            return;
        }
        if(password !== cpwd){
            toast.error('Password and confirm password does not match!');
            return;
        }
        mutate({
            email,
            password,
            firstName,
            lastName,
            contact,
            address,
            pic,
            role
        });
    }

  return (
    <div className='w-full h-full py-2'>
        <div className='flex flex-row justify-between items-center w-full h-full'>
            <h3 className="my-4 text-gray-800 text-2xl text-left font-semibold flex-1">
                Register your Account.
            </h3>
            <div className="">
                <button type="submit" className="w-full sm:w-auto text-center rounded-full
                border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                " onClick={() => setisSwitch(false)}>Sign in</button>
            </div>
        </div>

        <div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setPwd(e.target.value)} value={password}/>
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setCpwd(e.target.value)} value={cpwd} />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setContact(e.target.value)} value={contact}/>
                <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+639)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  onChange={(e) => setAddress(e.target.value)} value={address}/>
                <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                </div>
            </div> 
            <div className="flex flex-wrap gap-1 xl:gap-6 mb-4">
                {/* <div className="relative w-full group flex-1">
                    <label className=' text-sm text-gray-500 '>Gender</label>
                    <SelectGender genderSelected={genderSelected} setGenderSelected={setGenderSelected} gender={gender}/>
                </div>
                <div className="relative w-full group flex-1">
                    <label className=' text-sm text-gray-500 '>Status</label>
                    <SelectStatus statusSelected={statusSelected} setStatusSelected={setStatusSelected} status={status}/>
                </div>
                <div className="relative w-full group flex-1">
                    <label className=' text-sm text-gray-500 '>Date of birth</label>
                    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy'
                    className="rounded-lg border border-gray-200 p-2 w-36 md:w-44" placeholderText='dd/MM/yyyy'/>
                </div> */}
                {/* profile */}
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload picture.</label>
                    <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={(e) => postDetails(e.target.files[0])} accept="image/*"/>
                    {/* {isUploadingPic && 
                    <div className='flex gap-2 items-center text-gray-700'>
                        <Spinner/>
                        <span>Uploading...</span>
                    </div>} */}
                    <div className="mt-1 text-xs text-gray-500" id="user_avatar_help">A profile picture is useful to identify your account.</div>
                </div>
            </div> 
        </div>
        
        <div className="mb-4">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-full" onClick={(e) => handleSubmit(e)}>Register</button>
        </div>
    </div>
  )
}


export default Signup