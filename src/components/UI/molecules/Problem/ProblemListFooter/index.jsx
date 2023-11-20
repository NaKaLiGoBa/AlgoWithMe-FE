import React from 'react';

export default function ProblemListFooter({
  totalPages,
  setPage,
  currentPage,
}) {
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
      <button
        type="button"
        className="px-4 py-2 text-white bg-gray-300 hover:bg-gray-400 rounded-lg "
        onClick={handlePrevClick}
      >
        {'<'}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`px-4 py-2  text-white rounded-lg ${
            currentPage === pageNumber ? 'bg-blue-500' : 'bg-gray-300'
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
