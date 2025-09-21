"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

interface ChartDataRow {
  month: string;
  total_cost: number;
  total_conv_amt: number;
  avg_ror: number;
  impCnt?: number;
  clickCnt?: number;
  convCnt?: number;
}

interface ChartConfigItem {
  label: string;
  color: string;
}

interface ChartConfig {
  impCnt: ChartConfigItem;
  clickCnt: ChartConfigItem;
  convCnt: ChartConfigItem;
  total_cost: ChartConfigItem;
  total_conv_amt: ChartConfigItem;
  avg_ror: ChartConfigItem;
}

interface MonthlyReportChartProps {
  chartData: ChartDataRow[];
  chartConfig: ChartConfig;
}

export const MonthlyReportChart = ({
  chartData,
  chartConfig,
}: MonthlyReportChartProps) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>차트 데이터가 없습니다.</p>
      </div>
    );
  }

  const labels = chartData.map(
    (dataPoint) => dataPoint.month.substring(5) + "월"
  );

  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: chartConfig.total_cost.label,
        borderColor: chartConfig.total_cost.color,
        backgroundColor: chartConfig.total_cost.color,
        data: chartData.map((dataPoint) => dataPoint.total_cost),
        yAxisID: "y",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: chartConfig.total_cost.color,
        order: 1, // z인덱스
      },
      {
        type: "line" as const,
        label: chartConfig.total_conv_amt.label,
        borderColor: chartConfig.total_conv_amt.color,
        backgroundColor: chartConfig.total_conv_amt.color,
        data: chartData.map((dataPoint) => dataPoint.total_conv_amt),
        yAxisID: "y",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: chartConfig.total_conv_amt.color,
        order: 1,
      },
      {
        type: "bar" as const,
        label: chartConfig.avg_ror.label,
        backgroundColor: chartConfig.avg_ror.color,
        data: chartData.map((dataPoint) => dataPoint.avg_ror),
        yAxisID: "y1",
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "월간 리포트 조합 차트",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "금액",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "비율",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: string | number) {
            return `${value}%`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 광고 성과 추이</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Chart type="bar" options={options} data={data} />
      </CardContent>
    </Card>
  );
};