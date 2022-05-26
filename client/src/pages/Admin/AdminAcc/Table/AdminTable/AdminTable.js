import React from 'react';
import { request } from '../../../../../utils/axios-utils';
import { useQuery } from 'react-query';
import Delete from '../../../../../components/Buttons/Delete';
import Edit from '../../../../../components/Buttons/Edit';
import View from '../../../../../components/Buttons/View';


const getAdmin = () => {
  return request({url: `/api/admin`, method: `get`});
}

const AdminTable = () => {

  const {data} =  useQuery('admin-accounts', getAdmin);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              FirstName
            </th>
            <th scope="col" className="px-6 py-3">
              LastName
            </th>
            <th scope="col" className="px-6 py-3">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>

        {data?.data.map((admin,id) => (
          <tr className="bg-white border-b hover:bg-gray-50" key={id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <img src={admin?.pic} alt="" className='h-9 w-10 object-cover object-center rounded' />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
               {admin?.username}
              </th>
              <td className="px-6 py-4">{admin?.firstName}</td>
              <td className="px-6 py-4">{admin?.lastName}</td>
              <td className="px-6 py-4">{admin?.createdAt}</td>
              {/* <td className="px-6 py-4">$2999</td> */}
              <td className="px-6 py-4 text-right flex">
                <View/>
                <Edit/>
                <Delete/>
              </td>
        </tr>
        ))}
        

        
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable