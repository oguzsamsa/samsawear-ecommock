import { logos } from "../data/logos";

export default function PartnerLogos() {
  return (
    <div className="logos flex justify-center py-24 w-3/4 mx-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-16">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`../../assets/homepage/homepage-logos/${logo}.png`}
            alt=""
            className=" md:w-[10%] h-auto"
          />
        ))}
      </div>
    </div>
  );
}
