import {
  FileText,
  Search,
  TrendingUp,
  BarChart3,
  Target,
  Users,
  ImageIcon,
} from "lucide-react";
import { SERVICE_TYPE } from "@/utils/types/service-data";
export const services: SERVICE_TYPE = [
  {
    id: "seo-analysis",
    title: "쇼핑검색 상품/키워드 분석",
    icon: <Search className="w-6 h-6" />,
    description:
      "스마트스토어 URL 분석으로 상품명, 순위, 판매가, 리뷰, 평점 등 종합 SEO 정보 제공",
  },
  {
    id: "competitor",
    title: "자사 경쟁사 분석",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "경쟁사 대비 우위 요소 분석 및 상품 개선 방안 도출",
  },
  // {
  //   id: "report-auto",
  //   title: "보고서 자동화",
  //   icon: <FileText className="w-6 h-6" />,
  //   description: "캠페인별 노출수, 클릭수, 광고비, 매출액, ROAS 자동 리포팅",
  // },
  {
    id: "media-report",
    title: "매체별 보고서",
    icon: <BarChart3 className="w-6 h-6" />,
    description:
      "네이버, 구글, 메타, 틱톡, 카카오 등 매체별 광고 효율 비교 분석",
  },
  // {
  //   id: "auto-bid",
  //   title: "자동입찰",
  //   icon: <Target className="w-6 h-6" />,
  //   description: "목표 순위 기반 키워드 자동입찰 시스템",
  // },
  {
    id: "ga-analysis",
    title: "GA 활용 고객 행동 분석",
    icon: <Users className="w-6 h-6" />,
    description: "루커스튜디오 연동 CRM, 코호트, AARRR 퍼널 분석",
    text: [
      {
        content: "1. 구글애즈 ➡️  리마케팅 | 구글 태그매니저 | 검색어 리포트",
      },
      { content: "2. GA4 세팅 및 전환분석-전환 추적-utm 설치-태그 어시스턴트" },
      {
        content:
          "3.CRM 마케팅 ➡️ 내부데이터 활용한 코호트, RFM, AARRR 퍼널 분석",
      },
    ],
  },
  {
    id: "creative",
    title: "이미지/영상 제작",
    icon: <ImageIcon className="w-6 h-6" />,
    description: "10년 이상 경력 전문가의 디자인 기획 제작 서비스",
  },
];
