import React from 'react'
import DoctorSchedTable from './Table/DoctorSchedTable'

const DoctorSchedules = ({roleUser, auth}) => {
  return (
    <div>
         {/* Table section */}
         <div>
          <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-4 mt-4 px-6 py-4">
              <ol className="list-none p-0 inline-flex">
                  <li className="flex items-center">
                      <p className="text-gray-600 font-semibold text-lg md:text-3xl">Doctor Schedule List</p>
                  </li>
              </ol>
          </nav>

          <DoctorSchedTable roleUser={roleUser} auth={auth} s/>
        
      </div>

    </div>
  )
}

export default DoctorSchedules