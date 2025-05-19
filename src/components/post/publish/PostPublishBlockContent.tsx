"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const PostPublishBlockContent = () => {
  const [selected, setSelected] = useState("default");
  return (
    <form>
      <RadioGroup
        value={selected}
        onValueChange={(val) => setSelected(val)}
        className="space-y-4"
        defaultValue="comfortable"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label
            className="font-normal"
            htmlFor="r1"
          >{`Publish to "Created" (Default)`}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="main-collection" id="r2" />
          <Label className="font-normal" htmlFor="r2">
            Add to Main Collection
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom-collection" id="r3" />
          <div className="flex flex-row items-center gap-4">
            <Label className="font-normal" htmlFor="r3">
              Custom
            </Label>
            <Select disabled={selected !== "custom-collection"}>
              <SelectTrigger className=" border border-black rounded-lg">
                <SelectValue placeholder="Add to Custom Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion-designer">FW2020</SelectItem>
                <SelectItem value="pattern-maker">Summer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </RadioGroup>

      <Button>Publish</Button>
    </form>
  );
};
