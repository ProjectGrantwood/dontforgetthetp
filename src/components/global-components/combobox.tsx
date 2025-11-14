"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcnui-components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcnui-components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcnui-components/popover";

export type ComboboxOption = {
  value: string;
  label: string;
};

export function Combobox({
  options,
  placeholder,
  emptyText,
  onSelectAction,
  selectedValue,
}: {
  options: ComboboxOption[];
  placeholder: string;
  emptyText: string;
  onSelectAction: (value: string) => void;
  selectedValue: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.label === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={function () {
                    onSelectAction(option.value);
                    setValue(option.label);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
