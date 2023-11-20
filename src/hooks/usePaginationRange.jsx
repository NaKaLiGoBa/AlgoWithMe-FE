import { useState, useEffect } from 'react';

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i += 1) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) =>
  data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const usePaginationRange = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange(range);

    const slicedData = sliceData(data, page, rowsPerPage);
    setSlice(slicedData);
  }, [data, page, rowsPerPage]);

  return { slice, range: tableRange };
};

export default usePaginationRange;
export {sliceData, calculateRange};
