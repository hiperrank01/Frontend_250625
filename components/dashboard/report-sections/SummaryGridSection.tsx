"use client";

import React from "react";

interface SummaryRow {
  media_type: string;
  total_clk_cnt: number;
  total_imp_cnt: number;
  total_cost: number;
  total_ccnt: number;
  total_conv_amt: number;
  avg_cpc: number;
  avg_ror: number;
}

interface SummaryData {
  rows: SummaryRow[];
}

interface SummaryGridSectionProps {
  data: SummaryData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const SummaryGridSection = ({
  data,
  isLoading,
  error,
}: SummaryGridSectionProps) => {
  if (isLoading) {
    return (
      <p className="text-center mt-8">매체별 요약 데이터를 불러오는 중...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-8">
        매체별 요약 데이터 에러: {error.message}
      </p>
    );
  }

  if (!data || !data.rows) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-6 text-foreground flex items-center gap-3">
        <div className="w-1 h-6 modern-gradient rounded-full"></div>
        매체별 광고요약
      </h3>
      <div className="bg-muted/30 rounded-2xl overflow-hidden border border-border/50 shadow-card">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-muted/50 to-muted/30">
            <tr>
              <th className="px-6 py-4 text-left text-foreground font-bold">
                매체
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                클릭
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                노출
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                비용
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                전환
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                전환매출
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                평균CPC
              </th>
              <th className="px-6 py-4 text-right text-foreground font-bold">
                평균ROAS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: SummaryRow, index: number) => (
              <tr
                key={index}
                className="border-t border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-6 py-4 text-foreground font-medium">
                  {row.media_type}
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
                  {row.total_ccnt}
                </td>
                <td className="px-6 py-4 text-right text-chart-4 font-bold">
                  {row.total_conv_amt?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-right text-foreground">
                  {row.avg_cpc}
                </td>
                <td className="px-6 py-4 text-right text-chart-2 font-bold">
                  {row.avg_ror}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};