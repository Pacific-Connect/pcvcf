// components/profile-card.tsx
export default function ProfileCard({
  title,
  subtitle,
  description,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          {subtitle ? <div className="text-sm text-gray-600">{subtitle}</div> : null}
        </div>
        {right}
      </div>
      {description ? <p className="text-sm">{description}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}
