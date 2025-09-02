import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "나인위닛 - 스마트스토어 SEO 최적화 솔루션",
  description:
    "데이터 기반 스마트스토어 SEO 분석 및 광고 최적화 서비스. 매출 성장을 위한 전문 솔루션을 제공합니다.",
  keywords: "스마트스토어, SEO, 네이버쇼핑, 광고최적화, 키워드분석",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="67dc8f9c016115d95fdee898ad7358d8e4986621"
        />
        <meta
          name="google-site-verification"
          content="e1xoVz8IAD4ZwFNr9Ff9fa_VrPV3DO9Qh7G18wtKE5Y"
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6S3X326"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N6S3X326');
          `}
        </Script>

        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
