import { FC, useEffect } from 'react'
import { MakeGenerics, useNavigate, useSearch } from 'react-location'
import { usePagination } from 'react-use-pagination'
import TableBodyComponent from './table-body'
import TableEmptyComponent from './table-empty'
import TableFooterComponent from './table-footer'
import TableHeaderComponent from './table-header'

interface TableComponentProps<TData = any> {
  title: string;
  itemsCount: number;
  items: TData[];
  itemsLoading?: boolean;
  renderColumns?: FC<TData>;
  renderItem?: FC<TData>;
  renderGridItem?: FC<TData>;
  renderFilter?: FC;
  renderExport?: FC;
  headerActions?: {
    label: string;
    action: any;
  }[];
  disableUrlPagination?: boolean;
  pagination?: {
    skip?: number;
    limit?: number;
  },
  setPagination?: (
    pagination: {
      skip?: number;
      limit?: number;
    }
  ) => void,
  refetch: () => void;
}

type PaginationSearchGenerics = MakeGenerics<{
  Search: {
    page?: number;
    pageSize?: number;
  }
}>

const TableComponent: FC<TableComponentProps> = ({ title, items, itemsCount, itemsLoading, renderColumns, renderItem, headerActions, renderFilter, renderGridItem, renderExport, disableUrlPagination, pagination, setPagination, refetch }) => {

  const search = useSearch<PaginationSearchGenerics>();
  const navigate = useNavigate<PaginationSearchGenerics>()

  const paginationInstance = usePagination({
    totalItems: itemsCount,
    initialPage: disableUrlPagination ? Math.floor((pagination?.skip ?? 0) / (pagination?.limit ?? 10)) : search.page,
    initialPageSize: (disableUrlPagination ? pagination?.limit : search.pageSize) ?? 10
  })

  useEffect(() => {
    setPagination?.({
      limit: paginationInstance.pageSize,
      skip: paginationInstance.currentPage * paginationInstance.pageSize,
    })
  }, [paginationInstance.currentPage, paginationInstance.pageSize])

  const updateUrl = () => {
    navigate({
      search: (old) => ({
        ...old,
        page: paginationInstance.currentPage,
        pageSize: paginationInstance.pageSize
      }),
    })
  }

  useEffect(() => {
    updateUrl()
  }, [paginationInstance.currentPage, paginationInstance.pageSize])

  return (
    <div className="space-y-6">
      <TableHeaderComponent
        title={title}
        actions={headerActions}
        renderFilter={renderFilter}
        renderExport={renderExport}
        gridable={!!renderGridItem}
        setPageSize={paginationInstance.setPageSize}
        pageSize={paginationInstance.pageSize}
        refetch={refetch}
      />
      {(!itemsLoading && itemsCount === 0) ? (
        <TableEmptyComponent

        />
      ) : (
        <>
          <TableBodyComponent
            items={items}
            renderColumns={renderColumns}
            renderItem={renderItem}
          />

          <TableFooterComponent
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
        </>
      )
      }
    </div>
  )
}

export default TableComponent