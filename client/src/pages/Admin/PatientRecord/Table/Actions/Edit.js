import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from 'react-datepicker';
import { MyContext } from '../../../../../context/ContextProvider';

const Edit = ({patient}) => {

  let [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [records, setRecords] = useState(
    {
      firstName: patient?.firstName,
      lastName: patient?.lastName,
      age: patient?.age,
      religion: patient?.religion,
      contact: patient?.contact,
      address: patient?.address,
      birthPlace: patient?.birthPlace,
      gender: patient?.gender,
      status: patient?.status,
    }
  )

  // console.log(patient)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const postDetails = (pics) => {
    if(pics === undefined){
        // toast.error('Please select an Image!');
        return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
        // setIsUploadingPic(true);
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "securing-future");
        // mutate(data);
    }else{
        console.log("error");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
    <div>
      <button
        type="button"
        onClick={openModal}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Edit
      </button>
    </div>

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-30 inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-40">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* w-2/3 */}
              <Dialog.Panel className="w-full md:w-2/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                <p className="text-gray-600 text-3xl font-semibold">Edit</p>
                
                <form className='w-full' onSubmit={(e) => handleSubmit(e)}>

                  <div className="grid grid-cols-2 gap-6">

                  <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setRecords({firstName: e.target.value, ...records})} value={records.firstName} />

                      <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setRecords({lastName: e.target.value, ...records})} value={records.lastName} />
                      <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  </div>
              </div>
          
              <div className="grid grid-cols-2 gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                      <input type="number" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setRecords({age: e.target.value, ...records})} value={records.age} />
                      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                      onChange={(e) => setRecords({religion: e.target.value, ...records})} value={records.religion} />
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Religion</label>
                  </div>
              </div>
          
              <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                  <input type="number" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                   onChange={(e) => setRecords({contact: e.target.value, ...records})} value={records.contact}/>
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+639)</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                 onChange={(e) => setRecords({address: e.target.value, ...records})} value={records.address}/>
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                  </div>
              </div> 
              <div className="grid grid-cols-2 gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                      <input type="text" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  
                    onChange={(e) => setRecords({birthPlace: e.target.value, ...records})} value={records.birthPlace}/>
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birth place</label>
                  </div>
              </div>
              <div className="flex flex-wrap gap-1 xl:gap-6 mb-4 items-center">
                  {/* <div className="relative w-full group flex-1">
                      <label className=' text-sm text-gray-500 '>Gender</label>
                      <SelectGender genderSelected={genderSelected} setGenderSelected={setGenderSelected} gender={gender}/>
                  </div>
                  <div className="relative w-full group flex-1">
                      <label className=' text-sm text-gray-500 '>Civil Status</label>
                      <SelectStatus statusSelected={statusSelected} setStatusSelected={setStatusSelected} status={status}/>
                  </div> */}
                  <div className="relative w-full group flex-1">
                      <label className=' text-sm text-gray-500 '>Date of birth</label>
                      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy'
                      className="rounded-lg border border-gray-200 p-2 w-36 md:w-44" placeholderText='dd/MM/yyyy'/>
                  </div>
                  {/* profile */}
                  <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload picture.</label>
                      <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={(e) => postDetails(e.target.files[0])} accept="image/*"/>
                      {/* {isUploadingPic && 
                      <div className='flex gap-2 items-center text-gray-700'>
                          <Spinner/>
                          <span>Uploading...</span>
                      </div>} */}
                      <div className="mt-1 text-xs text-gray-500" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
                  </div>
              </div> 
                <div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center rounded-full">Update</button>
                </div>
                </form>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  )
}

const selectGender = () => {

}





export default Edit