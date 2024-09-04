import React from "react";
import Header from "../common/Header";
import ServiceCard from "../cards/ServiceCard";

function ServiceSection() {
  const serviceData = [
    {
      id: 0,
      iconUrl: "/images/deadline.png",
      title: "Fast and Reliable",
      description:
        "Our system ensures your Aptos tokens are converted to local currency to your mobile wallet within seconds, allowing you to access your cash immediately.",
    },
    {
      id: 1,
      iconUrl: "/images/secure.png",
      title: "Secure Transactions",
      description:
        "We employ robust security measures, including encryption and fraud detection, to safeguard your funds and personal information throughout the conversion process.",
    },
    {
      id: 2,
      iconUrl: "/images/easy-to-use.png",
      title: "Easy to Use",
      description:
        "Our app features a simple and intuitive interface, making it easy for users of all levels to navigate and complete conversions with ease.",
    },
  
  ];
  return (
    <section>
      <Header title="service" subtitle="Our Vison & Our Goal" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[3.56rem] justify-around mt-8 md:mt-[6.75rem]">
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            iconUrl={service.iconUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
