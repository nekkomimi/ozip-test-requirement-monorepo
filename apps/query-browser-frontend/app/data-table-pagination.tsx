import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Table } from "@tanstack/react-table"
  
  import { Button } from "@/components/ui/button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {useState} from "react";
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }
  
  export function DataTablePagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
      const [startRow, setStartRow] = useState(0);
      const [endRow, setEndRow] = useState(10);

      const handlePrevPage = () => {
          if (!table.getCanPreviousPage()) return; // Do nothing if already on first page
          const pageSize = table.getState().pagination.pageSize;
          const newStartRow = Math.max(startRow - pageSize, 0);
          const newEndRow = Math.max(endRow - pageSize, pageSize);
          setStartRow(newStartRow);
          setEndRow(newEndRow);
          table.previousPage();
      };

      const handleNextPage = () => {
          if (!table.getCanNextPage()) return; // Do nothing if already on last page
          const pageSize = table.getState().pagination.pageSize;
          const newStartRow = Math.min(startRow + pageSize, table.getRowCount());
          const newEndRow = Math.min(endRow + pageSize, table.getRowCount());
          setStartRow(newStartRow);
          setEndRow(newEndRow);
          table.nextPage();
      };

      const handleFirstPage = () => {
          setStartRow(0);
          const pageSize = table.getState().pagination.pageSize;
          const newEndRow = Math.min(pageSize, table.getRowCount());
          setEndRow(newEndRow);
          table.setPageIndex(0);
      };

      const handleLastPage = () => {
          const pageCount = table.getPageCount();
          const lastPageIndex = pageCount - 1;
          setStartRow(lastPageIndex * table.getState().pagination.pageSize);
          setEndRow(table.getRowCount());
          table.setPageIndex(lastPageIndex);
      };

    return (
      <div className="flex items-center justify-end px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {/*{table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
          {/*{table.getFilteredRowModel().rows.length} row(s) selected.*/}
            Showing rows {startRow + 1} to {endRow} of {table.getRowCount()}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleFirstPage}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePrevPage}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleLastPage}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
