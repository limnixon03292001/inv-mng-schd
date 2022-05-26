import React from 'react'
import AddSchedBtn from './AddScheduleModal/AddSchedBtn'
import DoctorSchedTable from './Table/DoctorSchedTable'

const DoctorSchedule = () => {
  return (
    <div className="p-6 bg-[#f7fafc] mb-20">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-4">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <p className="text-gray-600 text-3xl">Doctor Schedule</p>
                </li>
            </ol>
        </nav>
        <div className="-mx-3 mb-20">
            <div className='flex items-center justify-between mb-2 px-3'>
                <AddSchedBtn />
                {/* <Search/> */}
             </div>
            <DoctorSchedTable />
        </div>
    </div>
  )
}

export default DoctorSchedule