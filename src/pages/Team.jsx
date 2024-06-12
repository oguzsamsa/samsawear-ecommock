import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamMembers";

export default function Team() {
  return (
    <div className="font-display">
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
