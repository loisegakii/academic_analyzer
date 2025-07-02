// src/pages/Contact.jsx

import React from "react";

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Your Name" />
        <input className="w-full p-2 border rounded" type="email" placeholder="Your Email" />
        <textarea className="w-full p-2 border rounded" rows="4" placeholder="Your Message"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
