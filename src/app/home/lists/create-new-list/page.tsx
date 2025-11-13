import { formatDate } from "@/utils/timeDateUtils";
import { stackServerApp } from "@/stack/server";
import { ItemTemplate } from "@/types/entities";
import { ComboboxOption } from "@/components/global-components/combobox";
import CreateListForm from "@/components/list-components/create-list-form";
import { cache } from "react";
import {
  getAllGlobalItems,
  getAllUserItemTemplates,
} from "@/actions/itemtemplate_actions";

const cachedGetAllGlobalItems = cache(getAllGlobalItems);
const cachedGetAllUserItems = cache(getAllUserItemTemplates);

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const formattedDate = formatDate(new Date());

  const globalItems = await cachedGetAllGlobalItems();
  const userItems = await cachedGetAllUserItems(user.id);

  const templates: ItemTemplate[] = globalItems.concat(userItems);
  console.log(templates);
  const allItems: ComboboxOption[] = templates.map((item) => ({
    label: item.item_name,
    value: item.item_template_id,
  }));

  return (
    <CreateListForm
      formattedDate={formattedDate}
      allItems={allItems}
      templates={templates}
    />
  );
}
