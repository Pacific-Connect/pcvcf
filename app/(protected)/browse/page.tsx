// app/(protected)/browse/page.tsx
import { requireUser } from "@/lib/require-user";
import { getRole } from "@/lib/roles";
import { db } from "@/lib/db";
import ProfileCard from "@/components/profile-card";
import ConnectButton from "@/components/connect-button";
import type { Prisma, ConnectionStatus } from "@prisma/client";
import Link from "next/link";

type UIStatus = ConnectionStatus | "NONE";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const auth = await requireUser();
  const role = await getRole(auth.id);
  if (!role) {
    // Shouldn't happen because (protected)/layout redirects to /onboarding
    return <div className="max-w-3xl mx-auto">Complete onboarding first.</div>;
  }

  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) || "";
  const page = Math.max(
    1,
    Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1
  );
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  if (role === "student") {
    // 🧭 STUDENTS BROWSE COMPANIES (unique), then see ALL employers inside each card
    const whereCompanies: Prisma.CompanyWhereInput = {
      AND: [
        { employers: { some: {} } }, // only companies that actually have employers
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" as const } },
                { industry: { contains: q, mode: "insensitive" as const } },
                { description: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {},
      ],
    };

    const [companies, total] = await Promise.all([
      db.company.findMany({
        where: whereCompanies,
        orderBy: { name: "asc" },
        skip,
        take: pageSize,
        include: {
          employers: {
            orderBy: { createdAt: "desc" },
            select: { id: true, companyId: true },
          },
        },
      }),
      db.company.count({ where: whereCompanies }),
    ]);

    // Build status map for this student to each employer in the current page
    const employerIds = companies.flatMap((c) => c.employers.map((e) => e.id));
    const statusMap = new Map<string, UIStatus>();
    if (employerIds.length) {
      const myConnections = await db.connection.findMany({
        where: { studentId: auth.id, employerId: { in: employerIds } },
        select: { employerId: true, status: true },
      });
      for (const c of myConnections) statusMap.set(c.employerId, c.status as UIStatus);
    }

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Header q={q} />
        <h1 className="text-2xl font-semibold">Browse Companies</h1>

        <Grid>
          {companies.map((co) => (
            <ProfileCard
              key={co.id}
              title={co.name}
              subtitle={co.industry ?? ""}
              description={co.description ?? ""}
              right={<CompanyLink companyId={co.id} />}
            />
          ))}
        </Grid>

        <Pager total={total} page={page} pageSize={pageSize} q={q} />
      </div>
    );
  }

  // 👔 EMPLOYERS BROWSE STUDENTS (unchanged)
  const where: Prisma.StudentWhereInput = q
    ? {
        OR: [
          { firstName: { contains: q, mode: "insensitive" as const } },
          { lastName: { contains: q, mode: "insensitive" as const } },
          { major: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [students, total, myConnections] = await Promise.all([
    db.student.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    db.student.count({ where }),
    db.connection.findMany({
      where: { employerId: auth.id },
      select: { studentId: true, status: true },
    }),
  ]);

  const statusMap = new Map<string, UIStatus>(
    myConnections.map((c) => [c.studentId, c.status as UIStatus])
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Header q={q} />
      <h1 className="text-2xl font-semibold">Browse Students</h1>

      <Grid>
        {students.map((s) => (
          <ProfileCard
            key={s.id}
            title={`${s.firstName} ${s.lastName}`}
            subtitle={`${s.major} • Class of ${s.graduationYear}`}
            description={s.websiteUrl ? `Portfolio: ${s.websiteUrl}` : ""}
          >
            <ConnectButton
              targetId={s.id}
              initialStatus={statusMap.get(s.id) ?? "NONE"}
            />
          </ProfileCard>
        ))}
      </Grid>

      <Pager total={total} page={page} pageSize={pageSize} q={q} />
    </div>
  );
}

function Header({ q }: { q: string }) {
  return (
    <form className="flex gap-2" action="/browse">
      <input
        name="q"
        defaultValue={q}
        placeholder="Search companies or students…"
        className="border p-2 rounded w-full"
      />
      <button className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
    </form>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function Pager({
  total,
  page,
  pageSize,
  q,
}: {
  total: number;
  page: number;
  pageSize: number;
  q: string;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const makeHref = (p: number) =>
    `/browse?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
  return (
    <div className="flex items-center gap-2">
      <Link href={makeHref(Math.max(1, page - 1))} className="px-3 py-1 border rounded">
        Prev
      </Link>
      <span>
        Page {page} of {pages}
      </span>
      <Link href={makeHref(Math.min(pages, page + 1))} className="px-3 py-1 border rounded">
        Next
      </Link>
    </div>
  );
}

function CompanyLink({ companyId }: { companyId: string }) {
  return (
    <Link href={`/companies/${companyId}`} className="text-sm text-blue-600 underline">
      View company
    </Link>
  );
}
