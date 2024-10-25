// eslint-disable-next-line no-unused-vars
import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Singhe Hospitals PLC is a public quoted, BOI approved Private
            Hospital located in Beliatta. The Hospital consists of services such
            as Channeling, Emergency services, Laboratory, Radiology (CT, X-Ray,
            Ultrasound), Pharmacy, In-Ward services from economy to VIP Suites,
            Surgical services with top of the range Modular Operating Theaters,
            ICU, in house Cafe and has ample parking space as well. Singhe
            Hospitals is also one of the leading Laboratory Service providers in
            the country, with 12 Laboratories and over 60 sample collection
            centers located island wide
          </p>
          <p>
            Our Mission is To be the benchmark in quality health care in the
            country, by transforming the health care experience through a
            culture of good caring and quality service at affordable cost.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            To provide safest and highest quality health care service and be the
            preferred health care provider in the country.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>{" "}
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>Easy to channeling doctors into your busy lifestyle </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Get your treatments easily and with modern technology.And can get highest quality drugs at government specified prices. </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>Recommend to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
