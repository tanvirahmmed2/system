import React from "react";

const FeatureSection = ({ data }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">{data.title || "Our Features"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(data.features || [
            { title: "Fast", desc: "We are very fast" },
            { title: "Secure", desc: "We are very secure" },
            { title: "Scalable", desc: "We scale with you" }
          ]).map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
