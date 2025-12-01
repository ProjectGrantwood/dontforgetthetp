import LinkButton from "@/components/global-components/link-button";
import { Trash, Edit, Eye, ShoppingCart } from "lucide-react";

export type ListCardProps = {
  id: string;
  name: string;
  itemCount: number;
  updatedAt: Date;
  isPublic: boolean;
};

export default function ListCard({
  id,
  name,
  itemCount,
  updatedAt,
  isPublic,
}: ListCardProps) {
  return (
    <div
      className="
        flex flex-col
        rounded-lg border border-zinc-700/80 bg-zinc-900/70
        px-4 py-3
        text-sm
        cursor-default
      "
      aria-label={`${name} summary`}
    >
      <div>
        <div className="flex justify-between">
          <h2 className="text-base font-semibold text-zinc-50 truncate">
            {name}
          </h2>

          {isPublic && (
            <span className="text-xs rounded-full bg-emerald-900/40 px-2 py-0.5 text-emerald-300">
              Public
            </span>
          )}
        </div>

        <div className="flex flex-row justify-between">
          <p className="mt-1 text-xs text-zinc-400">
            {itemCount} item{itemCount !== 1 && "s"}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Updated {updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Four buttons instead of one */}
      <div className="mt-3 flex flex-row justify-between gap-2 w-full">
        <LinkButton
          href={`/home/lists/${id}/view`}
          className="flex-1 text-center"
        >
          <Eye size={16} className="inline-block mr-1" />
          View
        </LinkButton>

        <LinkButton
          href={`/home/lists/${id}/edit`}
          className="flex-1 text-center"
        >
          <Edit size={16} className="inline-block mr-1" />
          Edit
        </LinkButton>

        <LinkButton
          href={`/home/lists/${id}/shop`}
          className="flex-1 text-center"
        >
          <ShoppingCart size={16} className="inline-block mr-1" />
          Shop
        </LinkButton>

        <LinkButton
          href={`/home/lists/${id}/delete`}
          className="flex-1 text-center text-red-400 hover:text-red-300"
        >
          <Trash size={16} className="inline-block mr-1" />
          Delete
        </LinkButton>
      </div>
    </div>
  );
}
