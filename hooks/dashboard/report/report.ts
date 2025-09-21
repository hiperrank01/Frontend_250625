import { useQuery } from "@tanstack/react-query";
import {
  fetchChartData,
  fetchAvailableYears,
  fetchSummaryGridData,
  fetchComparisonGridData,
  fetchHistoryGridData,
  fetchMonthlyReportSummaryData,
} from "@/fetch/dashboard/report-api";

export const useReportQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<any, Error>({
    queryKey: ["chartData", customer_id, year, month],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchChartData({ customer_id, year, month }, accessToken);
    },
    enabled: enabled,
  });
};

export const useAvailableYearsQuery = () => {
  return useQuery<string[], Error>({
    queryKey: ["availableYears"],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchAvailableYears(accessToken);
    },
  });
};

export const useSummaryGridDataQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<any, Error>({
    queryKey: ["summaryGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchSummaryGridData(
        { customer_id, year, month }, // Added customer_id
        accessToken
      );
    },
    enabled: enabled,
  });
};

export const useComparisonGridDataQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<any, Error>({
    queryKey: ["comparisonGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchComparisonGridData(
        { customer_id, year, month }, // Added customer_id
        accessToken
      );
    },
    enabled: enabled,
  });
};

export const useHistoryGridDataQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<any, Error>({
    queryKey: ["historyGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchHistoryGridData(
        { customer_id, year, month }, // Added customer_id
        accessToken
      );
    },
    enabled: enabled,
  });
};

export const useMonthlyReportSummaryDataQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<any, Error>({
    queryKey: ["monthlyReportSummaryData", customer_id, year, month],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      return fetchMonthlyReportSummaryData(
        { customer_id, year, month },
        accessToken
      );
    },
    enabled: enabled,
  });
};
