import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import AddAdminBtn from '../AddAdminModal/AddAdminBtn';
import Search from '../../../../components/Search/Search';
import AdminTable from '../Table/AdminTable/AdminTable';
import DoctorTable from '../Table/DoctorTable/DoctorTable';
import AddDoctorBtn from '../AddDoctorModal.js/AddDoctorBtn';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const AccountTab = () => {

    let [categories] = useState({
        Admin: "Admin",
        Doctor: "Doctor"
    });

  return (
    <div>
        <Tab.Group as="div" className="relative">
            <Tab.List className="flex w-1/3 space-x-1 rounded-xl bg-blue-500 p-1">
                {Object.keys(categories).map((category) => (
                    <Tab
                    key={category}
                    className={({ selected }) =>
                        classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                    }
                    >
                    {category}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel
                className={classNames(
                    'rounded-xl bg-white p-3'
                )}
                >
                    <div className='flex items-center justify-between mb-2 px-3'>
                        <AddAdminBtn/>
                        <Search/>
                    </div>
                    <AdminTable />
                </Tab.Panel>
                <Tab.Panel
                className={classNames(
                    'rounded-xl bg-white p-3',
                )}
                >
                    <div className='flex items-center justify-between mb-2 px-3'>
                        <AddDoctorBtn/>
                        <Search/>
                    </div>
                    <DoctorTable/>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default AccountTab