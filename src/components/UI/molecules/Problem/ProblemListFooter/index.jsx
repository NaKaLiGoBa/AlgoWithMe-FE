import React, { useEffect } from 'react';

export default function ProblemListFooter({ range, setPage, page, slice }) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="flex justify-center space-x-2 p-4">
      {range.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`px-4 py-2 text-white ${
            page === pageNumber ? 'bg-blue-500' : 'bg-gray-300'
          } hover:bg-blue-700`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
