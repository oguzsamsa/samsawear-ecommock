const ProductPost = ({ imageSrc, title, description, date, comments }) => {
  return (
    <div className="flex flex-col w-4/5 mx-auto lg:w-2/5">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full" />
        <div className="bg-[#E74040] text-white py-1 px-3 rounded-[4px] inline-block absolute top-4 left-4">
          NEW
        </div>
      </div>
      <div className="flex flex-col p-6 border border-t-0 gap-4">
        <div className="flex text-xs gap-3 text-second-text-color">
          <p className="text-[#8EC2F2]">Google</p>
          <p>Trending</p>
          <p>New</p>
        </div>
        <h1
          dangerouslySetInnerHTML={{ __html: title }}
          className="text-text-color text-xl"
        ></h1>
        <p className="text-second-text-color text-sm ">{description}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-clock fa-xs text-primary-color"></i>
            <p className="text-second-text-color text-xs">{date}</p>
          </div>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-chart-line fa-xs text-[#23856D]"></i>
            <p className="text-second-text-color text-xs">
              {comments} comments
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="text-start font-bold text-sm text-second-text-color">
            Learn More
          </button>
          <i class="fa-solid fa-greater-than text-primary-color"></i>
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
