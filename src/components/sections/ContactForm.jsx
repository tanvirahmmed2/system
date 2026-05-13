import React from "react";

const ContactForm = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{data.title || "Get in Touch"}</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600" />
          <textarea placeholder="Message" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 h-32"></textarea>
          <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
