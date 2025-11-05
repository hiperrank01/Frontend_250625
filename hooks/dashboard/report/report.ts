import { useQuery } from "@tanstack/react-query";
import {
  fetchChartData,
  fetchAvailableYears,
  fetchSummaryGridData,
  fetchComparisonGridData,
  fetchHistoryGridData,
  fetchMonthlyReportSummaryData,
  CustomerInfo,
  fetchSummeryComparisonData,
} from "@/fetch/dashboard/report-api";
import { SummaryData } from "@/components/dashboard/report-sections/SummaryGridSection";
import { ComparisonData } from "@/components/dashboard/report-sections/ComparisonGridSection";
import { ReportData } from "@/components/dashboard/report-sections/SummeryComparisonSection";
import { HistoryData } from "@/components/dashboard/report-sections/HistoryGridSection";

// 타입 정의
interface Customer {
  customerId: number;
  customerName: string;
  isActive: boolean;
}

interface ChartData {
  [key: string]: any;
}

interface GridData {
  [key: string]: any;
}

export const useReportQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<ChartData, Error>({
    queryKey: ["chartData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchChartData({ customer_id, year, month }, accessToken);
    },
    enabled: enabled,
  });
};

export const useAvailableYearsQuery = () => {
  return useQuery<string[], Error>({
    queryKey: ["availableYears"],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
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
  return useQuery<SummaryData, Error>({
    queryKey: ["summaryGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchSummaryGridData({ customer_id, year, month }, accessToken);
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
  return useQuery<ComparisonData, Error>({
    queryKey: ["comparisonGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchComparisonGridData({ customer_id, year, month }, accessToken);
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
  return useQuery<HistoryData, Error>({
    queryKey: ["historyGridData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchHistoryGridData({ customer_id, year, month }, accessToken);
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
  return useQuery<string, Error>({
    queryKey: ["monthlyReportSummaryData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchMonthlyReportSummaryData(
        { customer_id, year, month },
        accessToken
      );
    },
    enabled: enabled,
  });
};
export const useSummeryComparisonDataQuery = (
  customer_id: string,
  year: string,
  month: string,
  enabled: boolean
) => {
  return useQuery<ReportData, Error>({
    queryKey: ["summeryComparisonData", customer_id, year, month],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchSummeryComparisonData(
        { customer_id, year, month },
        accessToken
      );
    },
    enabled: enabled,
  });
};
export const useCustomerInfo = () => {
  return useQuery<Customer[], Error>({
    queryKey: ["customerInfo"],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return CustomerInfo(accessToken);
    },
  });
};
