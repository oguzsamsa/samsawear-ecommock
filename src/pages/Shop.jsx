import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ShopCard from "../components/ShopCard";
import { products } from "../data/products";
import { shopCard } from "../data/shopCard";
import { logos } from "../data/logos";
import PartnerLogos from "../components/PartnerLogos";

export default function Shop() {
  const [displayedProductCount, setDisplayedProductCount] = useState(4);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setDisplayedProductCount(products.length);
    } else {
      setDisplayedProductCount(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedProducts = products.slice(0, displayedProductCount);

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
        <div className="shop-cards flex flex-col gap-4 py-8 md:flex-row md:w-[95%] md:mx-auto">
          {shopCard.map((card) => (
            <ShopCard card={card} />
          ))}
        </div>
      </div>

      <div className="sort flex flex-col items-center py-8 gap-4 md:flex-row md:justify-between md:w-11/12 md:mx-auto">
        <h1 className="text-second-text-color text-sm font-bold">
          Showing all {displayedProductCount} results
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-second-text-color text-sm font-bold">Views:</p>
          <i className="fa-solid fa-grip px-3 py-3 border rounded-[4px]"></i>
          <i className="fa-solid fa-list-check px-3 py-3 border rounded-[4px]"></i>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 py-2 px-4 bg-[#F9F9F9] text-second-text-color text-sm border rounded-[4px]">
            <p>Popularity</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <button className="text-white bg-primary-color py-2 px-4 text-sm font-bold rounded-[4px]">
            Filter
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 py-16  md:w-11/12 md:justify-center md:mx-auto">
        <div className="product-cards flex flex-col max-md:gap-12 md:flex-row justify-center flex-wrap ">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageSrc={product.imgSrc}
              title={product.title}
              department={product.department}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
            />
          ))}
        </div>

        <div className="flex text-sm font-bold mt-12">
          <button className="p-4 text-[#BDBDBD] bg-[#F3F3F3] border-2 border-[#BDBDBD] border-r-[#E8E8E8] rounded-[4px] rounded-tr-none rounded-br-none">
            First
          </button>
          <button className="p-4 border-l-0 text-primary-color bg-white border-2 border-[#BDBDBD] border-r-[#E8E8E8]">
            1
          </button>
          <button className="p-4  border-2 border-[#BDBDBD] border-l-0 border-r-[#E8E8E8] bg-primary-color text-white">
            2
          </button>
          <button className="p-4 border-2 border-[#BDBDBD] border-l-0 text-primary-color border-r-[#E8E8E8]">
            3
          </button>
          <button className="p-4 text-primary-color border-2 border-[#BDBDBD] border-l-0 rounded-[4px] rounded-l-none">
            Next
          </button>
        </div>
      </div>
      <PartnerLogos />
    </div>
  );
}
