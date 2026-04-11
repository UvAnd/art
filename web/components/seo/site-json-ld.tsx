export function SiteJsonLd({
  siteUrl,
  name,
  description,
}: {
  siteUrl: string;
  name: string;
  description?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: siteUrl,
    ...(description ? { description } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
