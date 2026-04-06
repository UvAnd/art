export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  logo,
  externalShopUrl,
  footerText,
  defaultSeo,
  socials,
  heroSlides[]->{
    _id,
    title,
    slug,
    mainImage,
    "lqip": mainImage.asset->metadata.lqip
  }
}`;

export const allWorksQuery = `
  *[_type == "work"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    status,
    featured,
    summary,
    mainImage,
    "lqip": mainImage.asset->metadata.lqip,
    categories[]->{ _id, title, slug }
  }
`;

export const workBySlugQuery = `
  *[_type == "work" && slug.current == $slug][0]{
    title,
    slug,
    status,
    summary,
    description,
    price,
    externalUrl,
    publishedAt,
    mainImage,
    "mainLqip": mainImage.asset->metadata.lqip,
    gallery[]{
      ...,
      "lqip": asset->metadata.lqip
    },
    parameters,
    categories[]->{ title, slug }
  }
`;

export const allWorkSlugsQuery = `
  *[_type == "work" && defined(slug.current)]{ "slug": slug.current }
`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{ portrait, bio, cvLink }`;

export const contactPageQuery = `
  *[_type == "contactPage"][0]{
    headline,
    illustration,
    sideText,
    contactEmailDisplay,
    web3formsAccessKey
  }
`;

export const allCategoriesQuery = `
  *[_type == "category"] | order(order asc) { _id, title, slug, order }
`;
