import React from "react";
import MainButton from "../common/MainButton";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="flex justify-between flex-col md:flex-row gap-4 items-center">
      <div>
        <p className="font-[850] md:leading-[5.0625rem] text-2xl md:text-[4.375rem] text-darkBlue">
        Instant Aptos Cashout
        </p>
        <p className="text-[1.375rem] font-[500]">
          Your gateway to real-world spending with your Aptos tokens.
        </p>
        <div className="flex gap-[1.75rem] items-center mt-[3rem]">
          <MainButton text="Get Started" classes="shadow-none w-[10.125rem]" />
          
        </div>
      </div>
      <div>
        <Image
          src="/images/hero.png"
          alt="guy with phone surrounded by action icons"
          width={1000}
          height={500}
        />
      </div>
    </section>
  );
}

export default HeroSection;
