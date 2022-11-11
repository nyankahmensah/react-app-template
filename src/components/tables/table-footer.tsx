import { FC } from "react"
import { classNames, wrapClick } from "utils";

interface TableFooterComponentProps {
  itemsCount: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  nextEnabled: boolean;
  previousEnabled: boolean;
  pageSize: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  noBorder?: boolean
}

const TableFooterComponent: FC<TableFooterComponentProps> = ({
  itemsCount,
  startIndex,
  endIndex,
  nextEnabled,
  setNextPage,
  previousEnabled,
  setPreviousPage,
  noBorder
}) => {
  return (
    <nav
      className={classNames(
        noBorder ? "border-0" : "border",
        "bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between  border-gray-200 dark:border-gray-700 sm:px-6 sm:rounded-lg"
      )}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          {itemsCount > 0 ? <>Showing <span className="font-medium">{startIndex+1}</span> to <span className="font-medium">{endIndex+1}</span> of{' '}
          <span className="font-medium">{itemsCount}</span></> : "No"} results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
        type="button"
        disabled={!previousEnabled}
        onClick={wrapClick(setPreviousPage)}
          className={classNames(
            previousEnabled ? "bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-900 cursor-pointer" : "cursor-not-allowed bg-gray-100 dark:bg-gray-900",
            "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200"
          )}
        >
          Previous
        </button>
        <button
        type="button"
        disabled={!nextEnabled}
        onClick={wrapClick(setNextPage)}
          className={classNames(
            nextEnabled ? "bg-white  dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-900 cursor-pointer" : "cursor-not-allowed bg-gray-100 dark:bg-gray-900",
            "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200"
          )}
        >
          Next
        </button>
      </div>
    </nav>
  )
}

export default TableFooterComponent