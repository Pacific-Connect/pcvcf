// components/browse/student-card.tsx
import ConnectButton from "@/components/connect-button";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  graduationYear: number;
  websiteUrl: string | null;
  resumeUrl: string | null;
};

export default function StudentCard({ student }: { student: Student }) {
  const name = `${student.firstName} ${student.lastName}`;
  return (
    <div className="border rounded p-4 space-y-2">
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm text-gray-600">{student.email}</div>
      <div className="text-sm">Major: {student.major}</div>
      <div className="text-sm">Graduation: {student.graduationYear}</div>
      <div className="flex gap-3 text-sm">
        {student.websiteUrl && (
          <a href={student.websiteUrl} className="text-blue-600 underline" target="_blank">
            Website
          </a>
        )}
        {student.resumeUrl && (
          <a href={student.resumeUrl} className="text-blue-600 underline" target="_blank">
            Resume
          </a>
        )}
      </div>
      {/* For an employer viewing students, targetId should be the student.id */}
      <ConnectButton targetId={student.id} />
    </div>
  );
}
