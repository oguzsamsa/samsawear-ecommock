import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PartnerLogos from "../components/PartnerLogos";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/thunkActions";
import Spinner from "../components/Spinner";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({}); // Başlangıçta boş nesne
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedProductCount, setDisplayedProductCount] = useState(4);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Couldn't fetch product.", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const [topProducts, setTopProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const fetchState = useSelector((state) => state.product.fetchState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (fetchState === "FETCHED") {
      const sortedProducts = productList
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);
      setTopProducts(sortedProducts);
    }
  }, [fetchState, productList]);

  const displayedProducts = topProducts.slice(0, displayedProductCount);

  // Güvenli erişim
  const images =
    product.images && product.images.length > 0
      ? [product.images[0].url, product.images[0].url]
      : [];

  const handlePrevClick = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setDisplayedProductCount(productList.length);
    } else {
      setDisplayedProductCount(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product.name) {
    return <div>Yükleniyor...</div>;
  }

  console.log(displayedProducts, "displayedproductsss");

  return (
    <div className="font-display">
      <div className="flex flex-col py-16 gap-8 bg-[#FAFAFA]">
        <div className="flex mx-auto md:w-11/12 items-center gap-4">
          <h2 className="text-text-color font-bold text-sm">Home</h2>
          <i className="fa-solid fa-chevron-right text-[#BDBDBD]"></i>
          <h2 className="text-second-text-color font-bold text-sm">Shop</h2>
        </div>

        <div className="flex flex-col w-5/6 mx-auto md:flex-row md:w-11/12 md:gap-12">
          <div className="max-w-lg md:w-2/5">
            <div className="relative">
              <img
                id="mainImage"
                src={images[currentImageIndex] || ""}
                alt="Main Image"
                className="w-full h-auto"
              />
              <button
                id="prevBtn"
                onClick={handlePrevClick}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-opacity-50 rounded-full p-6"
              >
                <i className="fa-solid fa-chevron-left fa-2xl text-white"></i>
              </button>
              <button
                id="nextBtn"
                onClick={handleNextClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-opacity-50 rounded-full p-6"
              >
                <i className="fa-solid fa-chevron-right fa-2xl text-white"></i>
              </button>
            </div>
            <div className="flex mt-4 space-x-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer"
                  onClick={() => changeImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 md:w-3/5">
            <h1 className="text-xl text-text-color mb-1">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-[#F3CD03] gap-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <p className="text-second-text-color font-bold text-sm">
                Rating: {product.rating}
              </p>
            </div>
            <p className="text-text-color font-bold text-2xl">
              ${product.price}
            </p>
            <div className="flex gap-2 -mt-3">
              <p className="font-bold text-sm text-second-text-color">
                Stock :{" "}
              </p>
              <p className="font-bold text-sm text-primary-color">
                {" "}
                {product.stock}
              </p>
            </div>
            <p className="text-sm text-[#858585]">{product.description}</p>
            <hr className="font-bold" />
            <div className="flex gap-2 mb-6">
              <div className=" w-8 h-8 rounded-full bg-primary-color"></div>
              <div className=" w-8 h-8 rounded-full bg-[#2DC071]"></div>
              <div className=" w-8 h-8 rounded-full bg-[#E77C40]"></div>
              <div className=" w-8 h-8 rounded-full bg-text-color"></div>
            </div>
            <div className="flex gap-2">
              <button className="text-white bg-primary-color px-3 py-3 rounded-md">
                Select Options
              </button>
              <button>
                <i className="fa-regular fa-heart bg-white border border-[#E8E8E8] p-2 rounded-full"></i>
              </button>
              <button>
                <i className="fa-solid fa-cart-shopping bg-white border border-[#E8E8E8] p-2 rounded-full"></i>
              </button>
              <button>
                <i className="fa-solid fa-eye bg-white border border-[#E8E8E8] p-2 rounded-full"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col py-8 w-11/12 mx-auto">
        <div className="flex text-xs justify-between font-bold text-second-text-color mb-12 md:w-1/2 md:mx-auto">
          <a href="" className="font-semibold underline">
            Description
          </a>
          <a href="">Additional Information</a>
          <a href="">
            Reviews <span className="text-[#23856D]">(0)</span>
          </a>
        </div>
        <div className="flex flex-col w-5/6 md:flex-row mx-auto md:w-full md:justify-between">
          <img
            src="../../assets/product-detail-page/product-description-img.png"
            alt=""
            className="mb-12 md:mb-0 object-contain md:w-[30%]"
          />
          <div className="flex flex-col gap-4 mb-12 md:w-1/4">
            <h1 className="text-text-color text-2xl font-bold">
              the quick fox jumps over{" "}
            </h1>
            <p className="text-second-text-color text-sm">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-second-text-color text-sm">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <p className="text-second-text-color text-sm">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
          </div>
          <div className="flex flex-col gap-8 md:w-1/4">
            <div className="flex flex-col">
              <h1 className="mb-6 text-text-color text-2xl font-bold">
                the quick fox jumps over
              </h1>
              <ul className="flex flex-col gap-2 text-second-text-color text-sm font-bold">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-6 text-text-color text-2xl font-bold">
                the quick fox jumps over
              </h1>
              <ul className="flex flex-col gap-2 text-second-text-color text-sm font-bold">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right"></i> the quick fox
                  jumps over the lazy dog
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#FAFAFA] py-12">
        <div className="flex flex-col md:w-5/6 md:mx-auto text-center md:text-start items-center md:items-stretch gap-8">
          <h1 className="text-text-color text-2xl font-bold">
            BESTSELLER PRODUCTS
          </h1>
          <hr className="border-t-2 border-[#ECECEC] w-4/5 max-md:max-w-xs md:w-full" />
          <div className="flex flex-col items-center max-md:gap-8 md:flex-row md:flex-wrap md:justify-center">
            {fetchState === "FETCHED" ? (
              displayedProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <PartnerLogos />
    </div>
  );
}
