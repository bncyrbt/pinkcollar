"use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectProfession } from "../forms/SelectProfession";
import { Account, Profession } from "@/lib/pinkcollar/auth";
import { FormEventHandler, useState } from "react";
import { getProfession } from "@/constants/professions";
import { ContributorPreview } from "./ContributortPreview";
import { SelectContributor } from "./SelectContributor";
import { Divider } from "../ui/divider";

type PostContributor = {
  contributor: Account;
  role: Profession;
};

type AddContributorsFormProps = {
  onSubmit?: (selected: PostContributor[]) => void;
};
export const AddContributorsForm = ({ onSubmit }: AddContributorsFormProps) => {
  const [profession, setProfession] = useState<Profession>();
  const [contributor, setContributor] = useState<Account>();

  const [contributors, setContributors] = useState<PostContributor[]>([]);

  const [editMode, setEditMode] = useState(false);

  const canAdd = Boolean(profession && contributor);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.(contributors);
  };

  const addContributor = () => {
    if (profession && contributor) {
      setContributors((state) => [...state, { contributor, role: profession }]);
      setContributor(undefined);
      setProfession(undefined);
    }
  };
  const removeContributor = (id: string) => {
    setContributors((state) => state.filter((c) => c.contributor.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={editMode ? "outline" : "default"}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Done" : "Add Contributors"}
      </Button>
      {editMode && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Divider />
          <div className="flex flex-row gap-2 items-end">
            <div className="flex-3 space-y-2">
              <Label className="font-bold" htmlFor="search">
                Add Contributors
              </Label>
              <SelectContributor
                value={contributor}
                onSelect={setContributor}
              />
            </div>
            {contributor && (
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => setContributor(undefined)}
              >
                Clear
              </Button>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label className="font-bold" htmlFor="search">
                Assign Role
              </Label>
              <div className="flex flex-row gap-2">
                <SelectProfession
                  value={profession?.id}
                  onValueChange={(id) => id && setProfession(getProfession(id))}
                  disabled={!contributor}
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1"
                  disabled={!canAdd}
                  onClick={addContributor}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {!!contributors.length && <Divider />}
      <div className="flex flex-col gap-4">
        {contributors.map((c) => (
          <div
            key={`${c.contributor.id}-${c.role.id}`}
            className="flex flex-row justify-between"
          >
            <ContributorPreview
              accountId={c.contributor.id}
              professionId={c.role.id}
            />
            {editMode && (
              <Button
                variant="outline"
                onClick={removeContributor.bind(null, c.contributor.id)}
              >
                remove
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
