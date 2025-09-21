"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoryRow {
  period: string;
  total_clk_cnt: number;
  total_imp_cnt: number;
  total_cost: number;
  total_ccnt: number;
  total_conv_amt: number;
  avg_cpc: number;
  avg_ror: number;
}

interface HistoryData {
  rows: HistoryRow[];
}

interface HistoryGridSectionProps {
  data: HistoryData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const HistoryGridSection = ({
  data,
  isLoading,
  error,
}: HistoryGridSectionProps) => {
  if (isLoading) {
    return (
      <p className="text-center mt-8">
        히스토리 그리드 데이터를 불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-8">
        히스토리 그리드 데이터 에러: {error.message}
      </p>
    );
  }

  if (!data || !data.rows || data.rows.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="shadow-modern border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-1 h-6 modern-gradient rounded-full"></div>
            2025년 광고 요약
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-2xl overflow-hidden border border-border/50 shadow-card">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-muted/50 to-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-foreground font-bold">
                    기간
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
                {data.rows.map((row: HistoryRow, index: number) => (
                  <tr
                    key={index}
                    className={`border-t border-border/30 hover:bg-muted/20 transition-colors ${
                      row.period === "TOTAL"
                        ? "bg-gradient-to-r from-chart-1/10 to-chart-2/10 font-bold"
                        : ""
                    }`}
                  >
                    <td
                      className={`px-6 py-4 ${
                        row.period === "TOTAL"
                          ? "text-chart-1 font-bold"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {row.period}
                    </td>
                    <td className="px-6 py-4 text-right text-foreground">
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
        </CardContent>
      </Card>
    </>
  );
};