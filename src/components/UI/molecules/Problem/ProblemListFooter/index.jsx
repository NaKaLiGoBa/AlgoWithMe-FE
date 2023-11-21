import React from 'react';
import { useSelector } from 'react-redux';

export default function ProblemListFooter({
  totalPages,
  setPage,
  currentPage,
}) {
  const { first, last } = useSelector((state) => state.problems);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 p-4">
      {!first && (
        <button
          type="button"
          className="px-[11px] py-[6px]  text-white bg-gray-300 hover:bg-gray-400 rounded-lg "
          onClick={handlePrevClick}
        >
          {'<'}
        </button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`px-[12px] py-[6px]  text-white rounded-lg text-sm ${
            currentPage === pageNumber ? 'bg-blue-500' : 'bg-gray-300'
          } hover:bg-gray-400`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {!last && (
        <button
          type="button"
          className="px-[11px] py-[6px]  text-white bg-gray-300 hover:bg-gray-400 rounded-lg "
          onClick={handleNextClick}
        >
          {'>'}
        </button>
      )}
    </div>
  );
}
