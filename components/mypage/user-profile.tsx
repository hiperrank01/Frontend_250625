"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/store";

export default function UserProfile() {
  const { email, nm } = useAuthStore();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{nm}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Button className="ml-auto">Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
