"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AREAS = [
  { value: "area03", label: "北陸・信越", disabled: false },
  { value: "area01", label: "北海道（準備中）", disabled: true },
  { value: "area02", label: "東北（準備中）", disabled: true },
  { value: "area04", label: "関東（準備中）", disabled: true },
  { value: "area05", label: "東海（準備中）", disabled: true },
  { value: "area06", label: "関西（準備中）", disabled: true },
];

const AREA_ITEMS = AREAS.map(({ value, label }) => ({ value, label }));

export function AreaSelector() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <label htmlFor="area-selector">エリア</label>
      <Select items={AREA_ITEMS} defaultValue="area03">
        <SelectTrigger id="area-selector" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {AREAS.map((area) => (
            <SelectItem key={area.value} value={area.value} disabled={area.disabled}>
              {area.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
