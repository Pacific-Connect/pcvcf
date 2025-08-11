// app/(public)/companies/[companyId]/page.tsx
import { db } from "@/lib/db";

export default async function CompanyPage({ params: { companyId } }: { params: { companyId: string }}) {
  const company = await db.company.findUnique({
    where: { id: companyId },
    include: {
      employers: {
        include: {
          user: true, // minimal; expand with profile fields if you add them
        },
      },
    },
  });
  if (!company) return <div className="max-w-3xl mx-auto">Company not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">{company.name}</h1>
      {company.industry && <p className="text-gray-600">{company.industry}</p>}
      {company.description && <p>{company.description}</p>}
      {company.websiteUrl && (
        <p>
          Website:{" "}
          <a className="text-blue-600 underline" href={company.websiteUrl} target="_blank">
            {company.websiteUrl}
          </a>
        </p>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Employers</h2>
        <ul className="space-y-1">
          {company.employers.map((e) => (
            <li key={e.id} className="border rounded p-3">
              Employer User ID: {e.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
