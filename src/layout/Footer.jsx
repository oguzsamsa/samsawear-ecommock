export default function Footer() {
  return (
    <>
      <div className="w-full mx-auto flex flex-col font-display">
        <div className="w-full  bg-[#FAFAFA]">
          <div className="w-5/6 mx-auto flex flex-col bg-[] pt-16 pb-12 gap-8 md:flex-row md:justify-between md:items-center">
            <h1 className="font-bold text-2xl text-[#252B42]">Bandage</h1>
            <div className="flex gap-5">
              <i
                className="fa-brands fa-facebook fa-xl"
                style={{ color: "#23a6f0" }}
              ></i>
              <i
                className="fa-brands fa-instagram fa-xl"
                style={{ color: "#23a6f0" }}
              ></i>
              <i
                className="fa-brands fa-twitter fa-xl"
                style={{ color: "#23a6f0" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="w-5/6 flex flex-col pt-16 pb-16 gap-8 mx-auto md:flex-row lg:flex-row ">
          <div className="flex flex-col gap-3 md:w-1/6">
            <h1 className="font-bold text-[#252B42] mb-2">Company Info</h1>
            <h2 className="font-bold text-sm text-[#737373]">About Us</h2>
            <h2 className="font-bold text-sm text-[#737373]">Carrier</h2>
            <h2 className="font-bold text-sm text-[#737373]">We are hiring</h2>
            <h2 className="font-bold text-sm text-[#737373]">Blog</h2>
          </div>
          <div className="flex flex-col gap-3 md:w-1/6">
            <h1 className="font-bold text-[#252B42] mb-2">Legal</h1>
            <h2 className="font-bold text-sm text-[#737373]">About Us</h2>
            <h2 className="font-bold text-sm text-[#737373]">Carrier</h2>
            <h2 className="font-bold text-sm text-[#737373]">We are hiring</h2>
            <h2 className="font-bold text-sm text-[#737373]">Blog</h2>
          </div>
          <div className="flex flex-col gap-3 md:w-1/6">
            <h1 className="font-bold text-[#252B42] mb-2">Features</h1>
            <h2 className="font-bold text-sm text-[#737373]">
              Business Marketing
            </h2>
            <h2 className="font-bold text-sm text-[#737373]">User Analytic</h2>
            <h2 className="font-bold text-sm text-[#737373]">Live Chat</h2>
            <h2 className="font-bold text-sm text-[#737373]">
              Unlimited Support
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:w-1/6">
            <h1 className="font-bold text-[#252B42] mb-2">Resources</h1>
            <h2 className="font-bold text-sm text-[#737373]">IOS & Android</h2>
            <h2 className="font-bold text-sm text-[#737373]">Watch a Demo</h2>
            <h2 className="font-bold text-sm text-[#737373]">Customers</h2>
            <h2 className="font-bold text-sm text-[#737373]">API</h2>
          </div>
          <div className="w-full md:w-1/3 flex flex-col mx-auto">
            <h1 className="font-bold text-[#252B42] mb-5">Get In Touch</h1>
            <div className="flex w-full md:flex-col lg:flex-row">
              <input
                className="text-[#737373] font-sm bg-[#F9F9F9] pl-4 py-4 border border-[#E6E6E6] rounded-tl-md rounded-bl-md w-2/3 md:w-full"
                type="text"
                placeholder="Your Email"
              />
              <button className="text-sm bg-[#23A6F0] text-white py-4 px-4 border border-[#E6E6E6] rounded-tr-md rounded-br-md w-1/3 md:w-full">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-[#737373] mt-2">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA] text-[#737373] text-sm font-bold text-center md:text-start">
          <div className=" w-5/12 md:w-5/6 mx-auto py-12">
            Made With Love By Finland All Right Reserved
          </div>
        </div>
      </div>
    </>
  );
}
