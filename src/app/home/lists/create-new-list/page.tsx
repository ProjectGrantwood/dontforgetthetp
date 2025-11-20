import { formatDate } from "@/lib/timeDateUtils";
import { stackServerApp } from "@/stack/server";
import { ComboboxOption } from "@/components/global-components/combobox";
import CreateListForm from "@/components/list-components/create-list-form";
import { cache } from "react";
import { getAllItems } from "@/db/data-access/itemtemplate-access";

const cachedGetAllItems = cache(getAllItems);

export default async function Page() {
  await stackServerApp.getUser({ or: "redirect" });
  const formattedDate = formatDate(new Date());

  const globalItems = await cachedGetAllItems();

  const allItems: ComboboxOption[] = globalItems.map((item) => ({
    label: item.item_name,
    value: item.item_template_id,
  }));
  allItems.unshift({
    label: "New Item",
    value: "",
  });

  return (
    <CreateListForm
      formattedDate={formattedDate}
      allItems={allItems}
      templates={globalItems}
    />
  );
}
