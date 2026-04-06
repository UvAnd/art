import Script from "next/script";

export function AnalyticsProvider() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

  if (provider === "cf" && process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN) {
    const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
    return (
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={JSON.stringify({ token })}
        strategy="afterInteractive"
      />
    );
  }

  if (provider === "ga4" && process.env.NEXT_PUBLIC_GA4_ID) {
    const id = process.env.NEXT_PUBLIC_GA4_ID;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}</Script>
      </>
    );
  }

  return null;
}
