"use client";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PublishOption } from "@/lib/store/post";

export const PostPublishBlockContent = () => {
  return (
    <form className="flex flex-col gap-4">
      <RadioGroup className="" defaultValue={PublishOption.MainCollection}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PublishOption.MainCollection} id="r1" />
          <Label
            className="font-normal"
            htmlFor="r1"
          >{`Publish to "Created" only (Default)`}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PublishOption.CustomCollection} id="r3" />

          <div className="flex flex-row items-center gap-4">
            <Label className="font-normal" htmlFor="r3">
              also Curate
            </Label>
            <Select>
              <SelectTrigger className="flex-1 w-1/2 border border-black rounded-lg">
                <SelectValue placeholder="Add to Custom Collection" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="standalone">{`Standalone (No Collection)`}</SelectItem>
                <SelectGroup>
                  <SelectLabel>Collections</SelectLabel>
                  <SelectItem value="ffw2020">FW2020</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </RadioGroup>
      <Divider />
      <Button>Publish</Button>
    </form>
  );
};
