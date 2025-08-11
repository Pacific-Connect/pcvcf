// components/browse/employer-card.tsx
import Link from "next/link";
import ConnectButton from "@/components/connect-button";

type EmployerWithCompany = {
  id: string;
  company: {
    id: string;
    name: string;
    industry: string | null;
    websiteUrl: string | null;
    description: string | null;
  } | null;
};

export default function EmployerCard({ employer }: { employer: EmployerWithCompany }) {
  const company = employer.company;
  return (
    <div className="border rounded p-4 space-y-2">
      <div className="text-lg font-semibold">
        {company?.name ?? "Unknown company"}
      </div>
      {company?.industry && <div className="text-sm text-gray-600">{company.industry}</div>}
      {company?.websiteUrl && (
        <a href={company.websiteUrl} className="text-blue-600 underline text-sm" target="_blank">
          {company.websiteUrl}
        </a>
      )}
      {company?.id && (
        <Link href={`/companies/${company.id}`} className="text-sm underline">
          View company
        </Link>
      )}
      {/* For a student viewing employers, targetId should be the employer.id */}
      <ConnectButton targetId={employer.id} />
    </div>
  );
}
