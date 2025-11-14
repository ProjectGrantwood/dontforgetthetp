"use client";

import { ItemTemplate } from "@/types/entities";
import { Input } from "@/components/shadcnui-components/input";
import { Button } from "@/components/shadcnui-components/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ListItem({
  item,
  onRemoveAction,
  index,
}: {
  item: ItemTemplate;
  onRemoveAction: (index: number) => void;
  index: number;
}) {
  return (
    <div className="flex flex-row items-center max-w-[300px] gap-3 justify-between text-sm text-white mb-1.5">
      <div className="flex flex-col items-center">
        <Input type="text" name="item-name" placeholder={item.item_name} />
        <label
          htmlFor="item-name"
          className="text-xs text-gray-500 text-center"
        >
          name
        </label>
      </div>
      <div className="flex flex-col items-center">
        <span>:</span>
        <p className="text-xs h-4"></p>
      </div>
      <div className="flex flex-col items-center w-32">
        <Input type="number" defaultValue={1} name="item-amount" />
        <label
          htmlFor="item-amount"
          className="text-xs text-gray-500 text-center"
        >
          amount
        </label>
      </div>
      <div className="flex flex-col items-center">
        <Input
          type="text"
          defaultValue={item.default_units}
          name="item-units"
        />
        <label
          htmlFor="item-units"
          className="text-xs text-gray-500 text-center"
        >
          units
        </label>
      </div>
      <div className="flex flex-col items-center">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => onRemoveAction(index)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        <p className="text-xs h-4"></p>
      </div>
    </div>
  );
}
