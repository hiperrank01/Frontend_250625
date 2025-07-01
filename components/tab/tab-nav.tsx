import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { services } from "@/data/service-data";
import { useRouter, useSearchParams } from "next/navigation";

interface TabNavProps {
  onTabChange?: (value: string) => void;
}

export const TabNav = ({ onTabChange }: TabNavProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "seo-analysis";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`?${params.toString()}`);
    onTabChange?.(value);
  };

  return (
    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
      {services.map((service) => (
        <TabsTrigger
          key={service.id}
          value={service.id}
          className="text-xs"
          onClick={() => handleTabChange(service.id)}
          data-state={currentTab === service.id ? "active" : "inactive"}
        >
          {service.icon}
        </TabsTrigger>
      ))}
      <TabsTrigger
        value="inquiry"
        className="text-xs"
        onClick={() => handleTabChange("inquiry")}
        data-state={currentTab === "inquiry" ? "active" : "inactive"}
      >
        <MessageSquare className="w-6 h-6" />
      </TabsTrigger>
    </TabsList>
  );
};
