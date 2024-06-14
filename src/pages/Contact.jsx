export default function Contact() {
  return (
    <div className="font-display">
      <div className="flex flex-col md:flex-row bg-[#FAFAFA] py-8 max-md:gap-8">
        <div className="flex flex-col items-center text-center w-3/4 md:w-1/3 lg:w-2/5 md:justify-center md:text-start md:items-start mx-auto text-text-color gap-8">
          <h2 className="font-bold">CONTACT US</h2>
          <h1 className="font-bold text-4xl">Get in touch today!</h1>
          <p className="text-second-text-color text-xl leading-normal">
            We know how large objects will act, but things on a small scale just
            do not act that way.
          </p>
          <h2 className="font-bold text-2xl">Phone : +451 215 215 </h2>
          <h2 className="font-bold text-2xl">Fax : +451 215 215</h2>
          <div className="flex text-3xl gap-6">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
        <img
          src="../../assets/contact-page/contact-page-hero.png"
          alt=""
          className="w-11/12 mx-auto md:w-1/2 lg:w-2/5"
        />
      </div>
      <div className="flex flex-col py-16 gap-12">
        <div className="text-center w-3/5 mx-auto md:w-2/5">
          <h2 className="text-text-color font-bold text-sm mb-4">
            VISIT OUR OFFICE
          </h2>
          <h1 className="font-bold text-text-color text-4xl">
            We help small businesses with big ideas
          </h1>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:w-3/5 lg:mx-auto">
          <div className="flex flex-col text-center items-center py-8 w-4/5  mx-auto gap-2">
            <i class="fa-solid fa-phone text-7xl text-primary-color mb-2"></i>
            <h3 className="text-sm font-bold text-text-color">
              georgia.young@example.com
            </h3>
            <h3 className="text-sm font-bold text-text-color">
              georgia.young@ple.com
            </h3>
            <h2 className="font-bold text-text-color my-2">Get Support</h2>
            <button className="text-primary-color text-sm font-bold px-5 py-3 border-2 border-primary-color rounded-[4px]">
              Submit Request
            </button>
          </div>
          <div className="flex flex-col text-center items-center py-8 w-4/5 bg-text-color text-white mx-auto gap-2">
            <i class="fa-solid fa-location-dot text-7xl text-primary-color mb-2"></i>
            <h3 className="text-sm font-bold">georgia.young@example.com</h3>
            <h3 className="text-sm font-bold">georgia.young@ple.com</h3>
            <h2 className="font-bold my-2">Get Support</h2>
            <button className="text-primary-color text-sm font-bold px-5 py-3 border-2 border-primary-color rounded-[4px]">
              Submit Request
            </button>
          </div>
          <div className="flex flex-col text-center items-center py-8 w-4/5 mx-auto gap-2">
            <i class="fa-solid fa-location-arrow text-7xl text-primary-color mb-2"></i>
            <h3 className="text-sm font-bold text-text-color">
              georgia.young@example.com
            </h3>
            <h3 className="text-sm font-bold text-text-color">
              georgia.young@ple.com
            </h3>
            <h2 className="font-bold text-text-color my-2">Get Support</h2>
            <button className="text-primary-color text-sm font-bold px-5 py-3 border-2 border-primary-color rounded-[4px]">
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center items-center py-8 bg-[#FAFAFA]">
        <i class="fa-solid fa-arrow-turn-down text-7xl text-primary-color"></i>
        <h2 className="font-bold text-text-color">WE Can't WAIT TO MEET YOU</h2>
        <h1 className="font-bold text-6xl my-10">Let’s Talk</h1>
        <button className="px-8 py-3 bg-primary-color text-white text-sm font-bold rounded-[4px]">
          Try it free now
        </button>
      </div>
    </div>
  );
}
