"use client";

import { Label } from '../../../../components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/select';
import { Input } from '../../../../components/ui/input';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Button } from '../../../../components/ui/button';

interface FilterControlsProps {
  filterMode: 'location' | 'radius';
  setFilterMode: (mode: 'location' | 'radius') => void;
  filterLocation: string;
  setFilterLocation: (location: string) => void;
  radius: number;
  setRadius: (radius: number) => void;
  coordinates: { lat: number, lng: number } | null;
  showMyResults: boolean;
  setShowMyResults: (show: boolean) => void;
  handleFilterChange: () => void;
  isFetchingPastResults: boolean;
}

export default function FilterControls({
  filterMode,
  setFilterMode,
  filterLocation,
  setFilterLocation,
  radius,
  setRadius,
  coordinates,
  showMyResults,
  setShowMyResults,
  handleFilterChange,
  isFetchingPastResults,
}: FilterControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div className="flex items-center gap-2">
        <Label className="font-semibold">Filter by:</Label>
        <Select
          value={filterMode}
          onValueChange={(v: 'location' | 'radius') => setFilterMode(v)}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="location">Name</SelectItem>
            <SelectItem value="radius">Radius</SelectItem>
          </SelectContent>
        </Select>

        {filterMode === 'location' ? (
          <Input
            placeholder="e.g., Brazil"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="w-48"
          />
        ) : (
          <Select
            value={String(radius)}
            onValueChange={(v) => setRadius(Number(v))}
            disabled={!coordinates}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 km</SelectItem>
              <SelectItem value="25">25 km</SelectItem>
              <SelectItem value="100">100 km</SelectItem>
              <SelectItem value="500">500 km</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <label className="inline-flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={showMyResults}
          onCheckedChange={(checked) => setShowMyResults(Boolean(checked))}
        />
        <span className="text-foreground">My Results</span>
      </label>

      <Button
        onClick={handleFilterChange}
        disabled={isFetchingPastResults || (filterMode === 'radius' && !coordinates)}
      >
        {isFetchingPastResults ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
}