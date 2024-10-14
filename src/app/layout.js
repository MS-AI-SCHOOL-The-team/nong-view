import Script from 'next/script';

import "./globals.css";

export const metadata = {
  title: "농뷰",
  description: "농산물 가격 예측의 혁신, 농뷰(NongView)! AI 기술로 배추, 무, 양파 등 농산물 가격을 정확히 예측합니다. 농가 수익 증대, 유통 최적화, 식품기업 원가 절감에 필수. 실시간 시세 분석으로 미래 농산물 가격 변동에 대비하세요. 데이터 기반 의사결정으로 농업의 미래를 바꿉니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_NAVER_SEARCH_ADVISOR} />
      <Script id="microsoft-clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_TAG_ID}");
        `}
      </Script>
      {children}
    </html>
  );
}
