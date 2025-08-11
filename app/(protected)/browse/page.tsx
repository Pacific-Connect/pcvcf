// app/(protected)/browse/page.tsx
import Link from "next/link";
import { requireUser } from "@/lib/require-user";
import { getRole } from "@/lib/roles";
import { db } from "@/lib/db";
import EmployerCard from "@/components/browse/employer-card";
import StudentCard from "@/components/browse/student-card";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 12;

type SearchParams = { q?: string; page?: string };

export default async function BrowsePage({ searchParams }: { searchParams?: SearchParams }) {
  const user = await requireUser();
  const role = await getRole(user.id);

  if (!role) {
    return (
      <div className="max-w-3xl mx-auto">
        <p className="mb-2">Please complete onboarding.</p>
        <Link className="text-blue-600 underline" href="/onboarding">
          Go to onboarding
        </Link>
      </div>
    );
  }

  const q = (searchParams?.q ?? "").trim();
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const skip = (page - 1) * PAGE_SIZE;

  if (role === "student") {
    // Students browse EMPLOYERS (filter by related Company fields)
    const where: Prisma.EmployerWhereInput = q
      ? {
          OR: [
            { company: { is: { name: { contains: q, mode: Prisma.QueryMode.insensitive } } } },
            { company: { is: { industry: { contains: q, mode: Prisma.QueryMode.insensitive } } } },
            { company: { is: { description: { contains: q, mode: Prisma.QueryMode.insensitive } } } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      db.employer.findMany({
        where,
        include: { company: true }, // ensure company is present for the card
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip,
      }),
      db.employer.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Browse Employers</h1>
        <SearchBar initialQ={q} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((emp) => (
            <EmployerCard key={emp.id} employer={emp} />
          ))}
        </div>
        <Pager page={page} totalPages={totalPages} q={q} />
      </div>
    );
  }

  // Employers browse STUDENTS
  const where: Prisma.StudentWhereInput = q
    ? {
        OR: [
          { firstName: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { lastName: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { major: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    db.student.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    db.student.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Browse Students</h1>
      <SearchBar initialQ={q} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((stu) => (
          <StudentCard key={stu.id} student={stu} />
        ))}
      </div>
      <Pager page={page} totalPages={totalPages} q={q} />
    </div>
  );
}

function SearchBar({ initialQ }: { initialQ: string }) {
  return (
    <form className="flex gap-2" action="/browse" method="get">
      <input
        name="q"
        defaultValue={initialQ}
        placeholder="Search by name, major, or company..."
        className="border p-2 rounded w-full"
      />
      <button className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
    </form>
  );
}

function Pager({ page, totalPages, q }: { page: number; totalPages: number; q: string }) {
  const prev =
    page > 1 ? `/browse?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}` : null;
  const next =
    page < totalPages ? `/browse?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}` : null;

  return (
    <div className="flex items-center justify-between mt-4">
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {prev ? (
          <Link href={prev} className="px-3 py-1.5 rounded border">
            Previous
          </Link>
        ) : (
          <button className="px-3 py-1.5 rounded border opacity-50" disabled>
            Previous
          </button>
        )}
        {next ? (
          <Link href={next} className="px-3 py-1.5 rounded border">
            Next
          </Link>
        ) : (
          <button className="px-3 py-1.5 rounded border opacity-50" disabled>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
