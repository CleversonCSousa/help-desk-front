import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // The API considers 0 as the first page, so it adds another 1
  const currentUiPage = currentPage + 1;

  // Always place the current page in the middle
  let startPage = Math.max(1, currentUiPage - 2);

  // Ensures that only 5 pages are displayed
  const endPage = Math.min(totalPages, startPage + 4);

  // If it is at the end (last pages), it forces the current page to the middle
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="text-gray-300" size={32} />
      </button>

      {pages.map((page) => {
        const isSelected = page - 1 === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page - 1)}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors ${
              isSelected
                ? "bg-brand-blue-base text-gray-600"
                : "border border-gray-500 bg-white text-gray-200 hover:bg-gray-500"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
      >
        <ChevronRightIcon className="text-gray-300" size={32} />
      </button>
    </div>
  );
};
