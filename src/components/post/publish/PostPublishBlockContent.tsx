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
import { PublishOption, usePostStore } from "@/lib/store/post";

export const PostPublishBlockContent = () => {
  const {
    publishOptions: { option },
    setPublishOption,
  } = usePostStore();
  return (
    <form>
      <RadioGroup
        value={option}
        onValueChange={(val) => setPublishOption(val as PublishOption)}
        className="space-y-4"
        defaultValue={PublishOption.MainCollection}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PublishOption.MainCollection} id="r1" />
          <Label
            className="font-normal"
            htmlFor="r1"
          >{`Publish to Main Collection (Default)`}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PublishOption.CustomCollection} id="r3" />
          <div className="flex flex-row items-center gap-4">
            <Label className="font-normal" htmlFor="r3">
              Custom
            </Label>
            <Select disabled={option !== PublishOption.CustomCollection}>
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
