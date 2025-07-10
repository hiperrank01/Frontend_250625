import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Play } from "lucide-react";

export const InquirySection = () => {
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
  );
};
