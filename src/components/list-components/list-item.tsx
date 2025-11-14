"use client";

import { ItemTemplate } from "@/types/entities";
import { Input } from "@/components/shadcnui-components/input";

export default function ListItem({ item }: { item: ItemTemplate }) {
  return (
    <div className="flex flex-row w-full items-center max-w-[300px] gap-3 justify-between text-sm">
      <Input type="text" placeholder={item.item_name} />
      :
      <Input type="number" defaultValue={1} name="amount" />
      <Input type="text" placeholder={item.default_units} />
    </div>
  );
}
