import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Form from './Form/Form'

const GetAppointmentBtn = ({ds}) => {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
    setIsOpen(false)
    }

    function openModal() {
    setIsOpen(true)
    }


  return (
    <div>
        <div>
            <button
                type="button"
                onClick={openModal}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
                Get Appointment
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
                <Dialog.Panel className="w-full md:w-1/3 h-1/3 transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                    <Form closeModal={closeModal} ds={ds}/>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition>
    </div>
  )
}

export default GetAppointmentBtn