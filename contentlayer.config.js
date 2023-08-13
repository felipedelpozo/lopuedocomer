// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';

import { i18n } from './src/i18n/config';

const getLocale = (path) => {
  const pathArray = path.split('.');
  return pathArray.length > 2 ? pathArray.slice(-2)[0] : i18n.defaultLocale;
};

const resolvePathRegExp = new RegExp(
  `\\.(${i18n.locales.join('|')})(\\.mdx)?$`,
  'i'
);

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) =>
      `/${doc._raw.flattenedPath.replace(resolvePathRegExp, '')}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) =>
      doc._raw.flattenedPath
        .split('/')
        .slice(1)
        .join('/')
        .replace(resolvePathRegExp, ''),
  },
  locale: {
    type: 'string',
    resolve: (doc) => {
      return getLocale(doc._raw.sourceFilePath);
    },
  },
};

const SEO = defineNestedType(() => ({
  name: 'SEO',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    seo: {
      type: 'nested',
      of: SEO,
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
    },
    seo: {
      type: 'nested',
      of: SEO,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Page],
});
