// app/(public)/companies/[companyId]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";
import { getRole } from "@/lib/roles";
import ConnectButton from "@/components/connect-button";

export const dynamic = "force-dynamic"; // page depends on auth cookies

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  // Fetch company + all employers
  const [company, auth] = await Promise.all([
    db.company.findUnique({
      where: { id: companyId },
      include: {
        employers: {
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    stackServerApp.getUser(),
  ]);

  if (!company) {
    notFound();
  }

  // Figure out viewer role (student/employer)
  const role = auth ? await getRole(auth.id) : null;

  // If the viewer is a student, compute connection status to each employer
  let statusByEmployer = new Map<string, "PENDING" | "ACCEPTED" | "REJECTED">();
  if (auth && role === "student" && company.employers.length) {
    const conns = await db.connection.findMany({
      where: {
        studentId: auth.id,
        employerId: { in: company.employers.map((e) => e.id) },
      },
      select: { employerId: true, status: true },
    });
    statusByEmployer = new Map(conns.map((c) => [c.employerId, c.status]));
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">{company.name}</h1>
      {company.industry && <p className="text-gray-600">{company.industry}</p>}
      {company.description && <p>{company.description}</p>}
      {company.websiteUrl && (
        <p>
          Website:{" "}
          <a
            className="text-blue-600 underline"
            href={company.websiteUrl}
            target="_blank"
          >
            {company.websiteUrl}
          </a>
        </p>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Employers ({company.employers.length})
        </h2>

        {company.employers.length === 0 ? (
          <p className="text-gray-600">No employers listed yet.</p>
        ) : (
          <ul className="space-y-2">
            {company.employers.map((e) => {
              const isMe = auth?.id === e.id;
              const status =
                (statusByEmployer.get(e.id) as
                  | "PENDING"
                  | "ACCEPTED"
                  | "REJECTED"
                  | undefined) || "NONE";

              return (
                <li
                  key={e.id}
                  className="border rounded p-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-medium">
                      Employer User ID:{" "}
                      <span className="font-mono">{shorten(e.id)}</span>{" "}
                      {isMe && (
                        <span className="text-sm text-gray-500">(You)</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {/* Placeholder: when you add employer profile fields or auth-user mapping,
                          show name/email/title here */}
                      Team member at {company.name}
                    </div>
                  </div>

                  {/* Students can request connections */}
                  {role === "student" && (
                    <ConnectButton
                      targetId={e.id}
                      initialStatus={status || "NONE"}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function shorten(id: string) {
  return id.length > 10 ? id.slice(0, 6) + "…" + id.slice(-4) : id;
}
