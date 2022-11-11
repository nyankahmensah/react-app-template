import { FC, Fragment, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, ArrowPathIcon, BellIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import toast, { Toast, useToaster } from 'react-hot-toast';
import { classNames, wrapClick } from 'utils';
import { useReactiveVar } from '@apollo/client';
import { currentThemeVar } from 'apollo/cache/config';

const Toaster: FC = () => {
  const theme = useReactiveVar(currentThemeVar);

  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        ref={useRef(null)}
        onMouseEnter={startPause}
        onMouseLeave={endPause}
        aria-live="assertive"
        className={classNames(
          theme,
          "fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
        )}
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {toasts
            .filter((toast) => toast.visible)
            .map((toast) => (
              <Transition
                key={toast.id}
                show={true}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='max-w-sm w-full'>
                  <AlertToaster
                    key={toast.id}
                    toast={toast}
                  />
                </div>
              </Transition>
            ))}
        </div>
      </div>
    </>
  )
}

export default Toaster;

interface ToastComponentProps {
  toast: Toast
}

const AlertToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
  const _toastMessage = JSON.parse(_toast.message as string);

  return (
    <div {..._toast.ariaProps} className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className={classNames(
          _toastMessage.description ? "items-start" : "items-center",
          "flex"
        )}>
          <div className="flex-shrink-0">
            {_toastMessage.type === "success" && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
            {_toastMessage.type === "error" && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
            {_toastMessage.type === "loading" && <ArrowPathIcon className="h-6 w-6 text-gray-400 animate-spin" aria-hidden="true" />}
            {_toastMessage.type === "notification" && <BellIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />}
            {_toastMessage.type === "warning" && <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />}
          </div>
          <div className={classNames(
            _toastMessage.description ? "pt-0.5" : "",
            _toastMessage.type ? "ml-3" : "",
            "w-0 flex-1 flex justify-between items-start"
          )}>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{_toastMessage.title}</p>
              {_toastMessage.description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{_toastMessage.description}</p>}
              {_toastMessage.actions && (
                <div className="mt-3 flex space-x-7">
                  <button
                    type="button"
                    className="rounded-md text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Undo
                  </button>
                  <button
                    type="button"
                    className="rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
            {_toastMessage.undoable && (
              <button
                type="button"
                className="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Undo
              </button>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="rounded-md inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              onClick={wrapClick(() => toast.dismiss(_toast.id))}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

// const UndoableToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
//   const _toastMessage = JSON.parse(_toast.message as string);

//   return (
//     <div {..._toast.ariaProps} className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
//       <div className="p-4">
//         <div className="flex items-start">
//           <div className="flex-shrink-0">
//             <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
//           </div>
//           <div className="ml-3 w-0 flex-1 pt-0.5">
//             <p className="text-sm font-medium text-gray-900">{_toastMessage.title}</p>
//             <p className="mt-1 text-sm text-gray-500">{_toastMessage.description}</p>
//             <div className="mt-3 flex space-x-7">
//               <button
//                 type="button"
//                 className="bg-white rounded-md text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               >
//                 Undo
//               </button>
//               <button
//                 type="button"
//                 className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//           <div className="ml-4 flex-shrink-0 flex">
//             <button
//               className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               onClick={wrapClick(() => toast.dismiss(_toast.id))}
//             >
//               <span className="sr-only">Close</span>
//               <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const InviteToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
//   const _toastMessage = JSON.parse(_toast.message as string);

//   return (
//     <div {..._toast.ariaProps} className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
//       <div className="p-4">
//         <div className="flex items-start">
//           <div className="flex-shrink-0 pt-0.5">
//             <img
//               className="h-10 w-10 rounded-full"
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
//               alt=""
//             />
//           </div>
//           <div className="ml-3 w-0 flex-1">
//             <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
//             <p className="mt-1 text-sm text-gray-500">Sent you an invite to connect.</p>
//             <div className="mt-4 flex">
//               <button
//                 type="button"
//                 className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               >
//                 Accept
//               </button>
//               <button
//                 type="button"
//                 className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               >
//                 Decline
//               </button>
//             </div>
//           </div>
//           <div className="ml-4 flex-shrink-0 flex">
//             <button
//               className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//               onClick={wrapClick(() => toast.dismiss(_toast.id))}
//             >
//               <span className="sr-only">Close</span>
//               <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const NewMessageToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
//   const _toastMessage = JSON.parse(_toast.message as string);

//   return (
//     <div {..._toast.ariaProps} className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
//       <div className="w-0 flex-1 p-4">
//         <div className="flex items-start">
//           <div className="flex-shrink-0 pt-0.5">
//             <img
//               className="h-10 w-10 rounded-full"
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
//               alt=""
//             />
//           </div>
//           <div className="ml-3 w-0 flex-1">
//             <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
//             <p className="mt-1 text-sm text-gray-500">Sure! 8:30pm works great!</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex border-l border-gray-200">
//         <button
//           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           onClick={wrapClick(() => toast.dismiss(_toast.id))}
//         >
//           Reply
//         </button>
//       </div>
//     </div>
//   )
// }

// const AlertMessageToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
//   const _toastMessage = JSON.parse(_toast.message as string);

//   return (
//     <div {..._toast.ariaProps} className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 divide-x divide-gray-200">
//       <div className="w-0 flex-1 flex items-center p-4">
//         <div className="w-full">
//           <p className="text-sm font-medium text-gray-900">Receive notifications</p>
//           <p className="mt-1 text-sm text-gray-500">Notifications may include alerts, sounds, and badges.</p>
//         </div>
//       </div>
//       <div className="flex">
//         <div className="flex flex-col divide-y divide-gray-200">
//           <div className="h-0 flex-1 flex">
//             <button
//               className="w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-pink-500"
//               onClick={wrapClick(() => toast.dismiss(_toast.id))}
//             >
//               Reply
//             </button>
//           </div>
//           <div className="h-0 flex-1 flex">
//             <button
//               className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               onClick={wrapClick(() => toast.dismiss(_toast.id))}
//             >
//               Don't allow
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }