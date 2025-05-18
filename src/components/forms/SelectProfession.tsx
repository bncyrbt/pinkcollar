import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

export function SelectProfession(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px] border border-black rounded-lg">
        <SelectValue placeholder="Select one or more" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fashion</SelectLabel>
          <SelectItem value="fashion-designer">Fashion Designer</SelectItem>
          <SelectItem value="pattern-maker">Pattern Maker</SelectItem>
          <SelectItem value="sawer">Sawer</SelectItem>
          <SelectItem value="textile-designer">Textile Designer</SelectItem>
          <SelectItem value="fashion-student">Fashion Student</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Digital Arts</SelectLabel>
          <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
          <SelectItem value="3d-artist">3D Artist</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Business</SelectLabel>
          <SelectItem value="fashion-boutique">Fashion Boutique</SelectItem>
          <SelectItem value="brand-owner">Brand Owner</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
