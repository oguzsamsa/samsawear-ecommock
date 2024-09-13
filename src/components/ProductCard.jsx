import { Link } from "react-router-dom";
import toUrlSlug from "../utils/toUrlSlug";

const ProductCard = ({ product }) => {
  if (!product || !product.id) {
    return <div>Ürün bilgileri yükleniyor...</div>;
  }

  return (
    <Link
      to={`/shop/product-detail/${product.category_id}/${
        product.id
      }/${toUrlSlug(product.name)}`}
      className="w-full md:w-1/3 lg:w-1/4 p-2"
    >
      <div className="product-card flex flex-col text-center">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="mb-4 object-cover bg-center w-full"
        />
        <h1 className="text-[#252B42] font-bold">{product.name}</h1>
        <h2 className="text-[#737373] font-bold text-sm my-2 md:h-24 flex justify-center">
          {product.description}
        </h2>
        <div>
          <span className="text-[#BDBDBD] font-bold mr-2">
            ${product.price}
          </span>
          <span className="text-[#23856D] font-bold">${product.price}</span>
        </div>
        <div className="flex gap-1 justify-center mt-2">
          <div className="w-4 h-4 rounded-full bg-primary-color"></div>
          <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
          <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
          <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
