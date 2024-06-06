export default function ShopCard({ card }) {
  return (
    <div
      style={{ backgroundImage: `url(${card.imgSrc})` }}
      className="aspect-square bg-cover bg-center w-4/5 mx-auto flex flex-col gap-4 justify-center items-center"
    >
      <h1 className="text-white font-bold">{card.title}</h1>
      <h2 className="text-white font-bold text-sm">{card.itemsCount} Items</h2>
    </div>
  );
}
