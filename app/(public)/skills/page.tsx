export default function SkillsInfoPage() {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-gray-700 text-3xl font-bold mb-6 text-center">
            Understanding Skills for the BYUH Virtual Career Fair
          </h1>
          <p className="text-gray-700 mb-8">
            Preparing for the BYUH Virtual Career Fair? Learn about skills and how to choose the right ones to showcase to employers. Highlighting your abilities can help you connect with the 50–100 companies looking for talented students like you.
          </p>
  
          <section className="mb-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">What Are Skills?</h2>
            <p className="text-gray-700">
              Skills, often called areas of expertise, are the abilities and talents you bring to a job or project. In the context of the career fair, these are the professional strengths you list on your profile, resume, or during conversations with employers. For example, a student majoring in computer science might list skills like Python programming, while an education major might highlight classroom management.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">Why Are Skills Important?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Stand Out:</strong> With over 1,000 students attending, showcasing unique skills like data analysis or public speaking can make your profile memorable to employers.
              </li>
              <li>
                <strong>Match Job Needs:</strong> Companies use specific criteria to find candidates. Listing skills that align with their job descriptions increases your chances of being noticed.
              </li>
              <li>
                <strong>Prove Your Value:</strong> Skills demonstrate your qualifications, showing employers you have the experience or training needed to succeed in their roles.
              </li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">Types of Skills to Showcase</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-700 text-xl font-medium">Hard Skills</h3>
                <p className="text-gray-700">
                  These are specific, teachable abilities you learn through education or training. Examples include:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Programming (e.g., Java, HTML)</li>
                  <li>Accounting</li>
                  <li>Graphic design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-700 text-xl font-medium">Soft Skills</h3>
                <p className="text-gray-700">
                  These are interpersonal or behavioral skills developed over time. Examples include:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Teamwork</li>
                  <li>Problem-solving</li>
                  <li>Time management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-700 text-xl font-medium">Job-Specific Skills</h3>
                <p className="text-gray-700">
                  These are skills tied to a particular role or industry. Examples include:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Lesson planning (for education majors)</li>
                  <li>Database management (for IT roles)</li>
                  <li>Event planning (for hospitality majors)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-700 text-xl font-medium">Certifications</h3>
                <p className="text-gray-700">
                  These are credentials that prove your expertise. Examples include:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Teaching license</li>
                  <li>Project Management Professional (PMP)</li>
                  <li>Adobe Certified Expert</li>
                </ul>
              </div>
            </div>
          </section>
  
          <section className="mb-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">How to Choose Skills for the Career Fair</h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              <li>
                <strong>List Your Abilities:</strong> Reflect on your education, internships, projects, or part-time jobs. Write down all the skills you’ve gained, such as coding, leadership, or customer service. Ask professors or peers for input if needed.
              </li>
              <li>
                <strong>Review Company Needs:</strong> Explore the profiles of companies attending the career fair. Look for skills they prioritize in their job postings, such as marketing or software development, to identify what’s in demand.
              </li>
              <li>
                <strong>Match and Prioritize:</strong> Compare your skills to the companies’ needs. Select 5–10 skills that best align with the roles you’re targeting and add them to your career fair profile or resume.
              </li>
            </ol>
          </section>
  
          <section className="text-center">
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-700 mb-4">
              Ready to showcase your skills? Update your profile with your top skills to attract employers at the BYUH Virtual Career Fair.
            </p>
            <a
              href="../" //need fix, maybe go to profile then add skills
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Manage Your Skills
            </a>
          </section>
  
          <p className="mt-8 text-center text-sm text-gray-700">
            <a href="../" className="text-blue-600 hover:underline">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    );
  }