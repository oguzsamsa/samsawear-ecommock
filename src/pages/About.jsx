import PartnerLogos from "../components/PartnerLogos";
import Team from "./Team";

export default function About() {
  return (
    <div className="font-display">
      <div className="flex flex-col md:flex-row md:w-11/12 md:mx-auto">
        <div className="flex flex-col text-center items-center md:text-start md:items-start md:justify-center w-3/4 mx-auto gap-8 py-16">
          <h2 className="font-bold text-text-color max-md:hidden">
            ABOUT COMPANY
          </h2>
          <h1 className="font-bold text-text-color text-4xl md:text-5xl">
            ABOUT US
          </h1>
          <p className="text-second-color text-xl">
            We know how large objects will act, but things on a small scale just
            do not act that way.
          </p>
          <button className="px-8 py-3 bg-primary-color text-white text-sm font-bold rounded-[4px]">
            Get Quote Now
          </button>
        </div>
        <img
          className="w-5/6 md:w-1/2 mx-auto mb-8"
          src="../../assets/about-page/about-page-hero.png"
          alt=""
        />
      </div>
      <div className="flex flex-col md:flex-row gap-12 py-16 md:items-center md:w-3/4 md:mx-auto">
        <div className="flex flex-col text-center w-3/4 mx-auto gap-4 md:text-start">
          <h1 className="text-sm text-danger-text-color">Problems trying</h1>
          <p className="font-bold text-text-color text-2xl">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </p>
        </div>
        <p className="text-sm text-second-text-color w-4/5 mx-auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </div>
      <div className="flex flex-col items-center text-center gap-24 md:flex-row max-lg:flex-wrap md:w-3/4 md:mx-auto md:justify-between py-24">
        <div className="flex flex-col">
          <h1 className="font-bold text-text-color text-6xl">15K</h1>
          <h1 className="font-bold text-second-text-color">Happy Customers</h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-text-color text-6xl">150K</h1>
          <h1 className="font-bold text-second-text-color">Monthly Visitors</h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-text-color text-6xl">15</h1>
          <h1 className="font-bold text-second-text-color">
            Countries Worldwide
          </h1>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-text-color text-6xl">100+</h1>
          <h1 className="font-bold text-second-text-color">Top Partners</h1>
        </div>
      </div>
      <div className="w-4/5 mx-auto py-12 flex justify-center">
        <img
          src="../../public/assets/about-page/about-page-video-cover.png"
          alt=""
          className="max-md:aspect-square  max-md:object-cover rounded-md"
        />
      </div>
      <div>
        <Team />
      </div>
      <div className="flex flex-col items-center text-center pt-12 w-3/4 mx-auto">
        <h1 className="font-bold text-4xl text-text-color mb-12">
          Big Companies Are Here
        </h1>
        <p className="text-sm text-second-text-color">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
        <div className="-mt-6">
          <PartnerLogos />
        </div>
      </div>
      <div className="flex ">
        <div className="bg-[#2A7CC7] flex flex-col items-center text-center md:text-start md:items-start md:justify-center p-16 lg:p-24 xl:p-32 text-white gap-6">
          <h2 className="font-bold">WORK WITH US</h2>
          <h1 className="font-bold text-4xl">Now Let’s grow Yours</h1>
          <p className="text-sm">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th{" "}
          </p>
          <button className="px-8 py-3 rounded-[4px] text-sm font-bold border border-white">
            Quote
          </button>
        </div>
        <img
          className="max-md:hidden w-2/5 object-cover"
          src="../../assets/about-page/about-page-last-img.png"
          alt=""
        />
      </div>
    </div>
  );
}
