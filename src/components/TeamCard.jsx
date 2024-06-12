export default function TeamCard({ name, profession, imgSrc }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <img src={imgSrc} alt="" className="w-3/4 mb-2" />
      <h1 className="font-bold text-text-color">{name}</h1>
      <h2 className="font-bold text-sm text-second-text-color">{profession}</h2>
      <div className="flex gap-6">
        <i class="fa-brands fa-facebook text-2xl text-[#335BF5]"></i>
        <i class="fa-brands fa-instagram text-2xl text-[#E51F5A]"></i>
        <i class="fa-brands fa-twitter text-2xl text-[#21A6DF]"></i>
      </div>
    </div>
  );
}
