"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const companyLogos = [
    {
      name: "Google",
      logo: "/Google-Logo.png",
      url: "https://companyA.com",
    },
    {
      name: "Facebook",
      logo: "/Facebook-Logo.png",
      url: "https://companyB.com",
    },
    {
      name: "Amazon",
      logo: "/Amazon-Logo.png",
      url: "https://companyC.com",
    },
    {
      name: "Twitter",
      logo: "/Twitter-Logo.png",
      url: "https://companyD.com",
    },
    {
      name: "TikTok",
      logo: "/TikTok-Logo.png",
      url: "https://companyE.com",
    },
    {
      name: "Youtube",
      logo: "/YouTube-Logo.png",
      url: "https://companyF.com",
    },
    {
      name: "Messager",
      logo: "/Messenger-Logo.png",
      url: "https://companyG.com",
    },
    {
      name: "WhatsApp",
      logo: "/WhatsApp-Logo.png",
      url: "https://companyH.com",
    },
    {
      name: "Snapchat",
      logo: "/Snapchat-Logo.png",
      url: "https://companyI.com",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <Image src="/mainlogo.png" alt="Logo" width={150} height={100} />
        <div className="flex items-center">
          <nav className="flex items-center space-x-6">
            <Link href="#about">About</Link>
            <Link href="#skills">Skill</Link>
            <Link href="#find-job">Find a Job</Link>
            <Link href="#employer">Employer</Link>
            <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>
          </nav>
        </div>
      </header>

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
            <Link href="/find-job">
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

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © pcvcf 2025
      </footer>
    </div>
  );
}
