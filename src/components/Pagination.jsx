import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    const range = 2; // Gösterilecek sayfalar arası aralık
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(totalPages, currentPage + range);

    // İlk sayfa ve önceki butonları ekle
    if (currentPage > 1) {
      pages.push("first");
      pages.push("previous");
    }

    // Sayfa numaralarını ekle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Daha fazla sayfa varsa ellipsis ekle
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Sonraki ve son sayfa butonlarını ekle
    if (currentPage < totalPages) {
      pages.push("next");
      pages.push("last");
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex text-sm font-bold mt-12">
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <button
              key={index}
              className="p-4 text-primary-color border-2 border-[#BDBDBD] border-r-[#E8E8E8]"
              disabled
            >
              ...
            </button>
          );
        } else if (page === "next") {
          return (
            <button
              key={index}
              className={`p-4 ${
                currentPage === totalPages - 1
                  ? "bg-primary-color text-white"
                  : "text-primary-color"
              } border-2 border-[#BDBDBD] border-r-[#E8E8E8]`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          );
        } else if (page === "previous") {
          return (
            <button
              key={index}
              className={`p-4 ${
                currentPage === 0
                  ? "bg-primary-color text-white"
                  : "text-primary-color"
              } border-2 border-[#BDBDBD] border-r-[#E8E8E8]`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 0}
            >
              Previous
            </button>
          );
        } else if (page === "first") {
          return (
            <button
              key={index}
              className={`p-4 ${
                currentPage === 0
                  ? "bg-primary-color text-white"
                  : "text-primary-color"
              } border-2 border-[#BDBDBD] border-r-[#E8E8E8]`}
              onClick={() => handlePageChange(0)}
            >
              First
            </button>
          );
        } else if (page === "last") {
          return (
            <button
              key={index}
              className={`p-4 ${
                currentPage === totalPages - 1
                  ? "bg-primary-color text-white"
                  : "text-primary-color"
              } border-2 border-[#BDBDBD] border-r-[#E8E8E8]`}
              onClick={() => handlePageChange(totalPages - 1)}
            >
              Last
            </button>
          );
        } else {
          return (
            <button
              key={index}
              className={`p-4 ${
                currentPage === page - 1
                  ? "border-2 border-primary-color bg-primary-color text-white"
                  : "border-2 border-[#BDBDBD] text-primary-color"
              } border-r-[#E8E8E8]`}
              onClick={() => handlePageChange(page - 1)}
            >
              {page}
            </button>
          );
        }
      })}
    </div>
  );
};

export default Pagination;
