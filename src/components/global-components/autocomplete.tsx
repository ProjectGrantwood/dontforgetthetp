"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

export type AutocompleteListItem = {
  key: string;
  label: string;
};

export function WrappedAutocomplete({
  items,
  className,
  placeholder,
}: {
  items: AutocompleteListItem[];
  className: string;
  placeholder?: string;
}) {
  return (
    <Autocomplete
      className={className}
      placeholder={placeholder}
      defaultItems={items}
    >
      {(item) => {
        return (
          <AutocompleteItem key={item.key} aria-label={item.label}>
            {item.label}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
