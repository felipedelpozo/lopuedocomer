import { Link } from '@nextui-org/link';
import ReadMore from '@/components/read-more';
import { Divider } from '@nextui-org/divider';
import { DateTime } from 'luxon';
import { allPosts } from 'contentlayer/generated';
import { HTMLAttributes, useMemo } from 'react';
import clsx from 'clsx';

type PostsProps = HTMLAttributes<HTMLDivElement> & {
  locale: string;
  itemsPerPage?: number;
  page?: number;
  withDivider?: boolean;
};

const Posts: React.FC<PostsProps> = ({
  locale,
  itemsPerPage = 12,
  page = 1,
  withDivider,
  ...props
}) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const posts = useMemo(
    () =>
      allPosts
        .filter((post) => post.locale === locale)
        .sort(
          (first, second) =>
            DateTime.fromISO(second.date).toMillis() -
            DateTime.fromISO(first.date).toMillis()
        )
        .slice(startIndex, endIndex),
    [endIndex, locale, startIndex]
  );

  return (
    <>
      {posts.map((post, index) => (
        <div
          key={post._id}
          className={clsx(['flex flex-col items-start', props.className])}
          {...props}
        >
          <Link href={post.slug}>
            <h2 className="tracking-tight inline sm:text-4xl text-3xl title-font font-medium text-foreground mb-4">
              {post.title}
            </h2>
          </Link>
          <p className="text-foreground leading-relaxed my-8">
            {post.description}
          </p>
          <div className="flex items-center flex-wrap pb-4 mb-4 mt-auto w-full">
            <ReadMore href={post.slug} />
          </div>
          {withDivider && index < posts.length - 1 && (
            <Divider className="my-2" />
          )}
        </div>
      ))}
    </>
  );
};

export default Posts;
