import React from 'react'
import AppointmentTable from './Table/AppointmentTable'

const Appointments = () => {
  return (
    <div className="p-6 bg-[#f7fafc] mb-20">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-4 mt-4 py-4">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg md:text-3xl">Appointments</p>
                </li>
            </ol>
        </nav>

        <div className="-mx-3 mb-20">
            <AppointmentTable />
        </div>
    </div>
  )
}

export default Appointments