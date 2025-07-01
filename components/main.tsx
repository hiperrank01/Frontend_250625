import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Search, MessageSquare, Star, Download, Play } from "lucide-react";
import { services } from "@/data/service-data";
import { ProModal } from "@/components/modal/pro-modal";
import { useSearchParams } from "next/navigation";
import { TabNav } from "@/components/tab/tab-nav";

export const Main = () => {
  const [showMembership, setShowMembership] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "seo-analysis";
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiry: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 구글 시트 연동 로직 (실제 구현 시 Google Apps Script 사용)
    console.log("Form submitted:", formData);
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    setFormData({ company: "", name: "", phone: "", email: "", inquiry: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          스마트스토어 SEO 최적화 솔루션
        </h1>
        <p className="text-xl text-gray-600">
          데이터 기반 분석으로 매출 성장을 이끌어내는 전문 서비스
        </p>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabNav />

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
                      <Input
                        placeholder="스마트스토어 URL을 입력하세요"
                        className="flex-1"
                      />
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
                            <span className="text-sm text-gray-600">
                              현재 순위
                            </span>
                            <Badge variant="secondary">3위</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              예상 매출
                            </span>
                            <span className="font-bold">₩2,450,000</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              SEO 점수
                            </span>
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
                    <h3 className="text-lg font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button onClick={() => setShowMembership(true)}>
                      PRO 기능 이용하기
                    </Button>
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
              <CardDescription>
                전문가와 상담하고 맞춤형 솔루션을 받아보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      업체명
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="업체명을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      담당자명
                    </label>
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
                    <label className="block text-sm font-medium mb-2">
                      전화번호
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      이메일
                    </label>
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
                  <label className="block text-sm font-medium mb-2">
                    문의내용
                  </label>
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
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
    </main>
  );
};
