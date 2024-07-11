import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductPost from "../components/ProductPost";
import { posts } from "../data/posts";
import HomePageSlider from "../components/HomePageSlider";
import PartnerLogos from "../components/PartnerLogos";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/thunkActions";
import Spinner from "../components/Spinner";

export default function Home() {
  const [displayedProductCount, setDisplayedProductCount] = useState(5);
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.product.productList)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
  console.log(topProducts);
  const fetchState = useSelector((state) => state.product.fetchState);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setDisplayedProductCount(topProducts.length);
    } else {
      setDisplayedProductCount(5);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayedProducts = topProducts.slice(0, displayedProductCount);

  return (
    <div className="font-display">
      <HomePageSlider />
      <PartnerLogos />
      <div className="flex w-5/6 mx-auto flex-col gap-4 py-12 md:flex-row">
        <div className="bg-[url('../../assets/homepage/hero-content-1.jpg')] basis-1/2 w-full  mx-auto bg-cover bg-center flex items-end pt-[340px]">
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
          <div className="bg-[url('../../assets/homepage/hero-content-2.jpg')] w-full   mx-auto bg-cover bg-center flex items-end pt-[120px]">
            <div className="bg-[#2D8BC0] bg-opacity-75 p-10">
              <h2 className="text-white text-2xl font-bold py-6">
                Top Product Of the Week
              </h2>
              <button className="text-white font-bold text-sm border border-white px-8 py-4 rounded-[4px]">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
          <div className="bg-[url('../../assets/homepage/hero-content-3.jpg')] w-full   mx-auto bg-cover bg-center flex items-end pt-[120px]">
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
      <div className="products flex flex-col w-full mx-auto items-center gap-12 py-16">
        <div className="flex flex-col w-4/5 mx-auto text-center gap-2 ">
          <h3 className="text-[#737373] text-xl">Featured Products</h3>
          <h1 className="text-[#252B42] text-2xl font-bold w-2/3 mx-auto">
            BESTSELLER PRODUCTS
          </h1>
          <p className="text-[#737373] text-sm w-3/5 mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="product-cards flex flex-col max-md:gap-12 md:w-5/6 md:flex-row justify-center flex-wrap max-md:w-4/5">
          {fetchState === "FETCHED" ? (
            displayedProducts.map((product) => (
              <ProductCard product={product} />
            ))
          ) : (
            <Spinner />
          )}
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
          <img src="../../assets/homepage/col-md-6.png" alt="" />
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
              src="../../assets/homepage/icon-1.svg"
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
              src="../../assets/homepage/icon-2.svg"
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
              src="../../assets/homepage/icon-3.svg"
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
        <div className="flex flex-col gap-6 md:w-3/5  lg:flex-row  lg:w-4/5 mx-auto">
          {posts.map((post) => (
            <ProductPost
              key={post.id}
              imageSrc={`../../assets/homepage/product-post-images/post-img-${post.id}.png`}
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
