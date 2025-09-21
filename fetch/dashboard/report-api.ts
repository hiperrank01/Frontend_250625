export const fetchChartData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/combination-chart/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error("차트 데이터 조회 실패");
  return res.json();
};

export const fetchComparisonGridData = async (
  data: { customer_id: string; year: string; month: string }, // Added customer_id
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/comparison-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error("비교 그리드 데이터 조회 실패");
  return res.json();
};

export const fetchHistoryGridData = async (
  data: { customer_id: string; year: string; month: string }, // Added customer_id
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/history-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error("히스토리 그리드 데이터 조회 실패");
  return res.json();
};

export const fetchMonthlyReportSummaryData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/monthly-report-summary/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error("월간 리포트 요약 데이터 조회 실패");
  return res.text();
};

export const fetchSummaryGridData = async (
  data: { customer_id: string; year: string; month: string }, // Added customer_id
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/summary-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) throw new Error("요약 그리드 데이터 조회 실패");
  return res.json();
};

export const fetchAvailableYears = async (accessToken: string) => {
  console.log("Fetching available years with token:", accessToken);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ["2025"];
};
