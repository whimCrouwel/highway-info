"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { regions } from "./regions";

const REGION_ITEMS = regions.map(({ id, name }) => ({ value: id, label: name }));

export function AreaSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (regionId: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <label htmlFor="area-selector">エリア</label>
      <Select items={REGION_ITEMS} value={value} onValueChange={(next) => next && onChange(next)}>
        <SelectTrigger id="area-selector" className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.id} value={region.id}>
              {region.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
