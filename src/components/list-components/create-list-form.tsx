"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Combobox,
  ComboboxOption,
} from "@/components/global-components/combobox";
import { HRule } from "@/components/global-components/hrule";
import { Input } from "@/components/shadcnui-components/input";
import { Button } from "@/components/shadcnui-components/button";
import { Textarea } from "@/components/shadcnui-components/textarea";
import { Switch } from "@/components/shadcnui-components/switch";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateListItem from "@/components/list-components/create-list-item";
import type { ItemTemplate } from "@/types/entities";
import { ShoppingListJoinNewItemData } from "@/types/dto";
import { createListAction } from "@/actions/list-actions";

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
  const [items, setItems] = useState<ShoppingListJoinNewItemData[]>([]);
  const [notes, setNotes] = useState("");

  const convertTemplateToListItem = (
    template: ItemTemplate,
  ): ShoppingListJoinNewItemData => {
    return {
      list_item_id: `${crypto.randomUUID()}`,
      item_name: template.item_name,
      item_notes: "",
      default_units: template.default_units,
      amount: 1,
    };
  };

  const memoizeItems = useMemo(() => JSON.stringify(items), [items]);

  const handleAddItem = () => {
    const template =
      templates.find((t) => t.item_template_id === selectedTemplateId) ??
      ({
        item_template_id: "",
        item_name: "My new item",
        default_units: "units",
      } as ItemTemplate);
    const templateAsListItem = convertTemplateToListItem(template);
    setItems((prev) => [...prev, templateAsListItem]);
    setSelectedTemplateId("");
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectTemplate = useCallback(
    (itemTemplateId: string) => {
      if (itemTemplateId === selectedTemplateId) {
        setSelectedTemplateId("");
      } else {
        setSelectedTemplateId(itemTemplateId);
      }
    },
    [selectedTemplateId],
  );

  const handleUpdateNotes = (index: number, notes: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, item_notes: notes } : item,
      ),
    );
  };

  const handleUpdateItemName = (index: number, name: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, item_name: name } : item,
      ),
    );
  };

  const handleUpdateItemAmount = (index: number, amount: number) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, amount: amount } : item)),
    );
  };

  const handleUpdateItemUnits = (index: number, units: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, default_units: units } : item,
      ),
    );
  };

  return (
    <form
      autoComplete="off"
      action={createListAction}
      className="flex flex-col items-center mx-auto mt-3 text-5xl w-[400px] max-w-[400px]"
    >
      <div className="flex flex-col items-center mx-auto w-full">
        <label htmlFor="list-title">List Title</label>
        <Input
          name="list-title"
          className="py-5 px-3 my-3 text-center text-lg md:text-lg w-full min-w-max hover:bg-zinc-600/30"
          defaultValue={formattedDate}
        />
      </div>

      <HRule />
      <div className="flex flex-col items-center mx-auto mb-3 p-3 w-full h-full gap-2 bg-zinc-900 rounded-md">
        {items.length === 0 ? (
          <span className="h-full my-auto text-center items-center text-lg text-neutral-400">
            No TP on this list. Add an item to get started!
          </span>
        ) : (
          <h1 className="mb-3">Items</h1>
        )}
        {items.map((item, index) => (
          <CreateListItem
            key={`${item.list_item_id}`}
            item={item}
            onRemoveAction={handleRemoveItem}
            onUpdateNotesAction={handleUpdateNotes}
            onUpdateItemNameAction={handleUpdateItemName}
            onUpdateItemAmountAction={handleUpdateItemAmount}
            onUpdateItemUnitsAction={handleUpdateItemUnits}
            index={index}
            className="p-3 border border-zinc-500 nth-[2]:rounded-tl-xl nth-last-[2]:rounded-br-xl"
          />
        ))}

        <div className="mt-4 flex flex-row justify-between w-full max-w-[400px]">
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white py-2 ps-4 pe-none rounded-s rounded-e-none text-lg border-zinc-500 outline-zinc-500 md:border-zinc-500 md:outline-zinc-500"
            onClick={handleAddItem}
          >
            <PlusIcon />
            Add...
          </Button>
          <Combobox
            options={allItems}
            placeholder="Add an item..."
            emptyText="No items found"
            onSelectAction={handleSelectTemplate}
            selectedValue={selectedTemplateId}
          />
        </div>
      </div>
      <input type="hidden" name="items" value={memoizeItems} />
      <HRule />

      <div className="mt-4 flex flex-col justify-between w-full max-w-[400px]"></div>
      <h3 className="mb-3">Other</h3>
      <Textarea
        name="list-notes"
        className="resize-none text-lg md:text-lg max-h-5 h-5"
        spellCheck={false}
        placeholder="Any extra notes... ?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex flex-row items-center justify-between w-full mt-3 bg-zinc-900 p-3 rounded-md">
        <label htmlFor="is-public" className="text-lg">
          Make this list public?
        </label>
        <Switch name="is-public" />
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-3 bg-zinc-900 p-3 rounded-md">
        <label htmlFor="is-pinned" className="text-lg">
          Pin this list after creation?
        </label>
        <Switch name="is-pinned" />
      </div>
      <HRule />

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white p-6 rounded text-3xl w-full"
      >
        Save List
      </Button>
    </form>
  );
}
