import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { ChangeEvent } from 'react';

export default function ParliamentTicketingPagination({
  count = 50,
  lastPage = 4,
  pages,
  setPages,
  rows,
  setRows,
  from,
  to,
}: {
  count: number;
  lastPage: number;
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  from: number;
  to: number;
}) {
  // const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (type: 'add' | 'minus') => {
    var currentPage = pages;
    if (type === 'add' && pages < lastPage) {
      currentPage += 1;
    } else if (type === 'minus' && pages > 1) {
      currentPage -= 1;
    }
    setPages(currentPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRows(parseInt(event.target.value, 10));
    setPages(1);
  };

  return (
    <div
    // className="px-4 sm:px-6 lg:px-8"
    >
      <div className="flex py-3.5 items-center justify-end gap-[30px] text-body1 text-textPrimary border-b border-t bg-secondary/20 border-muted/50">
        <div className="flex gap-2 items-center ">
          <div className="text-body1 text-textPrimary">Show</div>
          <select
            value={rows}
            onChange={handleChangeRowsPerPage}
            className="border w-[70px] border-linePrimary px-2 py-1 rounded focus:outline-none focus:border-linePrimary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="text-textPrimary">{`${from}-${to} of ${count}`}</div>

        <div className="flex ">
          <button
            className="w-[35px] h-[35px] flex items-center justify-center disabled:text-muted"
            onClick={() => setPages(1)}
            disabled={pages === 1}
          >
            <BsChevronBarLeft size={20} />
          </button>
          <button
            className="w-[35px] h-[35px] flex items-center justify-center disabled:text-muted"
            onClick={() => handleChangePage('minus')}
            disabled={pages === 1}
          >
            <BsChevronLeft size={18} />
          </button>
          <button
            className="w-[35px] h-[35px] flex items-center justify-center disabled:text-muted"
            onClick={() => handleChangePage('add')}
            disabled={pages === lastPage}
          >
            <BsChevronRight size={18} />
          </button>
          <button
            className="w-[35px] h-[35px] flex items-center justify-center disabled:text-muted"
            onClick={() => setPages(lastPage)}
            disabled={pages === lastPage}
          >
            <BsChevronBarRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
