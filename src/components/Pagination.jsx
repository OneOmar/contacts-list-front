const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    // Ensure the page number is within valid bounds
    const isValidPage = page >= 0 && page < totalPages

    if (isValidPage) {
      // Trigger the callback to fetch contacts for the selected page
      onPageChange(page)
    }
  }

  return (
    <div className='pagination'>
      <a
        onClick={() => handlePageChange(currentPage - 1)}
        className={currentPage === 0 ? 'disabled' : ''}
      >
        &laquo;
      </a>
      {[...Array(totalPages).keys()].map((page) => (
        <a
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
          key={page}
        >
          {page + 1}
        </a>
      ))}
      <a
        onClick={() => handlePageChange(currentPage + 1)}
        className={currentPage === totalPages - 1 ? 'disabled' : ''}
      >
        &raquo;
      </a>
    </div>
  )
}

export default Pagination
