import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductPost from "../components/ProductPost";
import { products } from "../data/products";

export default function Home() {
  const logos = [
    "Vector",
    "Vector2",
    "Vector3",
    "Vector4",
    "Vector5",
    "Vector6",
  ];

  const [displayedProductCount, setDisplayedProductCount] = useState(5);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setDisplayedProductCount(products.length);
    } else {
      setDisplayedProductCount(5);
    }
  };

  const posts = [
    {
      id: 1,
      title: "Loudest à la Madison #1 <br/> (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },

    {
      id: 2,
      title: `Loudest à la Madison #1 <br/> (L'integral)`,
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },
  ];

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedProducts = products.slice(0, displayedProductCount);

  return (
    <div className="font-display">
      <div className="slider relative max-md:overflow-hidden w-11/12 lg:w-[87%] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] h-[700px] md:h-[619px] mx-auto rounded-xl mt-6 flex flex-col md:flex-row md:items-center pt-12 md:pt-0">
        <div className="flex flex-col text-center items-center md:items-start md:text-start md:w-full md:pl-24 md:py-24  gap-6">
          <p className="font-bold text-base text-[#2A7CC7]">SUMMER 2024</p>
          <h1 className="font-bold text-[40px] md:text-[58px] text-[#252B42] md:w-full leading-tight">
            NEW COLLECTION
          </h1>
          <p className=" text-base md:text-xl leading-normal text-[#737373] ">
            We know how large objects will act,
            <br /> but things on a small scale.
          </p>
          <button className="font-bold text-2xl bg-[#23A6F0] text-white px-6 py-3 rounded">
            SHOP NOW
          </button>
        </div>
        <img
          src="./../../public/assets/homepage/homepage-header-mobile-hero.png"
          alt=""
          className="w-full  absolute -bottom-8 max-md:-left-8 z-10 md:-right-10 lg:-right-20 md:bottom-0 md:w-1/2 lg:w-1/2"
        />
        <div className="w-[47px] h-[47px] md:h-16 md:w-16 lg:w-[80px] lg:h-[80px] rounded-full bg-white absolute max-md:bottom-80 md:bottom-44 md:right-72 lg:top-0 lg:right-[470px]"></div>
        <div className="w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] rounded-full bg-white absolute max-md:bottom-[47px] max-md:left-[37px] md:right-5 md:bottom-10 lg:-right-3 lg:-top-3"></div>
        <div className="w-[18px] h-[18px] lg:w-[31px] md:w-6 md:h-6  lg:h-[31px] rounded-full bg-white absolute max-md:bottom-[160px] max-md:right-[40px] md:-right-4 md:bottom-44 lg:-right-[23px] lg:top-[280px] z-20"></div>
        <div className="w-[9px] lg:w-[15px] lg:h-[15px] h-[9px] md:w-3 md:h-3 rounded-full bg-[#977DF4] absolute max-md:bottom-[259px] max-md:right-[26px] md:right-6 lg:-right-[47px] lg:top-[113px]"></div>
      </div>
      <div className="logos flex justify-center py-24 w-3/4 mx-auto">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-16">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={`../../public/assets/homepage/homepage-logos/${logo}.png`}
              alt=""
              className=" md:w-[10%] h-auto"
            />
          ))}
        </div>
      </div>
      <div className="flex w-5/6 mx-auto flex-col gap-4 py-12 md:flex-row">
        <div className="bg-[url('../../public/assets/homepage/hero-content-1.jpg')] basis-1/2 w-full  mx-auto bg-cover bg-center flex items-end pt-[340px]">
          <div className="bg-[#2D8BC0] bg-opacity-75 p-10">
            <h2 className="text-white text-2xl font-bold py-6">
              Top Product Of the Week
            </h2>
            <button className="text-white font-bold text-sm border border-white px-8 py-4 rounded-[4px]">
              EXPLORE ITEMS
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 basis-1/2">
          <div className="bg-[url('../../public/assets/homepage/hero-content-2.jpg')] w-full   mx-auto bg-cover bg-center flex items-end pt-[120px]">
            <div className="bg-[#2D8BC0] bg-opacity-75 p-10">
              <h2 className="text-white text-2xl font-bold py-6">
                Top Product Of the Week
              </h2>
              <button className="text-white font-bold text-sm border border-white px-8 py-4 rounded-[4px]">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
          <div className="bg-[url('../../public/assets/homepage/hero-content-3.jpg')] w-full   mx-auto bg-cover bg-center flex items-end pt-[120px]">
            <div className="bg-[#2D8BC0] bg-opacity-75 p-10">
              <h2 className="text-white text-2xl font-bold py-6">
                Top Product Of the Week
              </h2>
              <button className="text-white font-bold text-sm border border-white px-8 py-4 rounded-[4px]">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="products flex flex-col w-full mx-auto items-center py-16">
        <div className="flex flex-col w-4/5 mx-auto text-center gap-2 mb-12">
          <h3 className="text-[#737373] text-xl">Featured Products</h3>
          <h1 className="text-[#252B42] text-2xl font-bold w-2/3 mx-auto">
            BESTSELLER PRODUCTS
          </h1>
          <p className="text-[#737373] text-sm w-3/5 mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="product-cards mx-auto flex flex-col gap-12  md:w-[70%] md:flex-row flex-wrap justify-center mb-16">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imgSrc}
              title={product.title}
              department={product.department}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
            />
          ))}
        </div>
        <button className="text-[#23A6F0] text-sm font-bold py-3 px-8 bg-white rounded-[4px] border border-[#23A6F0] max-w-96">
          LOAD MORE PRODUCTS
        </button>
      </div>
      <div className="content flex flex-col py-16 gap-8 md:gap-0 md:flex-row md:w-4/5 lg:pl-8 items-center justify-between mx-auto">
        <div className="flex flex-col w-3/5 mx-auto gap-4 md:w-2/5">
          <h2 className=" text-primary-color font-bold">Featured Products</h2>
          <h1 className="text-text-color font-bold text-[40px]">
            We love what we do
          </h1>
          <p className="text-second-text-color text-sm ">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
          <p className="text-second-text-color text-sm ">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <div className="flex w-4/5 mx-auto gap-2 md:-order-1 md:w-1/2">
          <img src="../../public/assets/homepage/col-md-6.png" alt="" />
        </div>
      </div>
      <div className="features flex flex-col py-16">
        <div className="flex flex-col items-center text-center gap-4 py-16 md:w-3/5 mx-auto">
          <h2 className="text-second-text-color text-xl">Featured Products</h2>
          <h1 className="text-text-color font-bold text-2xl">
            THE BEST SERVICES
          </h1>
          <p className="text-second-text-color text-sm w-2/3 mx-auto">
            Problems trying to resolve the conflict between{" "}
          </p>
        </div>
        <div className="flex flex-col text-center gap-16 md:flex-row md:justify-between md:w-3/5 mx-auto pb-20">
          <div className="flex flex-col items-center gap-4 mx-auto flex-1">
            <img
              src="../../public/assets/homepage/icon-1.svg"
              alt=""
              className="w-16 mx-auto"
            />
            <h1 className="text-text-color font-bold text-2xl">Easy Wins</h1>
            <p className="text-second-text-color text-sm md:w-4/5 mx-auto">
              Get your best looking smile now!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mx-auto flex-1">
            <img
              src="../../public/assets/homepage/icon-2.svg"
              alt=""
              className="w-16 mx-auto"
            />
            <h1 className="text-text-color font-bold text-2xl">Concrete</h1>
            <p className="text-second-text-color text-sm  mx-auto">
              Defalcate is most focused in helping you discover your most
              beautiful smile
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mx-auto flex-1">
            <img
              src="../../public/assets/homepage/icon-3.svg"
              alt=""
              className="w-16 mx-auto"
            />
            <h1 className="text-text-color font-bold text-2xl">Hack Growth</h1>
            <p className="text-second-text-color text-sm mx-auto">
              Overcame any hurdle or any other problem.
            </p>
          </div>
        </div>
      </div>
      <div className="featured_posts flex flex-col py-16 ">
        <div className="text-center flex flex-col gap-4 mb-12">
          <p className="text-primary-color text-sm font-bold">
            Practice Advice
          </p>
          <h1 className="text-text-color font-bold text-[40px]">
            Featured Posts
          </h1>
        </div>
        <div className="flex flex-col gap-6 md:w-3/5  lg:flex-row  lg:w-11/12 mx-auto">
          {posts.map((post) => (
            <ProductPost
              key={post.id}
              imageSrc={`../../public/assets/homepage/product-post-images/post-img-${post.id}.png`}
              title={post.title}
              description={post.description}
              date={post.date}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
