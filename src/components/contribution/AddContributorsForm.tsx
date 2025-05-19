"use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectProfession } from "../forms/SelectProfession";
import { Account, Profession } from "@/lib/pinkcollar/auth";
import { useCallback, useState } from "react";
import { getProfession } from "@/constants/professions";
import { ContributorPreview } from "./ContributortPreview";
import { SelectContributor } from "./SelectContributor";
import { Divider } from "../ui/divider";
import { usePostStore } from "@/lib/store/post";

export const AddContributorsForm = ({
  editMode = false,
}: {
  editMode?: boolean;
}) => {
  const { contributors, addContributor, removeContributor } = usePostStore();

  const [profession, setProfession] = useState<Profession>();
  const [contributor, setContributor] = useState<Account>();

  const canAdd = Boolean(profession && contributor);

  const addContributorHandler = useCallback(() => {
    if (profession && contributor) {
      addContributor({ contributor, role: profession });
      setContributor(undefined);
      setProfession(undefined);
    }
  }, [profession, contributor, addContributor]);

  return (
    <div className="flex flex-col gap-4">
      {editMode && (
        <form className="flex flex-col gap-4">
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
              <Label>Assign Role</Label>
              <div className="flex flex-row gap-2">
                <div className="w-full">
                  <SelectProfession
                    value={profession?.id}
                    onValueChange={(id) =>
                      id && setProfession(getProfession(id))
                    }
                    disabled={!contributor}
                    required
                  />
                </div>
                <Button
                  variant="default"
                  className="max-w-24 flex-1"
                  disabled={!canAdd}
                  onClick={addContributorHandler}
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
