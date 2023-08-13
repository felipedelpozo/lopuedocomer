import { allPosts } from 'contentlayer/generated';
import { DateTime } from 'luxon';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { title } from '@/components/primitives';
import PageWrapper from '@/components/page-wrapper';
import PexelsMotionImage from '@/components/pexels-motion-image';
import { getTranslator } from 'next-intl/server';
import { Chip } from '@nextui-org/chip';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface PostProps {
  params: {
    locale: string;
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  Omit<PostProps['params'], 'locale'>[]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find(
    (post) => post.slugAsParams === slug && post.locale === params.locale
  );

  if (!post) {
    return null;
  }

  return post;
}

export const generateMetadata = async ({ params }: PostProps) => {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return { title: post?.title };
};

const PostPage: React.FC<PostProps> = async ({ params }) => {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const t = await getTranslator(params.locale, 'posts');
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <PageWrapper className="flex relative z-20 flex-col w-full xl:mt-10">
      <article>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex flex-col pb-12 gap-3">
              <p className="text-primary font-bold pb-4">{t('subtitle')}</p>
              <h1 className={clsx([title()])}>{post.title}</h1>
              <h2 className="pt-3">
                <time dateTime={post.date} className=" text-gray-600">
                  {DateTime.fromISO(post.date)
                    .setLocale(params.locale)
                    .toLocaleString(DateTime.DATE_FULL)}
                </time>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <MDXContent />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-end">
              <PexelsMotionImage id={post.image!} />
              <ul className="flex flex-row justify-end flex-wrap gap-2 mt-12 w-3/4">
                {post?.tags?.map((tag) => (
                  <li key={tag} className="text-content4">
                    <Chip
                      color="primary"
                      variant="faded"
                      classNames={{
                        base: 'border-primary border',
                        content: 'font-semibold',
                      }}
                    >
                      {tag}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
};

export default PostPage;
