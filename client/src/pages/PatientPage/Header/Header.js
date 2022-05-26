import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../../../context/ContextProvider'
import { checkToken } from '../../../utils/checkToken'
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000/";
var socket;

const Header = ({auth, roleUser, user}) => {

  const {setSocket} = MyContext();

  //initiating sockets
  useEffect(() => {
    if(checkToken() && auth?.role === roleUser){
      socket = io(ENDPOINT);
      setSocket(socket)
      socket.emit("addUser", auth?._id);
    };
    return;
  },[]);

  return (
    <div>
        <nav className='w-full h-20 px-6 bg-[#f7fafc] border-b flex items-center justify-between'>
            <div className="relative text-gray-600 flex items-center justify-between w-full">
                <p className='font-semibold text-lg md:text-3xl text-blue-400 pl-4"'>
                    Acacia Health Center
                </p>
                { checkToken() && auth?.role === roleUser ? 
                    <div className='space-x-3'>
                      <Link to="/" className='text-gray-500'>Appointments</Link>
                      <Link to="/" className='text-gray-500'>Records</Link>

                    </div>
            :
                null
            }
        </div>


        <div>
        { checkToken() && auth?.role === roleUser ? 
          null
        :
          <button type="button" className="w-full sm:w-auto text-center rounded-full
                border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Login
          </button>
        }
        </div>
      </nav>
    </div>
  )
}

export default Header