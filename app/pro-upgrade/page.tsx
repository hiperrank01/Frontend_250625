"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Shield, Star } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export default function ProSignupPage() {
  const [selectedPlan, setSelectedPlan] = useState("3month");
  const [step, setStep] = useState(1);

  const plans = [
    {
      id: "1month",
      duration: "1개월",
      price: "₩7,900",
      popular: false,
    },
    {
      id: "3month",
      duration: "3개월",
      price: "₩19,800",
      popular: true,
    },
    {
      id: "1year",
      duration: "1년",
      price: "₩80,000",
      popular: false,
    },
  ];

  const features = [
    "고급 분석 도구 이용",
    "무제한 프로젝트 생성",
    "우선 고객 지원",
    "고급 템플릿 액세스",
    "팀 협업 기능",
    "데이터 내보내기",
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep(2);
  };

  if (step === 1) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                PRO 멤버십 가입
              </h1>
              <p className="text-xl text-gray-600">
                전문 기능을 이용하고 더 정확한 분석을 받아보세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      인기
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">
                      {plan.duration}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-6">
                      {plan.price}
                    </div>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      선택하기
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  PRO 멤버십 혜택
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              계정 정보 입력
            </h1>
            <p className="text-gray-600">
              선택한 요금제:{" "}
              <span className="font-semibold">
                {plans.find((p) => p.id === selectedPlan)?.duration} -{" "}
                {plans.find((p) => p.id === selectedPlan)?.price}
              </span>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>가입 정보</CardTitle>
              <CardDescription>
                PRO 멤버십 가입을 위한 정보를 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">이름</Label>
                  <Input id="firstName" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">성</Label>
                  <Input id="lastName" placeholder="홍" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8자 이상 입력해주세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input id="phone" placeholder="010-1234-5678" />
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded" />
                <Label htmlFor="terms" className="text-sm">
                  <span>이용약관</span> 및 <span>개인정보처리방침</span>에
                  동의합니다
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="marketing" className="rounded" />
                <Label htmlFor="marketing" className="text-sm">
                  마케팅 정보 수신에 동의합니다 (선택)
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep(1)}
                >
                  이전
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep(3)}
                >
                  다음
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">결제 정보</h1>
          <p className="text-gray-600">
            안전한 결제를 위한 정보를 입력해주세요
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              주문 요약
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-2">
              <span>
                PRO 멤버십 ({plans.find((p) => p.id === selectedPlan)?.duration}
                )
              </span>
              <span className="font-semibold">
                {plans.find((p) => p.id === selectedPlan)?.price}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>총 결제 금액</span>
              <span className="text-blue-600">
                {plans.find((p) => p.id === selectedPlan)?.price}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              결제 방법
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup defaultValue="card" className="space-y-4">
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  신용카드/체크카드
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="cursor-pointer">
                  계좌이체
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone" className="cursor-pointer">
                  휴대폰 결제
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">카드번호</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">만료일</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardHolder">카드 소유자명</Label>
                <Input id="cardHolder" placeholder="홍길동" />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-semibold">안전한 결제</span>
              </div>
              <p className="text-sm text-blue-600">
                모든 결제 정보는 SSL 암호화로 보호되며, 카드 정보는 저장되지
                않습니다.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setStep(2)}
              >
                이전
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                결제하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
