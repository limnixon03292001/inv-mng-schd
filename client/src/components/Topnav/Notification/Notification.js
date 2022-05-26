import React, { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../context/ContextProvider';
import { request } from '../../../utils/axios-utils';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import moment from 'moment';

const getNotif = () => {
    return request({url: `/api/notification/`, method: `get`});
}

const Notification = () => {

    const { adminNotif, setAdminNotif } = MyContext();
    
    const {isLoading} = useQuery('notifications', getNotif, {
        onSuccess: (data) => {
            setAdminNotif(data?.data);
            console.log("fetch", adminNotif)
          },
        onError: (err) => {
            const error = JSON.parse(err?.request?.response)
            toast.error(`Error: ${error.err}`);
        }
    });

  
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-block relative w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" height={34} viewBox="0 0 24 24" width={34} className="fill-current mr-3 hover:text-blue-500 block "><path d="M0 0h24v24H0z" fill="none" /><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
            <span className='bg-red-500 text-white border border-[#f7fafc] rounded-full px-[7px] py-[2px] text-xs absolute -top-1 right-1'>{adminNotif?.length}</span>
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
          <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                <h3 className='px-1 py-1 mb-1 border-b border-gray-100'>Notifications</h3>
                <div className='max-h-[390px] w-full overflow-y-auto'>
                  {adminNotif?.map((notif,id) => (
                      <div className="px-1 py-2 border-b border-gray-100 hover:bg-gray-100 rounded-md" key={id}>
                          <Menu.Item>
                              <Link to="/admin/appointments" className='block text-xs text-gray-500'>
                                  <div className='flex items-center gap-3'>
                                      <img src={notif?.pic} alt="pic" className='object-cover object-center h-12 w-12 rounded-full'/>
                                      <p>{notif?.description}</p>
                                  </div>
                                  <span className="text-[10px] w-full inline-block text-gray-400 text-right">{moment(notif?.createdAt).fromNow()}.</span>
                              </Link>
                          </Menu.Item>
                      </div>
                  ))}
                </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Notification