import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n/config';
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export default withExtraMiddleware(createMiddleware(i18n));

function withExtraMiddleware(next: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    return next(request, event);
  };
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
