export default function PinnedListsSkeleton({
  icon,
  listPreviewName,
}: {
  icon?: React.ReactNode;
  listPreviewName: string;
}) {
  return (
    <div className="mx-auto my-1.5 w-full px-4 py-3 text-center p-3 rounded bg-slate-900/50">
      <h1 className="flex text-3xl pb-3">
        {icon}
        {listPreviewName}
      </h1>
    </div>
  );
}
