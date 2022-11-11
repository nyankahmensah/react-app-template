import { FC, useCallback, useEffect } from 'react'
import { usePagination } from 'react-use-pagination'
import TableBodyComponent from './table-body'
import TableFooterComponent from './table-footer'

interface MiniTableComponentProps<TData = any> {
  title: string;
  itemsCount: number;
  items: TData[];
  itemsLoading?: boolean;
  renderColumns?: FC<TData>;
  renderItem?: FC<TData>;
  renderGridItem?: FC<TData>;
  renderFilter?: FC;
  renderExport?: FC;
  renderLoader?: FC;
  headerActions?: {
    label: string;
    action: any;
  }[];
  disableUrlPagination?: boolean;
  initialPagination?: {
    skip?: number;
    limit?: number;
  },
  setPagination?: (
    pagination: {
      skip: number;
      limit: number;
    }
  ) => void,
  search?: string,
  setSearch?: (search: string) => void,
}

const MiniTableComponent: FC<MiniTableComponentProps> = ({ title, items, itemsCount, itemsLoading, renderColumns, renderItem, headerActions, renderFilter, renderGridItem, renderExport, disableUrlPagination, initialPagination, setPagination, search, setSearch, renderLoader }) => {

  const paginationInstance = usePagination({
    totalItems: itemsCount??0,
    initialPage: Math.floor((initialPagination?.skip ?? 0) / (initialPagination?.limit ?? 10)),
    initialPageSize: initialPagination?.limit ?? 10
  })

  const updateUrl = useCallback(() => {
    setPagination?.({
      limit: paginationInstance.pageSize,
      skip: paginationInstance.currentPage * paginationInstance.pageSize,
    })
  }, [paginationInstance.currentPage, paginationInstance.pageSize, setPagination])

  useEffect(() => {
    updateUrl()
  }, [paginationInstance.currentPage, paginationInstance.pageSize, updateUrl])

  return (
    <div className="">

          <TableBodyComponent
            items={items}
            itemsLoading={itemsLoading}
            renderColumns={renderColumns}
            renderLoader={renderLoader}
            renderItem={renderItem}
          />

          <TableFooterComponent
            noBorder={true}
            itemsCount={itemsCount}
            currentPage={paginationInstance.currentPage}
            startIndex={paginationInstance.startIndex}
            endIndex={paginationInstance.endIndex}
            nextEnabled={paginationInstance.nextEnabled}
            previousEnabled={paginationInstance.previousEnabled}
            pageSize={paginationInstance.pageSize}
            setNextPage={paginationInstance.setNextPage}
            setPreviousPage={paginationInstance.setPreviousPage}
          />
    </div>
  )
}

export default MiniTableComponent