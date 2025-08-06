import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { SeoAnalysis } from "./seo-analysis";
import { services } from "@/data/service-data";
import { Creative } from "./creative-content";
interface ServiceSectionProps {
  setShowMembership: (show: boolean) => void;
}

export const ServiceSection = ({ setShowMembership }: ServiceSectionProps) => {
  return (
    <>
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
              {service.id === "seo-analysis" && <SeoAnalysis />}
              {service.id !== "seo-analysis" && (
                <div className=" items-start justify-center gap-8 py-1">
                  <>
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">
                      {service.title}
                    </h3>
                  </>
                  <p className="text-gray-600 mb-4 ">{service.description}</p>
                  {service.id !== "seo-analysis" && (
                    <div className="flex flex-col items-center justify-center gap-8 py-1">
                      {service.text
                        ?.filter((item) => !!item?.content)
                        .map((item, index) => (
                          <p
                            key={index}
                            className="text-base font-medium text-gray-600"
                          >
                            {item.content}
                          </p>
                        ))}
                    </div>
                  )}
                  {service.id === "creative" && <Creative />}

                  <br />

                  <Button onClick={() => setShowMembership(true)}>
                    PRO 기능 이용하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </>
  );
};
