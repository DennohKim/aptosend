import React from "react";
import Header from "../common/Header";
import TeamCard from "../cards/TeamCard";

function TeamSection() {
  const teamData = [
    {
      id: 0,
      imageUrl: "/images/chizaa.jpeg",
      name: "Dennis Kimathi",
      profession: "Fullstack Developer",
    },
    {
      id: 1,
      imageUrl: "/images/clinton.jpeg",
      name: "Clinton Njogu",
      profession: "Blockchain Developer",
    }
  ];
  return (
    <section className="mt-[9rem]">
      <Header title="our team" subtitle="Meet The Team" />
      <div className="grid grid-cols-1 gap-16  md:grid-cols-2 mt-8 md:mt-[3.31rem]">
        {teamData.map((team) => (
          <TeamCard
            key={team.id}
            imageUrl={team.imageUrl}
            name={team.name}
            profession={team.profession}
          />
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
