import './style.css';

const CustomPagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];
  if (totalPages > 3) {
    // Only show 3 pages: [prev, 1, 2, 3, next]
    if (currentPage === 1) {
      pageNumbers.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    }
  } else {
    // If there are 3 or fewer pages, show all of them
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }
    const firstItem = (currentPage - 1) * itemsPerPage + 1;
    const lastItem = Math.min(currentPage * itemsPerPage, totalItems);
  
    return (
      <div className="paginationBar align-items-center">
        <p> {firstItem} - {lastItem} out of {totalItems} Entries</p>
        <ul>
          <li><button 
          onClick={() => onPageChange(currentPage-1)}
          disabled={currentPage === 1}
          >Prev</button></li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button className={`${currentPage === pageNumber?'active':''}`} onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li><button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage+1)}>Next</button></li>
        </ul>
      </div>
    );
  };
  
  export default CustomPagination;

