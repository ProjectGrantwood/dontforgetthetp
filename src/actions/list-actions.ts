"use server";

import { z } from "zod";
import { ShoppingListData, ShoppingListJoinNewItemData } from "@/types/dto";
import { createItemsService } from "@/services/list-item-service";
import { createListService } from "@/services/list-service";
import { addOrUpdateUserListRoleService } from "@/services/list-user-service";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack/server";

const ListItemSchema = z.object({
  list_id: z.string(),
  list_item_id: z.string(),
  item_name: z.string().min(1),
  default_units: z.string().min(1),
  item_notes: z.string().optional(),
  amount: z.preprocess((v) => Number(v), z.number().positive().min(1)),
});

const ListItemSchemaWithOmissions = ListItemSchema.omit({ list_id: true });

const CreateListFormSchema = z.object({
  list_id: z.string(),
  list_name: z.string(),
  list_notes: z.string().optional(),
  is_public: z.boolean(),
  is_pinned: z.boolean(),
  items: z.array(ListItemSchemaWithOmissions).min(1),
});

const CreateListWithOmissions = CreateListFormSchema.omit({ list_id: true });

export async function createListAction(formData: FormData) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("not authenticated");
  }

  const validatedFields = CreateListWithOmissions.safeParse({
    list_name: formData.get("list-title"),
    list_notes: formData.get("list-notes"),
    is_public: formData.get("is-public") === "on",
    is_pinned: formData.get("is-pinned") === "on",
    items: JSON.parse((formData.get("items") as string) ?? "[]"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields);
    throw new Error("An error occurred when validating your list.");
  }

  const list = {
    list_id: crypto.randomUUID(),
    list_name: validatedFields.data.list_name,
    list_notes: validatedFields.data.list_notes,
    item_count: validatedFields.data.items.length,
    is_public: validatedFields.data.is_public,
  } as ShoppingListData;

  try {
    await createListService(list);
    const listItems = validatedFields.data
      .items as ShoppingListJoinNewItemData[];
    try {
      await createItemsService(listItems, list.list_id);
      await addOrUpdateUserListRoleService(
        user.id,
        list.list_id,
        "owner",
        validatedFields.data.is_pinned,
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/home");
  revalidatePath("/home/lists");
  redirect("/home/lists");
}
