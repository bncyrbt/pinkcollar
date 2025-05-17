import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export type Profession = {
  id: string;
  groupId: string;
  label: string;
};

type Props = {
  options: Profession[];
  onSelected: (selected: Profession[]) => void;
};

export function ProfessionSelectCheckbox({ options, onSelected }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const grouped = options.reduce((acc, option) => {
    if (!acc[option.groupId]) acc[option.groupId] = [];
    acc[option.groupId].push(option);
    return acc;
  }, {} as Record<string, Profession[]>);

  const handleChange = (checked: boolean, profession: Profession) => {
    const newSet = new Set(selectedIds);
    checked ? newSet.add(profession.id) : newSet.delete(profession.id);
    setSelectedIds(newSet);
    onSelected(options.filter((opt) => newSet.has(opt.id)));
  };

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([groupId, professions]) => (
        <div key={groupId} className="space-y-2">
          <div className="text-sm font-semibold text-muted-foreground">
            {groupId}
          </div>
          <div className="space-y-1 pl-2">
            {professions.map((profession) => (
              <div key={profession.id} className="flex items-center space-x-2">
                <Checkbox
                  id={profession.id}
                  checked={selectedIds.has(profession.id)}
                  onCheckedChange={(checked) =>
                    handleChange(checked === true, profession)
                  }
                />
                <label htmlFor={profession.id} className="text-sm">
                  {profession.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
