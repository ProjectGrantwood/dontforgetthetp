export default function PinnedListsSkeleton() {
  return (
    <div className="rounded bg-gray-900 w-7/8 min-h-max m-auto mt-3 grid grid-rows-4 grid-cols-[16px_auto] gap-3">
      <div className=" rounded-lg bg-gray-800 p-3 mx-3 mt-3 w-4 h-4"></div>
      <div className="rounded-sm bg-gray-800 p-3 mx-3 mt-3 h-4"></div>
      <div className=" rounded-lg bg-gray-800 p-3 m-3 w-4 h-4"></div>
      <div className="rounded-sm bg-gray-800 p-3 m-3 h-4"></div>
      <div className=" rounded-lg bg-gray-800 p-3 m-3 w-4 h-4"></div>
      <div className="rounded-sm bg-gray-800 p-3 m-3 h-4"></div>
      <div className=" rounded-lg bg-gray-800 p-3 m-3 w-4 h-4"></div>
      <div className="rounded-sm bg-gray-800 p-3 m-3 h-4"></div>
    </div>
  );
}
