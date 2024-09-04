import React from "react";
import MainButton from "../common/MainButton";

function VideoPlayerSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-8 mt-[11.31rem]">
      <div>
        <p className="text-lightBlue font-bold text-2xl ">
        Low Fees
        </p>
        <p className="text-customLightGray text-[1.2rem] mt-4 mb-8">
       We offer competitive transaction fees, ensuring you get the most value from your Aptos tokens. Our pricing structure is transparent, with no hidden charges or fees.
        </p>
        <MainButton
          text="Explore"
          classes="!h-[3.01544rem] hover:bg-white w-[8.2925rem] text-lightBlue font-bold text-[1rem] rounded-[6.25rem] border-[4px] border-[#EBEAED] bg-white shadow-none"
        />
      </div>
      <div>
        <img src="/images/video_player.png" alt="video player" />
      </div>
    </section>
  );
}

export default VideoPlayerSection;
