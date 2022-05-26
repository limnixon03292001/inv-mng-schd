import React from 'react'
import AccountTab from './AccountTab/AccountTab'


const AdminAcc = () => {
  return (
    <div className="p-6 bg-[#f7fafc] mb-20">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-4">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <p className="text-gray-600 text-3xl">Manage Accounts</p>
                </li>
            </ol>
        </nav>
        <div className="-mx-3 mb-20">

            <AccountTab/>
        
        </div>
    </div>
  )
}

export default AdminAcc