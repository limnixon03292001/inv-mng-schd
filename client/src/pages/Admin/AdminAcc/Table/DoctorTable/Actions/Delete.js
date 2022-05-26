import React from 'react'
import { request } from '../../../../../../utils/axios-utils';
import { useMutation } from 'react-query';

const deleteDoctor = (data) => {
  return request({url: `/api/doctor`, method: `delete`, data: data});
}

const Delete = ({id})=> {

  const {mutate} = useMutation(deleteDoctor,{
    onSuccess: (data) => {
      console.log("success",data?.data);
    }
  })


  console.log("delete",id);
  return (
    <div>
        <button
        type="button"
        onClick={() => mutate({id: id})}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
        Delete
        </button>
    </div>
  )
}

export default Delete