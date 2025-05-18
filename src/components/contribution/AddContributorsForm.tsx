import { SearchBar } from "../layout/SearchBar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectProfession } from "../auth/screens/SelectProfession";

export const AddContributorsForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="search">
          Add Contributors
        </Label>
        <SearchBar />
      </div>

      <div>
        <div className="space-y-2">
          <Label className="font-bold" htmlFor="search">
            Assign Role
          </Label>
          <div className="flex flex-row gap-2">
            <SelectProfession />
            <Button variant="default" className="flex-1">
              Add
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
