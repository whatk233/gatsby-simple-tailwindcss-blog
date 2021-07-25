import React from "react";
import { Link } from "gatsby";
// 😵
const Pagination = ({ allPagesNum, nextPage, previousPage, nowPageNum }) => {
  // icon
  const prevIcon = (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  const nextIcon = (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  // btnStyle
  const normalStyle =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  const activeStyle =
    "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  const prevBtnStyle =
    "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  const nextBtnStyle =
    "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  const prevBtnDisableStyle =
    "opacity-50 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500";
  const nextBtnDisableStyle =
    "opacity-50 relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500";
  // render items btn
    let items = [];
  for (let i = 1; i <= allPagesNum; i++) {
    items.push(
      i === nowPageNum ? (
        <span key={i} className={activeStyle}>
          {i}
        </span>
      ) : (
        <Link key={i} to={i === 1 ? "/" : `/page/${i}`} className={normalStyle}>
          {i}
        </Link>
      )
    );
  }

  return (
    <div className="border-t p-5 border-gray-200">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* prev btn */}
            {previousPage == null ? (
              // null prev
              <span className={prevBtnDisableStyle}>
                {prevIcon}
              </span>
            ) : (
              // prev
              <Link to={previousPage} className={prevBtnStyle}>
                {prevIcon}
              </Link>
            )}
            {items}
            {/* next btn */}
            {nextPage == null ? (
              // null next
              <span className={nextBtnDisableStyle}>
                {nextIcon}
              </span>
            ) : (
              // next
              <Link to={nextPage} className={nextBtnStyle}>
                {nextIcon}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
