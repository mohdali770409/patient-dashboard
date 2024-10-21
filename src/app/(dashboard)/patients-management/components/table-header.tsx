import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpAZ,
  CandyOff,
  ChevronDown,
  CirclePlus,
  HeartPulse,
  Ribbon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
interface PatientsManagementTableHeaderProps {
  table: any;
  onFilterChange: any;
  globalFilter: any;
}
const PatientsManagementTableHeader: React.FC<
  PatientsManagementTableHeaderProps
> = ({ table, onFilterChange, globalFilter }) => {
  const [disease, setDisease] = useState<string>("");

  const handleDiseaseChange = (value: string) => {
    setDisease(value);
    if (value !== "all") onFilterChange(value);
    else onFilterChange("");
  };
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => onFilterChange(event.target.value)}
          className=" md:max-w-sm"
        />

        <div className="flex gap-2">
          <Select onValueChange={handleDiseaseChange} value={disease}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {" "}
                <ArrowUpAZ className="inline-block h-4 mr-2" />
                ALL
              </SelectItem>
              <SelectItem value="cancer">
                <Ribbon className="inline-block h-4 mr-2" />
                Cancer
              </SelectItem>
              <SelectItem value="cardiovascular">
                <HeartPulse className="inline-block h-4 mr-2" />
                Cardiovascular Disease
              </SelectItem>
              <SelectItem value="diabetes">
                <CandyOff className="inline-block h-4 mr-2"/>
                Diabetes
              </SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Link
              href={"/patients-management/add-and-edit-patient/0"}
              className="flex gap-1 items-center justify-center"
            >
              <CirclePlus className="h-4" />
              Add New Patient
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-5 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default PatientsManagementTableHeader;
