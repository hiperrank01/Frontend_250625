"use client";

import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAvailableYearsQuery } from "@/hooks/dashboard/report/report";

const MONTHS = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

interface ReportFiltersProps {
  year: string | undefined;
  setYear: (year: string | undefined) => void;
  month: string;
  setMonth: (month: string) => void;
}

export const ReportFilters = ({
  year,
  setYear,
  month,
  setMonth,
}: ReportFiltersProps) => {
  const {
    data: availableYears,
    isLoading: isLoadingYears,
    error: errorYears,
  } = useAvailableYearsQuery();

  useEffect(() => {
    if (availableYears && availableYears.length > 0 && !year) {
      setYear(availableYears[availableYears.length - 1]);
    } else if (availableYears && availableYears.length === 0) {
      setYear(undefined);
    }
  }, [availableYears, year, setYear]);

  if (errorYears) {
    return (
      <div className="flex flex-wrap gap-4 mt-8">
        <p className="text-center text-red-500">
          데이터를 불러오는 중 에러가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="year-select" className="text-sm font-medium">
          년도
        </label>
        {isLoadingYears ? (
          <Skeleton className="h-10 w-[120px]" />
        ) : (
          <Select
            value={year}
            onValueChange={setYear}
            disabled={!availableYears || availableYears.length === 0}
          >
            <SelectTrigger id="year-select" className="w-[120px]">
              <SelectValue placeholder="년도 선택" />
            </SelectTrigger>
            <SelectContent>
              {availableYears?.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="month-select" className="text-sm font-medium">
          월
        </label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger id="month-select" className="w-[100px]">
            <SelectValue placeholder="월 선택" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}월
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};