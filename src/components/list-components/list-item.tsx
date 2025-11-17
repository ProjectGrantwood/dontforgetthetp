"use client";

import { ListItemData } from "@/types/formDataObjects";
import { Input } from "@/components/shadcnui-components/input";
import { Button } from "@/components/shadcnui-components/button";
import { Textarea } from "@/components/shadcnui-components/textarea";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LABEL_STYLE = "text-lg text-gray-500 min-h-8";
const INPUT_STYLE = "text-lg min-h-8 md:text-lg";
const INPUT_LABEL_WRAPPER_STYLE = "flex flex-col items-center";

export default function ListItem({
  item,
  onRemoveAction,
  onUpdateNotesAction,
  index,
  className,
}: {
  item: ListItemData;
  onRemoveAction: (index: number) => void;
  onUpdateNotesAction: (index: number, notes: string) => void;
  index: number;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleNotes = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={className}>
      <div className="flex flex-row items-center max-w-[400px] gap-3 justify-between text-center text-lg text-white">
        <div className="flex flex-col">
          <Input
            type="text"
            name="item-name"
            defaultValue={item.item_name}
            className={INPUT_STYLE}
          />
          <label htmlFor="item-name" className={LABEL_STYLE}>
            name
          </label>
        </div>
        <div className={INPUT_LABEL_WRAPPER_STYLE}>
          <span>:</span>
          <p className="h-8"></p>
        </div>
        <div className={`${INPUT_LABEL_WRAPPER_STYLE} w-32`}>
          <Input
            type="number"
            defaultValue={1}
            min={1}
            max={100}
            name="item-amount"
            className={INPUT_STYLE}
          />
          <label htmlFor="item-amount" className={LABEL_STYLE}>
            amount
          </label>
        </div>
        <div className={INPUT_LABEL_WRAPPER_STYLE}>
          <Input
            type="text"
            defaultValue={item.default_units}
            name="item-units"
            className={INPUT_STYLE}
          />
          <label htmlFor="item-units" className={LABEL_STYLE}>
            units
          </label>
        </div>
        <div className={INPUT_LABEL_WRAPPER_STYLE}>
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-400 active:bg-gray-300 text-white py-2 px-4 text-lg rounded"
            onClick={() => toggleNotes()}
          >
            <PencilSquareIcon className="w-8 h-8" />
          </Button>
          <p className="h-8"></p>
        </div>
        <div className={INPUT_LABEL_WRAPPER_STYLE}>
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white py-2 px-4 text-lg rounded"
            onClick={() => onRemoveAction(index)}
          >
            <TrashIcon className="w-8 h-8" />
          </Button>
          <p className="h-8"></p>
        </div>
      </div>
      {isEditing && (
        <div className="flex flex-col w-full max-w-[400px] mt-2">
          <Textarea
            name="item-notes"
            placeholder="Add notes..."
            defaultValue={item.notes}
            onChange={(e) => onUpdateNotesAction(index, e.target.value)}
            className="text-lg md:text-lg resize-none"
          />
          <label
            htmlFor="item-notes"
            className={`${LABEL_STYLE} hidden`}
            aria-hidden="true"
          >
            notes
          </label>
        </div>
      )}
    </div>
  );
}
