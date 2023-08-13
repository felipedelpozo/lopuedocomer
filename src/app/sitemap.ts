import { MetadataRoute } from 'next';
import { allPages, allPosts } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesRoute = allPages.map((page) => ({
    url: `${process.env.BASE_URL}/${page.locale}/${page.slugAsParams}`,
    lastModified: new Date(page.date),
  }));

  const postsRoute = allPosts.map((page) => ({
    url: `${process.env.BASE_URL}/${page.locale}/${page.slugAsParams}`,
    lastModified: new Date(page.date),
  }));

  return [
    {
      url: process.env.BASE_URL!,
      lastModified: new Date(),
    },
    {
      url: `${process.env.BASE_URL}/blog`,
      lastModified: new Date(),
    },
    ...pagesRoute,
    ...postsRoute,
  ];
}
