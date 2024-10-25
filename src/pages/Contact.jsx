// eslint-disable-next-line no-unused-vars
import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold"> US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Location</p>
          <p className="text-gray-500">
            87,
            <br /> Nugegoda, Boralessgamuwa
          </p>
          <p className="text-gray-500">
            Tel: 011-2248973 <br />
            info@healthcare.com
          </p>
          <p className="font-semibold text-lg text-gray-600">Careers at Health Care</p>
          <p className="text-gray-500">
            Please send us your resume within 14 working days of this
            advertisement by post to Human Resources Department, Singhe
            Hospitals PLC, No.87, Nugegoda, Boralessgamuwa. Or email us your C.V
            to careers@healthcare.com www.singhehospitals.com
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
