import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamMembers";

export default function Team() {
  return (
    <div className="font-display">
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col text-center items-center py-16 gap-8 w-4/5 mx-auto">
          <h2 className="font-bold text-second-text-color">WHAT WE DO</h2>
          <h1 className="font-bold text-4xl text-text-color">
            Innovation tailored for you
          </h1>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-sm text-text-color">Home</p>
            <i class="fa-solid fa-chevron-right text-[#BDBDBD] text-sm"></i>
            <p className="font-bold text-sm text-second-text-color">Team</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <img
          src="../../assets/team-page/hero-1.png"
          alt=""
          className="w-full md:w-1/2 object-cover h-2/3"
        />

        <div class="flex gap-1 md:w-1/2">
          <div class="flex flex-col gap-2 w-1/2">
            <img
              src="../../assets/team-page/hero-2.png"
              alt=""
              class="w-full h-full object-cover"
            />
            <img
              src="../../assets/team-page/hero-3.png"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-2 w-1/2">
            <img
              src="../../assets/team-page/hero-4.png"
              alt=""
              class="w-full h-full object-cover"
            />
            <img
              src="../../assets/team-page/hero-5.png"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] py-12">
        <div className="flex flex-col text-center w-1/2 mx-auto gap-6 md:w-1/3">
          <h1 className="font-bold text-4xl text-text-color">Meet Our Team</h1>
          <p className="text-sm text-second-text-color">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
      </div>

      <div className="team-cards flex flex-col gap-12 md:flex-row md:w-4/5 lg:w-3/5 md:mx-auto py-12">
        {teamMembers.map((member) => (
          <div className="flex-1" key={member.id}>
            <TeamCard
              key={member.id}
              name={member.name}
              profession={member.profession}
              imgSrc={member.imgSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
