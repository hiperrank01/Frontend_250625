import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export const ProModal = ({
  showMembership,
  setShowMembership,
}: {
  showMembership: boolean;
  setShowMembership: (show: boolean) => void;
}) => {
  const membershipPlans = [
    { period: "1개월", price: 7900, popular: false },
    { period: "3개월", price: 19800, popular: true },
    { period: "1년", price: 80000, popular: false },
  ];

  const router = useRouter();
  if (!showMembership) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle>PRO 멤버십 가입</CardTitle>
          <CardDescription>
            전문 기능을 이용하고 더 정확한 분석을 받아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {membershipPlans.map((plan) => (
              <Card
                key={plan.period}
                className={`relative ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    인기
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">{plan.period}</h3>
                  <p className="text-2xl font-bold mb-4">
                    ₩{plan.price.toLocaleString()}
                  </p>
                  <Button
                    onClick={() => {
                      router.push("pro-upgrade");
                    }}
                    className="w-full"
                  >
                    선택하기
                  </Button>
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
        <div className="text-center p-2">
          <p>국민 242401-04-434624</p>
          <p> 세금계산서 발행 가능 </p>
          <p>입금 후 확인시 멤버십으로 변경해드립니다. </p>
        </div>
      </Card>
    </div>
  );
};
