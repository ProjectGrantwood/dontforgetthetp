import { ShoppingListJoinItemData } from "@/types/dto";
import { toMostSignificant } from "@/lib/utils";
import { Checkbox } from "@/components/shadcnui-components/checkbox";

export default function ViewListItem({
  item,
}: {
  item: ShoppingListJoinItemData;
}) {
  return (
    <tr className="h-16 bg-slate-600/50">
      {/* Done / checkbox */}
      <td className="align-middle text-center">
        <div className="flex justify-center items-center">
          <Checkbox />
        </div>
      </td>

      {/* Item name */}
      <td className="align-middle">
        <span>{item.item_name}</span>
      </td>

      {/* Quantity + units */}
      <td className="align-middle">
        <div className="flex flex-row space-x-2">
          <span>{toMostSignificant(item.amount, 2)}</span>
          <span>{item.default_units}</span>
        </div>
      </td>

      {/* Notes */}
      <td className="align-middle">
        {item.item_notes && item.item_notes.trim().length > 0 ? (
          <span className="text-lg text-emerald-500/70">{item.item_notes}</span>
        ) : (
          <span className="text-sm text-zinc-500">—</span>
        )}
      </td>
    </tr>
  );
}
