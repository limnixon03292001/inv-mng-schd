import React, {useEffect} from 'react'
import Notification from './Notification/Notification'
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { MyContext } from '../../context/ContextProvider'
import Logout from './Logout/Logout';

const ENDPOINT = "http://localhost:5000/";
var socket;

const Topnav = ({setOpen, open}) => {

    const {setSocket, setAdminNotif, adminNotif} = MyContext();
    const auth = JSON.parse(localStorage.getItem("creds"));

      //initiating sockets
    useEffect(() => {
        socket = io(ENDPOINT);
        setSocket(socket)
        socket.emit("addAdmin", auth?._id);
        console.log("fire")
    },[]);

    useEffect(() => {
        socket.on("notifReceived", (newNotif) => {
              // refetch();
              
              setAdminNotif([ newNotif, ...adminNotif]); 
              console.log("all notif", adminNotif)
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10 rounded-full object-cover object-center"
                          src={newNotif?.pic}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="mt-1 text-xs text-gray-500">
                            {newNotif?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))
        });
    },[]) 

  return (
    <div className='sticky top-0 z-10'>
        <div className="w-full h-20 px-6 bg-[#f7fafc] border-b flex items-center justify-between">
            <div className="flex">
                <div className="inline-block lg:hidden flex items-center mr-4">
                    <button className="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" onClick={() => setOpen(!open)}>
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="relative text-gray-600">
                    <p className='font-semibold text-lg md:text-3xl text-blue-400 pl-4"'>
                        Acacia Health Center Management System
                    </p>
                </div>
            </div>
            <div className="flex items-center relative gap-3">
                <Notification/>
                <Logout/>
            </div>
        </div>
    </div>
  )
}

export default Topnav