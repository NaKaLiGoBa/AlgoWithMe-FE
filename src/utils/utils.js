function formatPercentage(input) {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  if (isNaN(num)) {
    return 'Invalid input';
  }
  return `${(num * 100).toFixed(1)}`;
}

export { formatPercentage };
