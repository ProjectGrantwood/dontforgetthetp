"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxOption,
} from "@/components/global-components/combobox";
import { HRule } from "@/components/global-components/hrule";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import ListItem from "./list-item";
import type { ItemTemplate } from "@/types/entities";

export default function CreateListForm({
  formattedDate,
  allItems,
  templates,
}: {
  formattedDate: string;
  allItems: ComboboxOption[];
  templates: ItemTemplate[];
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [items, setItems] = useState<ItemTemplate[]>([]);

  const handleAddItem = () => {
    const template =
      templates.find((t) => t.item_template_id === selectedTemplateId) ??
      ({
        item_template_id: "",
        item_name: "",
        default_units: "",
      } as ItemTemplate); // empty name + default unit

    setItems((prev) => [...prev, template]);
  };

  return (
    <form className="flex flex-col items-center mx-auto mt-3 text-xl w-1/2">
      <div className="flex flex-col items-center mx-auto w-full">
        <label htmlFor="list-title" className="mb-3">
          List Title
        </label>
        <input
          name="list-title"
          className="bg-white rounded text-black py-2 px-3 text-center text-sm w-full min-w-max"
          defaultValue={formattedDate}
        />
      </div>

      <HRule />

      <div className="mb-3">Items</div>

      <div className="flex flex-col items-center mx-auto w-full gap-2">
        {items.map((item) => (
          <ListItem key={`${item.item_template_id}`} item={item} />
        ))}
      </div>

      <div className="mt-4 flex flex-row justify-between gap-3 w-full">
        <Combobox
          options={allItems}
          placeholder="Add an item..."
          emptyText="No items found"
          onChange={setSelectedTemplateId}
        />
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleAddItem}
        >
          <PlusIcon />
        </Button>
      </div>
    </form>
  );
}
