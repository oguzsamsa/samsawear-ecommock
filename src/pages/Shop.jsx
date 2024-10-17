import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PartnerLogos from "../components/PartnerLogos";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/thunkActions";
import Spinner from "../components/Spinner";
import {
  setCategoryId,
  setFilterText,
  setLimit,
  setOffset,
  setSort,
} from "../redux/actions/productActions";
import { useHistory, useLocation } from "react-router-dom";

export default function Shop() {
  const [localFilterText, setLocalFilterText] = useState("");
  const [localCategoryId, setLocalCategoryId] = useState("");
  const [localSort, setLocalSort] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const productList = useSelector((state) => state.product.productList);
  const fetchState = useSelector((state) => state.product.fetchState);
  const total = useSelector((state) => state.product.total);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const sort = queryParams.get("sort");
    const filter = queryParams.get("filter");
    const page = queryParams.get("page");

    if (!category && !sort && !filter && !page) {
      dispatch(setCategoryId(""));
      dispatch(setSort(""));
      dispatch(setFilterText(""));
      dispatch(setOffset(0));

      setLocalCategoryId("");
      setLocalSort("");
      setLocalFilterText("");
    } else {
      if (category) {
        dispatch(setCategoryId(category));
        setLocalCategoryId(category);
      }

      if (sort) {
        dispatch(setSort(sort));
        setLocalSort(sort);
      }

      if (filter) {
        dispatch(setFilterText(filter));
        setLocalFilterText(filter);
      }

      const newOffset = page ? (parseInt(page, 10) - 1) * limit : 0;
      dispatch(setOffset(newOffset));
    }

    dispatch(fetchProducts());
  }, [location.search, dispatch, limit]);

  const updateLimit = () => {
    const newLimit = window.innerWidth >= 768 ? 25 : 6;
    dispatch(setLimit(newLimit));
  };

  useEffect(() => {
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const handleSortChange = (e) => {
    setLocalSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setLocalFilterText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setLocalCategoryId(e.target.value);
  };

  const handleFilterSubmit = () => {
    const queryParams = new URLSearchParams();
    if (localCategoryId) queryParams.set("category", localCategoryId);
    if (localFilterText) queryParams.set("filter", localFilterText);
    if (localSort) queryParams.set("sort", localSort);

    history.push(`/shop?${queryParams.toString()}`);
    dispatch(setCategoryId(localCategoryId));
    dispatch(setSort(localSort));
    dispatch(setFilterText(localFilterText));
    dispatch(setOffset(0));
    dispatch(fetchProducts());
  };

  const handlePageChange = (newOffset) => {
    const queryParams = new URLSearchParams(location.search);
    const page = newOffset / limit + 1;
    if (page > 1) {
      queryParams.set("page", page);
    } else {
      queryParams.delete("page");
    }

    history.push(`/shop?${queryParams.toString()}`);
    dispatch(setOffset(newOffset));
    dispatch(fetchProducts());
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const startItem = offset + 1;
  const endItem = Math.min(offset + limit, total);

  const renderPagination = () => {
    const pageNumbers = [];
    const leftSiblingIndex = Math.max(currentPage - 2, 1);
    const rightSiblingIndex = Math.min(currentPage + 2, totalPages);

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <button
          className={`p-4 ${
            currentPage === 1
              ? "text-[#BDBDBD] bg-[#F3F3F3] border-2 border-[#BDBDBD]"
              : "border-2 border-[#BDBDBD] text-primary-color bg-white"
          } border-r-[#E8E8E8] rounded-[4px] rounded-tr-none rounded-br-none`}
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className={`p-4 ${
            currentPage === 1
              ? "text-[#BDBDBD] bg-[#F3F3F3] border-2 border-[#BDBDBD]"
              : "border-2 border-[#BDBDBD] text-primary-color bg-white"
          } border-r-[#E8E8E8]`}
          onClick={() => handlePageChange((currentPage - 2) * limit)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {leftSiblingIndex > 1 && (
          <span className="p-4 border-2 border-[#BDBDBD] text-primary-color bg-white border-r-[#E8E8E8]">
            ...
          </span>
        )}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`p-4 ${
              currentPage === page
                ? "border-2 border-primary-color bg-primary-color text-white"
                : "border-2 border-[#BDBDBD] text-primary-color bg-white"
            } border-r-[#E8E8E8]`}
            onClick={() => handlePageChange((page - 1) * limit)}
          >
            {page}
          </button>
        ))}
        {rightSiblingIndex < totalPages && (
          <span className="p-4 border-2 border-[#BDBDBD] text-primary-color bg-white  ">
            ...
          </span>
        )}
        <button
          className={`p-4 ${
            currentPage === totalPages
              ? "text-[#BDBDBD] bg-[#F3F3F3] border-2 border-[#BDBDBD]"
              : "border-2 border-[#BDBDBD] text-primary-color bg-white"
          } border-l-0`}
          onClick={() => handlePageChange(currentPage * limit)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className={`p-4 ${
            currentPage === totalPages
              ? "text-[#BDBDBD] bg-[#F3F3F3] border-2 border-[#BDBDBD]"
              : "border-2 border-[#BDBDBD] text-primary-color bg-white"
          } border-l-0 rounded-[4px] rounded-l-none`}
          onClick={() => handlePageChange((totalPages - 1) * limit)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </>
    );
  };

  return (
    <div className="font-display">
      <div className="bg-[#FAFAFA]">
        <div className="text-center py-12 flex flex-col gap-12  md:flex-row md:justify-between md:w-11/12 mx-auto">
          <h1 className="font-bold text-2xl text-text-color">Shop</h1>
          <div className="flex max-md:mx-auto  items-center gap-4">
            <h2 className="text-text-color font-bold text-sm">Home</h2>
            <i className="fa-solid fa-chevron-right text-[#BDBDBD]"></i>
            <h2 className="text-second-text-color font-bold text-sm">Shop</h2>
          </div>
        </div>

        <div className="sort flex flex-col items-center py-8 gap-4 md:flex-row md:justify-between md:w-11/12 md:mx-auto">
          <h1 className="text-second-text-color text-sm font-bold">
            Showing {startItem} - {endItem} of {total} results
          </h1>

          <div className="flex gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <input
                type="text"
                placeholder="Filter"
                value={localFilterText}
                onChange={handleFilterChange}
                className="flex items-center gap-2 py-2 px-4 bg-[#F9F9F9] text-second-text-color text-sm border rounded-[4px]"
              />
              <select
                value={localCategoryId}
                onChange={handleCategoryChange}
                className="flex items-center gap-2 py-2 px-4 bg-[#F9F9F9] text-second-text-color text-sm border rounded-[4px]"
              >
                <option value="">Select Category</option>
                <optgroup label="Kadın">
                  {categories
                    .filter((cat) => cat.gender === "k")
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Erkek">
                  {categories
                    .filter((cat) => cat.gender === "e")
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <select
                value={localSort}
                onChange={handleSortChange}
                className="flex items-center gap-2 py-2 px-4 bg-[#F9F9F9] text-second-text-color text-sm border rounded-[4px]"
              >
                <option value="">Select Sort</option>
                <option value="price:asc">Price Ascending</option>
                <option value="price:desc">Price Descending</option>
                <option value="rating:asc">Rating Ascending</option>
                <option value="rating:desc">Rating Descending</option>
              </select>
              <button
                className="text-white bg-primary-color py-2 px-8 text-sm font-bold rounded-[4px]"
                onClick={handleFilterSubmit}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      {fetchState === "FETCHING" && <Spinner />}
      <div className="flex flex-col items-center gap-8 py-16  md:w-11/12 md:justify-center md:mx-auto">
        <div className="product-cards flex flex-col max-md:gap-12 md:flex-row justify-center flex-wrap max-md:w-4/5">
          {fetchState === "FETCHED" ? (
            productList.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <Spinner />
          )}
        </div>

        <div className="flex text-sm font-bold mt-12">{renderPagination()}</div>
      </div>
      <PartnerLogos />
    </div>
  );
}
