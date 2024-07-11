import { Link } from "react-router-dom";
import { convertToEnglishChars } from "../utils/convertToEnglishChars";

export default function ShopCard({ card }) {
  return (
    <Link
      to={`/shop/${
        card.gender === "k" ? "kadin" : "erkek"
      }/${convertToEnglishChars(card.code.substring(2))}`}
      className="aspect-square bg-cover bg-center w-4/5 mx-auto flex flex-col gap-4 justify-center items-center"
      style={{ backgroundImage: `url(${card.img})` }}
    >
      <h1 className="text-white font-bold">
        {card.gender === "k" ? `Kadın ${card.title}` : `Erkek ${card.title}`}
      </h1>
      <h2 className="text-white font-bold text-sm">5 Items</h2>
    </Link>
  );
}
