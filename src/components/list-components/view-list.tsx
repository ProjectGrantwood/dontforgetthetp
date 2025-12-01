"use client";

import { HRule } from "@/components/global-components/hrule";
import ViewListItem from "@/components/list-components/view-list-item";
import type { ShoppingListJoinItemData } from "@/types/dto";
import { Pin } from "lucide-react";

type ViewListProps = {
  listName: string;
  formattedDateLabel: string;
  notes: string | null;
  isPublic: boolean;
  isPinned: boolean;
  items: ShoppingListJoinItemData[];
};

export default function ViewList({
  listName,
  formattedDateLabel,
  notes,
  isPublic,
  isPinned,
  items,
}: ViewListProps) {
  return (
    <div className="flex flex-col items-center mx-auto mt-3 text-5xl w-[400px] max-w-[400px]">
      {/* Title */}
      <div className="flex flex-col items-center mx-auto w-full">
        <h1 className="py-5 px-3 my-3 text-center text-5xl w-full min-w-max bg-zinc-900 rounded-md">
          {listName}
        </h1>
        <p className="text-lg text-zinc-400">{formattedDateLabel}</p>
      </div>

      <HRule />

      {/* Items */}
      <div className="flex flex-col mx-auto mb-3 p-3 w-full h-full gap-2 bg-zinc-900 rounded-md">
        <div className="flex flex-col items-center mx-auto w-full">
          <h1 className="mb-3">Items</h1>
        </div>

        {items.length === 0 ? (
          <span className="h-full my-auto text-center items-center text-lg text-neutral-400">
            No items on this list.
          </span>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-2xl text-white border-separate border-spacing-y-1">
              <thead>
                <tr className="text-sm text-zinc-400">
                  <th className="w-10 text-center align-middle">Done</th>
                  <th className="text-left align-middle">Item</th>
                  <th className="text-left align-middle">Qty</th>
                  <th className="text-left align-middle">Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <ViewListItem key={item.list_item_id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <HRule />

      {/* Other / metadata */}
      <div className="mt-4 flex flex-col justify-between w-full max-w-[400px]">
        {/* Header row with chits */}
        <div className="flex flex-row items-center justify-between mb-3">
          <h3>Other</h3>

          <div className="flex flex-row gap-2 items-center">
            {isPublic && (
              <span className="text-xs rounded-full bg-emerald-900/40 px-2 py-1 text-emerald-300">
                Public
              </span>
            )}

            {isPinned && (
              <span className="flex items-center gap-1 text-xs rounded-full bg-blue-900/40 px-2 py-1 text-blue-300">
                <Pin size={12} />
                Pinned
              </span>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col w-full max-w-[400px] mb-3">
          <div className="text-lg text-emerald-500/50 min-h-5 whitespace-pre-wrap bg-zinc-900 p-2 rounded-md">
            {notes && notes.trim().length > 0
              ? notes
              : "No additional notes for this list."}
          </div>
        </div>
      </div>
    </div>
  );
}
