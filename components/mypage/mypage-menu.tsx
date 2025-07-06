
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MypageMenu() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-2 p-4">
        <Button variant="ghost" className="justify-start">Account Settings</Button>
        <Button variant="ghost" className="justify-start">Order History</Button>
        <Button variant="ghost" className="justify-start">Shipping Addresses</Button>
        <Button variant="ghost" className="justify-start">Payment Methods</Button>
        <Button variant="ghost" className="justify-start text-red-500">Logout</Button>
      </CardContent>
    </Card>
  );
}
