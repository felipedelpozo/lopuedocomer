import { allPages } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { title } from '@/components/primitives';
import PageWrapper from '@/components/page-wrapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  Omit<PageProps['params'], 'locale'>[]
> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export const generateMetadata = async ({ params }: PageProps) => {
  const page = await getPostFromParams(params);

  if (!page) {
    return {};
  }

  return { title: page?.title };
};

async function getPostFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allPages.find(
    (page) => page.slugAsParams === slug && page.locale === params.locale
  );

  if (!page) {
    return null;
  }

  return page;
}

const PostLayout = async ({ params }: PageProps) => {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <PageWrapper className="flex relative z-20 flex-col w-full xl:mt-10">
      <article>
        <div className="flex flex-col">
          <div className="pb-12">
            <h1 className={clsx([title()])}>{post.title}</h1>
          </div>

          <div className="flex flex-col gap-6">
            <MDXContent />
          </div>
        </div>
      </article>
    </PageWrapper>
  );
};

export default PostLayout;
