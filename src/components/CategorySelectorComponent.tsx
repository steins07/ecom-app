'use client'
import { useState } from "react";
import { Category } from "../../sanity.types"
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";

interface ICategorySelectorComponentProps {
    categories: Category[]
}
export function CategorySelectorComponent({
    categories,
  }: ICategorySelectorComponentProps) {
    const [open, Setopen] = useState(false);
    const [value, setValue] = useState<string>("");
    const router = useRouter();
  return(
    <Popover open={open} onOpenChange={Setopen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
  
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search Category..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  Setopen(false);
                }
              }
            }}
          />
  
          <CommandList>
            <CommandEmpty>No Category Found</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                    Setopen(false);
                  }}
                >
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category._id ? "opacity:100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
  }