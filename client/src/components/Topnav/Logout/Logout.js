import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { MyContext } from '../../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const role = {
    mainRole: "admin"
}

const Logout = () => {

    const {user, setUser, socket} = MyContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("creds");
        setUser();
        socket.disconnect(role);
        navigate("/admin/login", {replace: true});
      }

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-block relative w-full h-full">
            <img src={user?.pic} alt="" className='h-10 w-10 object-cover object-center rounded-full' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                <Menu.Item>
                    <div className='flex no-wrap items-center gap-3 px-1 py-1 mb-1 border-b border-gray-100 text-gray-600'>
                        <img src={user?.pic} alt="" className='h-9 w-9 object-cover object-center rounded-full' />
                        <div>
                            <p className='text-sm'>{user?.firstName} {user?.lastName}</p>
                            <p className='text-[11px]'>Role: Admin</p>
                        </div>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <button className='flex no-wrap items-center gap-2 px-1 py-1 mb-1 border-gray-100 text-gray-600 hover:bg-gray-100 w-full rounded' onClick={logout}>
                        <span>
                            <svg viewBox="0 0 20 20" className="h-6 w-6 fill-current mr-2"><path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z" /></svg>
                        </span>
                        <span>Logout</span>
                    </button>
                </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Logout