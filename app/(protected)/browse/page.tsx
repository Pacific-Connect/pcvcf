// app/(protected)/browse/page.tsx
import { requireUser } from "@/lib/require-user";
import { getRole } from "@/lib/roles";
import { db } from "@/lib/db";
import ProfileCard from "@/components/profile-card";
import ConnectButton from "@/components/connect-button";
import type { Prisma, ConnectionStatus } from "@prisma/client";

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
    // Students browse EMPLOYERS (via their companies)
    const where: Prisma.EmployerWhereInput = q
      ? {
          OR: [
            {
              company: {
                is: { name: { contains: q, mode: "insensitive" as const } },
              },
            },
            {
              company: {
                is: { industry: { contains: q, mode: "insensitive" as const } },
              },
            },
            {
              company: {
                is: {
                  description: { contains: q, mode: "insensitive" as const },
                },
              },
            },
          ],
        }
      : {};

    const [employers, total, myConnections] = await Promise.all([
      db.employer.findMany({
        where,
        include: { company: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      db.employer.count({ where }),
      db.connection.findMany({
        where: { studentId: auth.id },
        select: { employerId: true, status: true },
      }),
    ]);

    const statusMap = new Map<string, UIStatus>(
      myConnections.map((c) => [c.employerId, c.status as UIStatus])
    );

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Header q={q} />
        <h1 className="text-2xl font-semibold">Browse Employers</h1>

        <Grid>
          {employers.map((e) => (
            <ProfileCard
              key={e.id}
              title={e.company?.name ?? "Employer"}
              subtitle={e.company?.industry ?? ""}
              description={e.company?.description ?? ""}
              right={<CompanyLink companyId={e.companyId} />}
            >
              <ConnectButton
                targetId={e.id}
                initialStatus={statusMap.get(e.id) ?? "NONE"}
              />
            </ProfileCard>
          ))}
        </Grid>

        <Pager total={total} page={page} pageSize={pageSize} q={q} />
      </div>
    );
  }

  // Employers browse STUDENTS
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
        placeholder="Search by name, major, company, industry…"
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
      <a href={makeHref(Math.max(1, page - 1))} className="px-3 py-1 border rounded">
        Prev
      </a>
      <span>
        Page {page} of {pages}
      </span>
      <a href={makeHref(Math.min(pages, page + 1))} className="px-3 py-1 border rounded">
        Next
      </a>
    </div>
  );
}

function CompanyLink({ companyId }: { companyId: string }) {
  return (
    <a href={`/companies/${companyId}`} className="text-sm text-blue-600 underline">
      View company
    </a>
  );
}
