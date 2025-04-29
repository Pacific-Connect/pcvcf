"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const companyLogos = [
    {
      name: "Google",
      logo: "/Google-Logo.png",
      url: "#",
    },
    {
      name: "Facebook",
      logo: "/Facebook-Logo.png",
      url: "#",
    },
    {
      name: "Amazon",
      logo: "/Amazon-Logo.png",
      url: "#",
    },
    {
      name: "Twitter",
      logo: "/Twitter-Logo.png",
      url: "#",
    },
    {
      name: "TikTok",
      logo: "/TikTok-Logo.png",
      url: "#",
    },
    {
      name: "Youtube",
      logo: "/YouTube-Logo.png",
      url: "#",
    },
    {
      name: "Messager",
      logo: "/Messenger-Logo.png",
      url: "#",
    },
    {
      name: "WhatsApp",
      logo: "/WhatsApp-Logo.png",
      url: "#",
    },
    {
      name: "Snapchat",
      logo: "/Snapchat-Logo.png",
      url: "#",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* BODY */}
      <main className="flex-1 bg-gray-100">
        <div className="relative w-full h-[500px]">
          <Image
            src="/jobsearch.jpg"
            alt="Job Search"
            fill
            className="object-cover"
          />
          {/* Button at the center bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Link href="#">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 shadow-lg">
                Start Find Job
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* FEATURE EMPLOYER */}
      <section className="bg-white px-10 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Feature Employer
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {companyLogos.map((company, index) => (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 border rounded-lg hover:shadow-lg"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
