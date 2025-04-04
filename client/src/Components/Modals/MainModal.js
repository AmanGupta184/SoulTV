import React, { Fragment, useRef } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
  const cancelButtonRef = useRef();
  return (
    <>
      <Transition show={modalOpen} as={Fragment} appear>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto text-center"
          initialFocus={cancelButtonRef}
          onClose={() => setModalOpen(false)}
        >
          <div className="min-h-screen px-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0"
            >
              <Dialog onClose={()=>setModalOpen(false)} className="fixed inset-0 bg-black opacity-60" />
            </TransitionChild>
            <span className="inline-block h-screen align-middle" aria-hidden={true}>
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </TransitionChild>
            <div className="absolute right-5 top-5">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
              >
                <IoClose />
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MainModal;
