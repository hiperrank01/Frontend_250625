"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";

const CUSTOMER_IDS = ["1046868", "1912215"];

const DashboardHomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen py-8 px-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>대시보드</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold mb-8">대시보드</h1>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">보고서</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUSTOMER_IDS.map((id) => (
            <Link href={`/dashboard/${id}`} key={id}>
              <Card className="hover:shadow-lg hover:border-primary transition-all duration-200 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>고객 {id} 리포트</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    고객 ID {id}에 대한 상세 광고 성과 보고서를 확인하세요.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;
