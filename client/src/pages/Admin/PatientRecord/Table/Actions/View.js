import React from 'react';
import { Link } from 'react-router-dom';

const View = ({ patientId }) => {
  return (
    <div>
        <Link to={`/admin/patient/${patientId}`}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
            View
        </Link>
    </div>
  )
}

export default View