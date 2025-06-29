"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  FileText,
  BarChart3,
  Target,
  Users,
  ImageIcon,
  MessageSquare,
  Star,
  Download,
  Play,
} from "lucide-react"

export default function NineWinitApp() {
  const [activeTab, setActiveTab] = useState("seo-analysis")
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiry: "",
  })
  const [showMembership, setShowMembership] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 구글 시트 연동 로직 (실제 구현 시 Google Apps Script 사용)
    console.log("Form submitted:", formData)
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.")
    setFormData({ company: "", name: "", phone: "", email: "", inquiry: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const services = [
    {
      id: "seo-analysis",
      title: "네이버 쇼핑검색 상품/키워드 분석",
      icon: <Search className="w-6 h-6" />,
      description: "스마트스토어 URL 분석으로 상품명, 순위, 판매가, 리뷰, 평점 등 종합 SEO 정보 제공",
    },
    {
      id: "competitor",
      title: "자사 경쟁사 분석",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "경쟁사 대비 우위 요소 분석 및 상품 개선 방안 도출",
    },
    {
      id: "report-auto",
      title: "보고서 자동화",
      icon: <FileText className="w-6 h-6" />,
      description: "캠페인별 노출수, 클릭수, 광고비, 매출액, ROAS 자동 리포팅",
    },
    {
      id: "media-report",
      title: "매체별 보고서",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "네이버, 구글, 메타, 틱톡, 카카오 등 매체별 광고 효율 비교 분석",
    },
    {
      id: "auto-bid",
      title: "자동입찰",
      icon: <Target className="w-6 h-6" />,
      description: "목표 순위 기반 키워드 자동입찰 시스템",
    },
    {
      id: "ga-analysis",
      title: "GA 활용 고객 행동 분석",
      icon: <Users className="w-6 h-6" />,
      description: "루커스튜디오 연동 CRM, 코호트, AARRR 퍼널 분석",
    },
    {
      id: "creative",
      title: "이미지/영상 제작",
      icon: <ImageIcon className="w-6 h-6" />,
      description: "10년 이상 경력 전문가의 디자인 기획 제작 서비스",
    },
  ]

  const membershipPlans = [
    { period: "1개월", price: 7900, popular: false },
    { period: "3개월", price: 19800, popular: true },
    { period: "1년", price: 80000, popular: false },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white text-black px-3 py-1 rounded font-bold text-xl">9W</div>
            <span className="text-xl font-bold">나인위닛</span>
          </div>
          <nav className="flex space-x-6">
            <button className="hover:text-gray-300 transition-colors">서비스 소개</button>
            <button onClick={() => setShowMembership(true)} className="hover:text-gray-300 transition-colors">
              PRO가입
            </button>
            <button
              onClick={() => setActiveTab("inquiry")}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              무료 대행 신청하기
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">스마트스토어 SEO 최적화 솔루션</h1>
          <p className="text-xl text-gray-600">데이터 기반 분석으로 매출 성장을 이끌어내는 전문 서비스</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            {services.map((service) => (
              <TabsTrigger key={service.id} value={service.id} className="text-xs">
                {service.icon}
              </TabsTrigger>
            ))}
            <TabsTrigger value="inquiry" className="text-xs">
              <MessageSquare className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {service.icon}
                    <span>{service.title}</span>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {service.id === "seo-analysis" && (
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input placeholder="스마트스토어 URL을 입력하세요" className="flex-1" />
                        <Input placeholder="키워드 입력" className="w-48" />
                        <Button>
                          <Search className="w-4 h-4 mr-2" />
                          분석 시작
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">현재 순위</span>
                              <Badge variant="secondary">3위</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">예상 매출</span>
                              <span className="font-bold">₩2,450,000</span>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">SEO 점수</span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                <span className="font-bold">8.5/10</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <Button className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        상세 분석 보고서 다운로드
                      </Button>
                    </div>
                  )}
                  {service.id !== "seo-analysis" && (
                    <div className="text-center py-12">
                      <div className="mb-4">{service.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Button onClick={() => setShowMembership(true)}>PRO 기능 이용하기</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="inquiry">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6" />
                  <span>광고 문의하기</span>
                </CardTitle>
                <CardDescription>전문가와 상담하고 맞춤형 솔루션을 받아보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">업체명</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="업체명을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">담당자명</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="담당자명을 입력하세요"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">전화번호</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">이메일</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">문의내용</label>
                    <Textarea
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      placeholder="문의하실 내용을 자세히 입력해주세요"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    문의하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Membership Modal */}
      {showMembership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>PRO 멤버십 가입</CardTitle>
              <CardDescription>전문 기능을 이용하고 더 정확한 분석을 받아보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {membershipPlans.map((plan) => (
                  <Card key={plan.period} className={`relative ${plan.popular ? "ring-2 ring-blue-500" : ""}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">인기</Badge>
                    )}
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-lg mb-2">{plan.period}</h3>
                      <p className="text-2xl font-bold mb-4">₩{plan.price.toLocaleString()}</p>
                      <Button className="w-full">선택하기</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowMembership(false)}>
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xl">9W</div>
                <span className="text-xl font-bold">나인위닛</span>
              </div>
              <p className="text-gray-400">스마트스토어 SEO 최적화 전문 서비스</p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>주소: 구미시 공단동264-8 금오빌딩506-2호</p>
              <p>전화: 010-4590-4917</p>
              <p>이메일: 9winit@gmail.com</p>
              <p>사업자번호: 649-02-03465</p>
              <p>대표: 배대근</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 나인위닛. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
