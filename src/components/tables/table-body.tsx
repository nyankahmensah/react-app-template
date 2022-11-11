import _ from "lodash";
import { FC } from "react";

interface TableBodyComponentProps<TData = any> {
  items: TData[];
  renderColumns?: FC;
  renderItem?: FC<TData>;
  renderLoader?: FC;
  itemsLoading?: boolean;
}

const TableBodyComponent: FC<TableBodyComponentProps> = ({ renderColumns, items, renderItem, itemsLoading, renderLoader }) => {

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 no-scrollbar">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                {renderColumns?.({}) ?? (
                  <tr>
                    {Object.keys(items[0]).filter(field => !_.isObject(items[0][field])).map((field) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                      >
                        {_.startCase(field)}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {itemsLoading ? (
                  renderLoader?.({}) ?? (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex-1">
                        <div className="bg-gray-500 dark:bg-gray-400 h-3 rounded-md w-full animate-pulse"/>
                      </td>
                  </tr>
                  )
                ) : (
                  items?.map((item) => renderItem?.(item) ?? (
                    <tr key={item._id}>
                      {Object.keys(items[0]).filter(field => !_.isObject(items[0][field])).map((field) => (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {_.isBoolean(item[field]) ? item[field] ? "Yes" : "No" : item[field]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-800">
                {renderColumns?.({}) ?? (
                  <tr>
                    {Object.keys(items[0]).filter(field => !_.isObject(items[0][field])).map((field) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                      >
                        {_.startCase(field)}
                      </th>
                    ))}
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableBodyComponent;