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
import { useCustomerInfo } from "@/hooks/dashboard/report/report";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const DashboardHomePage = () => {
  const { data: customers, isLoading, isError, error } = useCustomerInfo();

  const renderReportCards = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <Alert variant="destructive">
          <AlertTitle>
            리포트 목록을 불러오는 중 오류가 발생했습니다.
          </AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }

    if (customers && customers.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <Link
              href={`/dashboard/${customer.customerId}`}
              key={customer.customerId}
            >
              <Card className="hover:shadow-lg hover:border-primary transition-all duration-200 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="text-xl font-bold">
                      {customer.customerName} ({customer.customerId})
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm">
                      <Badge
                        variant="outline"
                        className={`p-1.5 ${
                          customer.isActive
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            customer.isActive ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                      </Badge>
                      <p className="text-sm font-medium text-muted-foreground capitalize tracking-tight whitespace-nowrap py-0.5 pl-2 text-nowrap text-balance capitalize">
                        {customer.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      );
    }

    return <p>접근 가능한 고객 리포트가 없습니다.</p>;
  };

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
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          리포트 목록
        </h2>
        {renderReportCards()}
      </section>
    </div>
  );
};

export default DashboardHomePage;
