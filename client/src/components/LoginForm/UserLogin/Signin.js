import axios from 'axios';
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Doctor from '../../../assets/svg/Doctor';


const loginUser = (data) => {
  return axios.post(`/api/user/login`, data);
} 

const Signin = ({ setisSwitch }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("creds",JSON.stringify(data?.data));
      navigate("/", {replace:true});
      toast.success("Login Successfully!")
    },
    onError: (err) => {
        const error = JSON.parse(err?.request?.response)
        toast.error(`Error: ${error.err}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      email,
      password
    });
  }

  return (
    <div className="lg:px-8">
        <h3 className="my-8 md:my-6 text-gray-800 text-2xl text-left font-semibold">
          Schedule your appointment now!
        </h3>
        <div className="relative z-0 w-full mb-6 group">
          <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)} 
          value={email} />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setPassword(e.target.value)} value={password}  />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <div className="mb-6 text-left">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm sm:w-auto px-5 py-2.5 text-center rounded-full" onClick={(e) => handleSubmit(e)}>Login</button>
        </div>

        <div className="text-center z-50 relative">
          <span className="cursor-pointer underline inline-block text-sm text-blue-700 align-baseline hover:text-blue-800" onClick={() => setisSwitch(true)}>
            Create an Account!
          </span>
        </div>
      <Doctor/>
    </div>
  )
}

export default Signin