const ProductCard = ({ imageSrc, title, department, oldPrice, newPrice }) => (
  <div className="product-card w-4/5 flex flex-col text-center md:w-1/4 lg:w-[15%]">
    <img src={imageSrc} alt={title} className="mb-4" />
    <h1 className="text-[#252B42] font-bold">{title}</h1>
    <h2 className="text-[#737373] font-bold text-sm my-2">{department}</h2>
    <div>
      <span className="text-[#BDBDBD] font-bold mr-2">${oldPrice}</span>
      <span className="text-[#23856D] font-bold">${newPrice}</span>
    </div>

    <div className="flex gap-1 justify-center mt-2">
      <div className=" w-4 h-4 rounded-full bg-primary-color"></div>
      <div className=" w-4 h-4 rounded-full bg-[#23856D]"></div>
      <div className=" w-4 h-4 rounded-full bg-[#E77C40]"></div>
      <div className=" w-4 h-4 rounded-full bg-[#252B42]"></div>
    </div>
  </div>
);

export default ProductCard;
