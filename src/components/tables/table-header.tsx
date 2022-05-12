import { FC, Fragment, useEffect, useRef, useState } from 'react'
import {
  SearchIcon,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
  FilterIcon,
  DownloadIcon,
  RefreshIcon,
  CheckIcon,
  ChevronDownIcon
} from '@heroicons/react/solid'
import { classNames, wrapClick, wrapOnchange } from 'utils'
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { Listbox, Transition } from '@headlessui/react';

interface TableHeaderComponentProps {
  title: string;
  actions?: {
    label: string;
    action: any;
  }[];
  renderFilter?: FC;
  renderExport?: FC;
  gridable?: boolean;
  pageSize: number;
  setPageSize: (val: number) => void;
  refetch: () => void;
}

const limits = [
  10,
  20,
  50,
  100
]

const TableHeaderComponent: FC<TableHeaderComponentProps> = ({ title, actions, renderFilter, gridable, renderExport, pageSize, setPageSize, refetch }) => {

  const [searchPressed] = useKeyboardJs("command > k");
  const [escapePressed] = useKeyboardJs("esc");
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (searchPressed === true) {
      searchRef?.current?.focus()
    }
  }, [searchPressed])

  useEffect(() => {
    if (escapePressed === true) {
      searchRef?.current?.blur()
    }
  }, [escapePressed])
  const [search, setSearch] = useState("")


  return (
    <div className="px-4 sm:px-6 md:px-0">
      <div className="flex">
        <div className="flex-1 sm:flex sm:items-center">
          {/* <div className="sm:flex-1">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-700">
              A table of placeholder stock market data that does not make any sense.
            </p>
          </div> */}
          {actions && <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-2">
            {actions?.map((action, key) => (
              <button
                key={key}
                type="button"
                onClick={wrapClick(action.action)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
              >
                {action.label}
              </button>
            ))}
          </div>}
        </div>
        <div className="ml-6 flex items-end sm:hidden">
          <div className="bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
            <button
              type="button"
              className="p-1.5 rounded-md text-gray-500 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <ViewListIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Use list view</span>
            </button>
            <button
              type="button"
              className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Use grid view</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-3 sm:mt-2">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
            defaultValue="Recently Viewed"
          >
            <option>Recently Viewed</option>
            <option>Recently Added</option>
            <option>Favorited</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center">
            <div className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
              <div className="w-1/2 relative text-gray-500 dark:text-gray-200 focus-within:text-gray-500 dark:focus-within:text-gray-300">
                <label htmlFor="search" className="sr-only">
                  Search Waya
                </label>
                <input
                  ref={searchRef}
                  id="search"
                  type="search"
                  placeholder="Search Waya"
                  onChange={wrapOnchange(setSearch)}
                  className="block w-full rounded-md border-gray-200 dark:border-gray-700 pl-8 py-1.5 placeholder-gray-500 dark:placeholder-gray-300 dark:text-white focus:border-gray-300 dark:focus:border-gray-600 sm:text-sm focus:ring-0 dark:bg-gray-900"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-2">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {!search && <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center justify-center">
                  <span className="hidden sm:block text-gray-500 dark:text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 dark:border-gray-600 rounded-md" style={{ opacity: 1 }}>
                    <span className="sr-only">Press </span>
                    <kbd className="font-sans">
                      <abbr title="Command" className="no-underline">⌘</abbr>
                    </kbd>
                    <span className="sr-only"> and </span>
                    <kbd className="font-sans">K</kbd>
                    <span className="sr-only"> to search</span>
                  </span>
                </div>}
              </div>
            </div>
            {gridable && (
              <div className="hidden ml-6 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg items-center sm:flex">
                <button
                  type="button"
                  className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Use list view</span>
                </button>
                <button
                  type="button"
                  className="ml-0.5 bg-white dark:bg-gray-900 p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Use grid view</span>
                </button>
              </div>
            )}
            {renderFilter ? (
              <div className="hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex divide-x  divide-gray-300 dark:divide-gray-600">
                <button
                  type="button"
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-l-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Filter items</span>
                </button>
                <button
                  type="button"
                  onClick={wrapClick(refetch)}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-r-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <RefreshIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Refresh</span>
                </button>
              </div>
            ) : (
              <div className="hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex">
                <button
                  type="button"
                  onClick={wrapClick(refetch)}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <RefreshIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Refresh</span>
                </button>
              </div>
            )}
            {renderExport && (
            <div className="hidden ml-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:flex">
              <button
                type="button"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-1.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                <DownloadIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Export data</span>
              </button>
            </div>
            )}

            <div className='ml-3'>
              <Listbox value={pageSize} onChange={setPageSize}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="sr-only">Change limit</Listbox.Label>
                    <div className="relative">
                      <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-pink-600">
                        <div className="relative bg-pink-500 items-center inline-flex px-2 border border-transparent rounded-l-lg text-white">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          <p className="text-sm font-medium">{pageSize} items</p>
                        </div>
                        <Listbox.Button className="relative inline-flex items-center bg-pink-500 p-2 py-2 rounded-l-none rounded-r-lg text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:z-10 focus:none focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-pink-500">
                          <span className="sr-only">Change limit</span>
                          <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </Listbox.Button>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-16 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {limits.map((limit) => (
                            <Listbox.Option
                              key={limit}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white dark:text-gray-900 bg-pink-500' : 'text-gray-900 dark:text-gray-100',
                                  'cursor-default select-none relative p-2 text-sm'
                                )
                              }
                              value={limit}
                            >
                              {({ selected, active }) => (
                                <div className="flex flex-col">
                                  <div className="flex justify-between items-center">
                                    <p className={selected ? 'font-semibold' : 'font-normal'}>{limit}</p>
                                    {selected ? (
                                      <span className={active ? 'text-white dark:text-gray-900' : 'text-pink-500'}>
                                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableHeaderComponent