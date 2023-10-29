import React, { useEffect } from 'react';

export default function ProblemListFooter({ range, setPage, page, slice }) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNextClick = () => {
    if (page < range[range.length - 1]) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div className="flex justify-center space-x-2 p-4">
      <button
        type="button"
        className="px-4 py-2 text-white bg-gray-300 hover:bg-gray-400 rounded-lg "
        onClick={handlePrevClick}
      >
        {'<'}
      </button>
      {range.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`px-4 py-2  text-white rounded-lg ${
            page === pageNumber ? 'bg-blue-500' : 'bg-gray-300'
          } hover:bg-gray-400`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className="px-4 py-2 text-white bg-gray-300 hover:bg-gray-400 rounded-lg "
        onClick={handleNextClick}
      >
        {'>'}
      </button>
    </div>
  );
}
