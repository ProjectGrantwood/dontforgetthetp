import { getListsByUserId } from "@/actions/list-actions";

export default async function PinnedLists({ userId }: { userId: string }) {
  const lists = await getListsByUserId(userId);

  return (
    <div className="flex flex-col items-center rounded bg-gray-900 w-7/8 h-48 m-auto">
      {lists.length === 0 ? (
        <h1 className="m-auto p-6 text-2xl text-white">
          You have no lists, so you might forget the TP. Click Create New List
          to get started!
        </h1>
      ) : (
        <div></div>
      )}
    </div>
  );
}
