import { FC, useCallback, useEffect } from 'react'
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
  renderFilter?: FC<{filterOpen: boolean; setFilterOpen: (val: boolean) => void}>;
  renderExport?: FC<{exportOpen: boolean; setExportOpen: (val: boolean) => void}>;
  renderLoader?: FC;
  renderHeaderItems?: FC;
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
  refetch: () => void;
}

type PaginationSearchGenerics = MakeGenerics<{
  Search: {
    page?: number;
    pageSize?: number;
  }
}>

const TableComponent: FC<TableComponentProps> = ({ title, items, itemsCount, itemsLoading, renderColumns, renderItem, headerActions, renderFilter, renderGridItem, renderExport, disableUrlPagination, initialPagination, setPagination, refetch, search, setSearch, renderLoader, renderHeaderItems }) => {

  const searchParams = useSearch<PaginationSearchGenerics>();
  const navigate = useNavigate<PaginationSearchGenerics>()

  const paginationInstance = usePagination({
    totalItems: itemsCount??0,
    initialPage: disableUrlPagination ? Math.floor((initialPagination?.skip ?? 0) / (initialPagination?.limit ?? 10)) : (searchParams.page??0),
    initialPageSize: (disableUrlPagination ? initialPagination?.limit : searchParams.pageSize) ?? 10
  })

  const updateUrl = useCallback(
  () => {
    setPagination?.({
      limit: paginationInstance.pageSize,
      skip: (paginationInstance.currentPage >= 0 ? paginationInstance.currentPage : 0) * paginationInstance.pageSize,
    })
    navigate({
      search: (old) => ({
        ...old,
        page: paginationInstance.currentPage >= 0 ? paginationInstance.currentPage : 0,
        pageSize: paginationInstance.pageSize
      }),
    })
  }, [navigate, paginationInstance.currentPage, paginationInstance.pageSize, setPagination])

  useEffect(() => {
    updateUrl()
  }, [paginationInstance.currentPage, paginationInstance.pageSize, updateUrl])

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
        search={search}
        renderHeaderItems={renderHeaderItems}
        setSearch={setSearch}
      />
      {((!itemsLoading) && (itemsCount === 0)) ? (
        <TableEmptyComponent

        />
      ) : (
        <>

          <TableBodyComponent
            items={items}
            itemsLoading={itemsLoading}
            renderColumns={renderColumns}
            renderLoader={renderLoader}
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