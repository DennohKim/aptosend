import React from "react";
import { Separator } from "../ui/separator";

function FooterSection() {
  return (
    <section className="flex flex-col gap-[1.9rem] w-full mt-[10.44rem]">
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div>
          <img src="/images/AptoSend.png" alt="footer logo" />
        </div>
        <div className="text-lightBlue text-[1rem] font-serif">
          © 2024 AptoSend. All rights reserved.
        </div>
        <div className="flex gap-4">
          <p className="text-lightBlue text-[1rem]">How it Works</p>
          <p className="text-lightBlue text-[1rem]">About Us</p>
          <p className="text-lightBlue text-[1rem]">Reach us</p>

        </div>
      </div>
      <Separator />
    
    </section>
  );
}

export default FooterSection;
