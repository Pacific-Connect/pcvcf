"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const companyLogos = [
    {
      name: "Company A",
      logo: "/logos/companyA.png",
      url: "https://companyA.com",
    },
    {
      name: "Company B",
      logo: "/logos/companyB.png",
      url: "https://companyB.com",
    },
    {
      name: "Company C",
      logo: "/logos/companyC.png",
      url: "https://companyC.com",
    },
    {
      name: "Company D",
      logo: "/logos/companyD.png",
      url: "https://companyD.com",
    },
    {
      name: "Company E",
      logo: "/logos/companyE.png",
      url: "https://companyE.com",
    },
    {
      name: "Company F",
      logo: "/logos/companyF.png",
      url: "https://companyF.com",
    },
    {
      name: "Company G",
      logo: "/logos/companyG.png",
      url: "https://companyG.com",
    },
    {
      name: "Company H",
      logo: "/logos/companyH.png",
      url: "https://companyH.com",
    },
    {
      name: "Company I",
      logo: "/logos/companyI.png",
      url: "https://companyI.com",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <nav className="flex items-center space-x-6">
          <Link href="#about">About</Link>
          <Link href="#skills">Skill</Link>
          <Link href="#find-job">Find a Job</Link>
          <Link href="#employer">Employer</Link>
          <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </button>
        </nav>
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-10">
        <div className="relative w-full max-w-4xl h-96">
          <Image
            src="/job-search.jpg"
            alt="Job Search"
            fill
            className="object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/find-job">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700">
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
