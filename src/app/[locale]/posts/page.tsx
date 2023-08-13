'use client';

import { PageLocale } from '@/types';
import PageWrapper from '@/components/page-wrapper';
import Posts from '@/components/posts';
import { Pagination } from '@nextui-org/pagination';

import { useMemo, useState } from 'react';
import { allPosts } from 'contentlayer/generated';

const ITEMS_PER_PAGE = 6;

const PostsPage = ({ params: { locale } }: PageLocale) => {
  const [page, setPage] = useState<number>(1);
  const totalPosts = useMemo(
    () => allPosts.filter((post) => post.locale === locale).length,
    [locale]
  );

  const total = useMemo(() => totalPosts / ITEMS_PER_PAGE, [totalPosts]);

  return (
    <PageWrapper className="text-gray-600 body-font overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12">
        <Posts
          locale={locale}
          page={page}
          itemsPerPage={ITEMS_PER_PAGE}
          withDivider={totalPosts > 2}
        />
      </div>
      {total >= 1 && (
        <div className="flex items-center justify-center w-full my-12">
          <Pagination
            color="primary"
            total={total}
            initialPage={page}
            onChange={setPage}
            showControls
          />
        </div>
      )}
    </PageWrapper>
  );
};

export default PostsPage;
