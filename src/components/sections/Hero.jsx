import React from "react";

const Hero = ({ data }) => {
  return (
    <section className="py-20 bg-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{data.title || "Welcome to our Website"}</h1>
        <p className="text-xl text-indigo-100 mb-10">{data.subtitle || "We build amazing things for you."}</p>
        {data.buttonText && (
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg">
            {data.buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
