import React from "react";

interface RowData {
  total_clk_cnt?: number;
  total_imp_cnt?: number;
  total_cost?: number;
  total_ccnt?: number;
  total_conv_amt?: number;
  avg_cpc?: number;
  avg_ror?: number;
  type: string;
}

interface ComparisonGridSection {
  data: {
    rows: RowData[];
  };
  isLoading: boolean;
  error: Error | null;
}

const ComparisonGridSection: React.FC<ComparisonGridSection> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) return <div className="text-center py-8">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">에러: {error.message}</div>
    );
  if (!data?.rows) return null;

  return (
    <>
      <h3 className="text-xl font-bold mb-6 text-foreground flex items-center gap-3 mt-4">
        <div className="w-1 h-6 modern-gradient rounded-full"></div>
        전달대비 광고 요약
      </h3>
      <div className="overflow-x-auto rounded-xl border border-border/30 bg-card mt-4">
        <table className="min-w-full divide-y divide-border/30 text-sm">
          <thead className="bg-muted/20">
            <tr>
              <th className="px-6 py-3 text-left text-foreground font-semibold">
                구분
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                클릭수
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                노출수
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                비용
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                전환수
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                전환금액
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                평균CPC
              </th>
              <th className="px-6 py-3 text-right text-foreground font-semibold">
                ROAS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-border/30 hover:bg-muted/20 transition-colors ${
                  row.type === "증감" ? "bg-muted/40 font-bold" : ""
                }`}
              >
                <td className="px-6 py-4 text-foreground font-medium">
                  {row.type}
                </td>
                <td className="px-6 py-4 text-right text-chart-1 font-bold">
                  {row.total_clk_cnt?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-foreground">
                  {row.total_imp_cnt?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-foreground">
                  {row.total_cost?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-foreground">
                  {row.total_ccnt?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-chart-4 font-bold">
                  {row.total_conv_amt?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-foreground">
                  {row.avg_cpc?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-chart-2 font-bold">
                  {row.avg_ror?.toLocaleString() ?? "0"}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ComparisonGridSection;
