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
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "sonner";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfOp_wsPhMQzhRKI78n4Cgv8qWLFWGif5GFi2_T1Ee-1D0TiQ/formResponse";

const ENTRY_IDS = {
  companyName: "entry.598802616",
  contactName: "entry.1818155700",
  phone: "entry.22081931",
  email: "entry.1045165788",
  inquiryContent: "entry.1395533608",
};

export const InquirySection = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    inquiryContent: "",
    phone: "",
    email: "",
  });
  const [isPending, setIsPending] = useState(false);

  const validateForm = () => {
    if (
      !formData.companyName ||
      !formData.contactName ||
      !formData.phone ||
      !formData.email ||
      !formData.inquiryContent
    ) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return false;
    }

    const phoneRegex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)");
      return false;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("유효한 이메일 형식을 입력해주세요. (예: example@email.com)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsPending(true);

    const formPayload = new FormData();
    formPayload.append(ENTRY_IDS.companyName, formData.companyName);
    formPayload.append(ENTRY_IDS.contactName, formData.contactName);
    formPayload.append(ENTRY_IDS.phone, formData.phone);
    formPayload.append(ENTRY_IDS.email, formData.email);
    formPayload.append(ENTRY_IDS.inquiryContent, formData.inquiryContent);

    try {
      const response = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formPayload,
        mode: "no-cors",
      });

      if (response.ok || response.type === "opaque") {
        toast.success("문의가 성공적으로 접수되었습니다.");
        setFormData({
          companyName: "",
          contactName: "",
          inquiryContent: "",
          phone: "",
          email: "",
        });
      } else {
        toast.error("문의 접수에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("문의 접수 중 오류가 발생했습니다: " + error.message);
    } finally {
      setIsPending(false);
    }
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
                <label className="block text-sm font-medium mb-2">업체명</label>
                <Input
                  name="companyName"
                  value={formData.companyName}
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
                  name="contactName"
                  value={formData.contactName}
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
                name="inquiryContent"
                value={formData.inquiryContent}
                onChange={handleInputChange}
                placeholder="문의하실 내용을 자세히 입력해주세요"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
                  전송 중...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  문의하기
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
